<script name="DeviceSelect" setup>
import { useSelect } from '@hl/hooks'
import { getUserList, getUserListWithEachOrgJob } from '../../server/user'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 显示全部
  all: {
    type: Boolean,
    default: false,
  },
  // 显示清除图标
  clearable: {
    type: Boolean,
    default: true,
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  extendParams: {
    type: Object,
    default() {
      return {}
    },
  },
  // 是否包含下级部门人员
  hasNext: {
    type: Boolean,
    default: false,
  },
  // true - 一个人在多个单位则会展示多个
  orgJobIdcard: {
    type: Boolean,
    default: false,
  },
  organizationId: {
    type: [Number, String, Array],
    default: '',
  },
  customData: {
    type: Function,
    default: null,
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const params = {
  ...props.extendParams,
  query: '',
  sub_organization: props.hasNext ? 1 : 0,
}

async function getList(query) {
  const result = await getUserList(query)
  if (props.customData && typeof props.customData === 'function') {
    return props.customData(result)
  }
  return result
}

const { select_value, dataList, loadmore, selected_list, commonFilter, query, handleSelChange } = useSelect(props, emits, props.orgJobIdcard ? getUserListWithEachOrgJob : getList, {
  params,
  need_selected_list: true,
  key: 'id_card',
  format_config: {
    id_key: 'id_card',
    extend_keys: ['organization', 'police_id'],
  },
})

function handleChange(val) {
  handleSelChange(val)
  nextTick(() => {
    const new_data = []
    for (const key in selected_list) {
      if (selected_list[key]) {
        new_data.push(selected_list[key])
      }
    }
    emits('change', new_data)
  })
}

// 自定义搜索
function filter(val) {
  if (query.query === val) {
    return
  }

  // 设置请求的参数
  query.query = val
  commonFilter()
}

watch(() => props.organizationId, (val) => {
  query.organization_id = Array.isArray(val) ? val?.join(',') : val
  query.page = 1
  commonFilter()
})
</script>

<template>
  <el-select v-model="select_value" :clearable :disabled :multiple :placeholder :remote-method="filter" automatic-dropdown filterable remote remote-show-suffix @change="handleChange">
    <div v-loadmore="loadmore">
      <el-option v-if="all" value="">
        全部
      </el-option>
      <el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id" />
    </div>
  </el-select>
</template>
