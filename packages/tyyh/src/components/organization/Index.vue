<script setup>
import { cloneDeep } from 'lodash-es'
import { computed, onMounted, ref, watch } from 'vue'
import { ElCascader, ElTreeSelect } from 'element-plus'
import { HlDropdownCascader } from '@hl/ui'
import { getOrgInfo, getTreeList } from '../../server/organization'
import 'element-plus/es/components/cascader/style/css'
import 'element-plus/es/components/tree-select/style/css'

const props = defineProps({
  modelValue: {
    type: [Array, String, Number],
  },
  // 数据接口
  url: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  // 数据范围：1-不做处理 2-显示到分局 3-显示到派出所 4-显示到从责任区
  dataRange: {
    type: [String, Number],
    default: 1,
  },
  // 是否将自身放到儿子上
  toChildren: {
    type: Boolean,
    default: true,
  },
  // 有儿子时，如果同级只有自己，是否去掉自己
  removeWhenOnlySelf: {
    type: Boolean,
    default: false,
  },
  // 当同级中有儿子时是否去掉没有儿子的选项
  removeWhenNoChildren: {
    type: Boolean,
    default: false,
  },
  // 组件类型 cascader-级联  tree-树形选择  dropdown-下拉
  comp: {
    type: String,
    default: 'cascader',
  },
  // 父子组件互不关联
  checkStrictly: {
    type: Boolean,
    default: true,
  },
  // 组件默认数据范围是当前用户所在单位及下属单位，如果需要所有的单位传true即可
  needTop: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  // 是否保留支队和大队
  keepLevel: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['update:modelValue', 'update:label'])
const data_list = ref([])
let back_data = null
const orgs = ref([])

async function getData() {
  if (props.readonly) {
    let ids = [props.modelValue]
    if (Array.isArray(props.modelValue)) {
      ids = []
      props.modelValue.forEach((item) => {
        if (Array.isArray(item)) {
          ids.push(item[item.length - 1])
        } else {
          ids.push(item)
        }
      })
    }

    getOrgInfo(ids.join(',')).then((data) => {
      orgs.value = data
    }).catch((e) => {
      hl.message.error(e, '获取单位出错')
    })
  } else {
    try {
      let data = []
      if (props.url) {
        data = await hl.http.post(props.url)
      } else {
        data = await getTreeList({
          need_top: props.needTop ? 1 : 0,
        })
      }

      back_data = data.data || []
      formatData()
    } catch (e) {
      hl.message.error(e, '获取单位出错')
    }
  }
}

// 格式化数据
function formatData() {
  let data = cloneDeep(back_data)
  if ((props.toChildren && !props.checkStrictly) || props.removeWhenOnlySelf) {
    appendSelfToChildren(data)
  }

  if (data && props.dataRange !== 1) {
    data = filterData(data)
  }

  if (props.removeWhenOnlySelf) {
    data = removeSelf(data)
  }
  if (props.removeWhenNoChildren) {
    data = removeNoChildren(data)
  }

  data_list.value = data
}

// 有儿子，同级只有自己则删掉自己
function removeSelf(data) {
  if (data.length === 1 && data[0].sub_organization?.length > 0) {
    data = data[0].sub_organization
  }

  data.forEach((item) => {
    if (item.sub_organization?.length > 0) {
      item.sub_organization = removeSelf(item.sub_organization)
    }
  })
  return data
}

function removeNoChildren(data) {
  const new_data = data.filter(item => item.sub_organization?.length > 0)
  if (new_data.length > 0) {
    data = new_data
  }

  data.forEach((item) => {
    if (item.sub_organization) {
      item.sub_organization = removeNoChildren(item.sub_organization)
    }
  })

  return data
}

// 根据dataType过滤数据
function filterData(data) {
  // 先判断这一层有没有对应的type的数据
  let new_data = data.filter(item => dwcjEqual(item.dwcj, props.dataRange))

  // 找到最大的单位层级
  const dwcj = Math.max(...Array.from(new Set(data.map(item => item.dwcj || 0))))

  // 没有数据或者最大层级
  if (new_data.length === 0 || dwcj !== props.dataRange) {
    new_data = data.filter((item) => {
      return dwcjEqual(item.dwcj, dwcj)
    })

    new_data.forEach((item) => {
      if (item.sub_organization && item.sub_organization.length > 0) {
        item.sub_organization = filterData(item.sub_organization)
      }
    })
  } else {
    // 有则说明数据只要到这一层即可，过滤掉不是同一层级的儿子
    new_data = new_data.map((item) => {
      if (item.sub_organization) {
        item.sub_organization = item.sub_organization.filter(i => dwcjEqual(i.dwcj, props.dataRange))
      }
      return item
    })
  }
  return new_data
}

// 把自己放到children中
function appendSelfToChildren(data) {
  data.forEach((item) => {
    if (item.sub_organization && item.sub_organization.length > 0) {
      appendSelfToChildren(item.sub_organization)
      item.sub_organization.unshift({
        organization_id: item.organization_id,
        organization_name: item.organization_name,
      })
    }
  })
}

function dwcjEqual(dwcj1, dwcj2) {
  if (!props.keepLevel) {
    return dwcj1 <= dwcj2
  }
  return dwcj1 === dwcj2
}

const _props = computed(() => {
  const _config = {
    value: 'organization_id',
    label: 'organization_name',
    children: 'sub_organization',
    multiple: props.multiple,
    emitPath: false,
  }

  if (props.checkStrictly) {
    _config.checkStrictly = props.checkStrictly
  }

  return _config
})

const cascader_ref = ref()

function handleChange(val) {
  emits('update:modelValue', val)
  if (!_props.value.multiple) {
    emits('update:label', cascader_ref.value.getCheckedNodes()[0]?.label)
  }
}

watch(() => props.dataRange, () => {
  formatData()
})

onMounted(() => {
  getData()
})
</script>

<template>
  <template v-if="!readonly">
    <el-cascader v-if="comp === 'cascader'" v-bind="$attrs" ref="cascader_ref" :model-value="modelValue" clearable
                 :options="data_list" :props="_props" :filterable @change="handleChange"
    />
    <hl-dropdown-cascader v-else-if="comp === 'dropdown'" v-bind="$attrs" :cascader-props="_props"
                          :has-search="filterable" :options="data_list"
    />
    <el-tree-select v-else v-bind="$attrs" ref="cascader_ref" :model-value="modelValue" check-strictly clearable
                    :data="data_list" :multiple="_props.multiple" :props="_props" :filterable @change="handleChange"
    />
  </template>
  <div v-else v-bind="$attrs">
    <span v-for="item in orgs" :key="item.id" class="m-2">{{ item.organization_nick }}</span>
  </div>
</template>

<style lang="scss" scoped></style>
