<script setup name="ProjectSelect">
import { ElOption, ElSelect } from 'element-plus'
import useSelect from '../../hooks/select'
import { getList } from '../../server/group'

import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
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
})

const emits = defineEmits(['update:modelValue'])

const params = {}

const { select_value, dataList, loadmore, handleSelChange, commonFilter, query } = useSelect(props, emits, getList, {
  params,
  format_config: {
    name_key: 'group_name',
    id_key: 'group_id',
  },
})

// 自定义搜索
function filter(val) {
  // 设置请求的参数
  query.group_name = val
  commonFilter()
}
</script>

<template>
  <el-select v-model="select_value" :remote-method="filter" :multiple :placeholder filterable remote remote-show-suffix automatic-dropdown :clearable :disabled @change="handleSelChange">
    <div v-loadmore="loadmore">
      <el-option v-if="all" value="">
        全部
      </el-option>
      <el-option v-for="item in dataList" :key="item.id" :value="item.id" :label="item.name" />
    </div>
  </el-select>
</template>
