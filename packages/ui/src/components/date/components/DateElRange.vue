<script setup name="HlDate">
import dayjs from 'dayjs'
import { ElDatePicker } from 'element-plus'
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'date',
  },
  emptyValue: {
    type: [String, Number, Object],
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择时间',
  },
  valueFormat: {
    // 绑定值的格式
    type: String,
    default: '',
  },
  startValueFormat: {
    // 开始时间绑定值的格式
    type: String,
    default: '',
  },
  endValueFormat: {
    // 结束时间绑定值的格式
    type: String,
    default: '',
  },
  format: {
    // 显示在输入框的格式
    type: String,
    default: '',
  },
  startPlaceholder: {
    type: String,
    default: '请选择开始时间',
  },
  endPlaceholder: {
    type: String,
    default: '请选择结束时间',
  },
})

const emits = defineEmits(['change'])

// 绑定的时间格式
const value_format_comp = computed(() => {
  if (props.valueFormat) {
    return props.valueFormat
  }
  return format_comp.value
})

// 显示时间格式
const format_comp = computed(() => {
  if (props.format) {
    return props.format
  }
  return props.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
})

// 开始绑定的时间格式
const start_value_format_comp = computed(() => {
  if (props.startValueFormat) {
    return props.startValueFormat
  }
  if (props.valueFormat) {
    return props.valueFormat
  }
  return props.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
})

// 绑定的时间格式
const end_value_format_comp = computed(() => {
  if (props.endValueFormat) {
    return props.endValueFormat
  }
  if (props.valueFormat) {
    return props.valueFormat
  }
  return props.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
})

// update事件
const end = defineModel('end')
const start = defineModel('start')
const model = defineModel()
function handleChange(val) {
  start.value = val[0] ? dayjs(val[0]).format(start_value_format_comp.value) : props.emptyValue
  end.value = val[1] ? dayjs(val[1]).format(end_value_format_comp.value) : props.emptyValue

  model.value = val.join('_')
  emits('change', model.value)
}

const _type = computed(() => {
  if (props.type === 'date' || props.type === 'datetime') {
    return `${props.type}range`
  }
  return props.type
})

// 快捷按钮
const shortcuts = [
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
</script>

<template>
  <el-date-picker :model-value="[start, end]" :shortcuts :value-format="value_format_comp" :type="_type" :placeholder unlink-panels :start-placeholder :end-placeholder @update:model-value="handleChange" />
</template>
