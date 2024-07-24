<script setup>
import { useSelect } from '@hl/hooks'
import { getList } from '../../server/role'

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
    default: false,
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 禁用项[id]
  disabledArr: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const params = {
  opt: 'role_get',
}

const { select_value, dataList, loadmore, handleSelChange, commonFilter, query } = useSelect(props, emits, getList, {
  params,
  format_config: {
    id_key: 'role_id',
    name_key: 'role_name',
  },
  key: 'role_id',
})

// 自定义搜索
function filter(val) {
  // 设置请求的参数
  query.query = val
  commonFilter()
}
</script>

<template>
  <el-select v-model="select_value" :remote-method="filter" :multiple="multiple" :placeholder="placeholder" filterable remote-show-suffix remote automatic-dropdown :clearable="clearable" :disabled="disabled" @change="handleSelChange">
    <div v-loadmore="loadmore">
      <el-option v-if="all" value="">
        全部
      </el-option>
      <el-option v-for="item in dataList" :key="item.id" :value="item.id" :label="item.name" :disabled="disabledArr.includes(item.id)" />
    </div>
  </el-select>
</template>
