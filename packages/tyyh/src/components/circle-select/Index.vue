<script setup>
import { vLoadmore } from '@hl/directions'
import { ElOption, ElSelect } from 'element-plus'
import useSelect from '../../hooks/useSelect'
import { getList } from '../../server/circle'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'

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

const emits = defineEmits(['update:modelValue'])

const params = {
  opt: 'get_circle_list',
  type: 0,
}

const { select_value, dataList, loadmore, handleSelChange, commonFilter, query } = useSelect(props, emits, getList, {
  params,
  format_config: {
    name_key: 'name',
  },
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
