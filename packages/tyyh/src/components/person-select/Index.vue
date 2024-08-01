<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { HlCheckbox, HlRadio, HlSelect } from '@hl/ui'
import { getUserList, getUserListWithEachOrgJob } from '../../server/user'

const props = defineProps({
  // 待选项
  options: {
    type: Array,
    default: null,
  },
  // 接口
  server: {
    type: Function,
    default: null,
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 展开
  expand: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  // true - 一个人在多个单位则会展示多个
  orgJobIdcard: {
    type: Boolean,
    default: false,
  },
  idKey: {
    type: String,
    default: 'id_card',
  },
  organizationId: {
    type: String,
    default: '',
  },
  // 是否包含下级部门人员
  hasNext: {
    type: Boolean,
    default: false,
  },
})

const _options = ref([])
const loading = ref(false)
let has_more = false
const query = {
  page: 1,
  limit: 10,
}
async function getData() {
  try {
    if (props.options) {
      _options.value = props.options
    } else {
      loading.value = true
      if (props.expand) {
        query.limit = 10000
      }

      const { data, count } = await getApi()(query)
      if (query.page === 1) {
        _options.value = []
      }

      formatData(data).forEach((item) => {
        _options.value.push(item)
      })

      has_more = _options.value.length < count
      loading.value = false
    }
  } catch (e) {
    hl.message.error(e, '获取下拉数据出错')
  }
}

/**
 * 获取请求方法
 * @returns {(function(*): *)|*|(function(*): Promise<*>)} 方法
 */
function getApi() {
  if (props.server) {
    return props.server
  }

  if (props.orgJobIdcard) {
    return getUserListWithEachOrgJob
  } else {
    return getUserList
  }
}

function formatData(data) {
  return data.map((item) => {
    return {
      label: item.name,
      value: item[props.idKey],
    }
  })
}

watchEffect(() => {
  if (props.options || props.server) {
    getData()
  }
})

const value = defineModel()

function handleMore() {
  if (has_more) {
    query.page++
    getData()
  }
}

// 自定义搜索
function filter(val) {
  if (query.query === val) {
    return
  }

  // 设置请求的参数
  query.query = val
  query.page = 1
  getData()
}

watch([() => props.organizationId, () => props.hasNext], () => {
  query.organization_id = props.organizationId
  query.sub_organization = props.hasNext ? 1 : 0
  query.page = 1
  getData()
})

onMounted(() => {
  getData()
})

watchEffect(() => {
  if (props.multiple) {
    if (!Array.isArray(value.value)) {
      value.value = value.value ? [value.value] : []
    }
  } else {
    value.value = ''
  }
})
</script>

<template>
  <hl-radio v-if="expand && !multiple" v-model="value" :options="_options" :empty="!required" v-bind="$attrs" />
  <hl-checkbox v-else-if="expand && multiple" v-model="value" :options="_options" v-bind="$attrs" />
  <hl-select v-else v-model="value" :options="_options" v-bind="$attrs" :multiple :loading :remote-method="filter" remote @bottom="handleMore" />
</template>

<style scoped lang="scss"></style>
