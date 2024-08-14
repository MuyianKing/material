<script setup name="HlDate">
import { ElDatePicker } from 'element-plus'
import 'element-plus/es/components/date-picker/style/css'
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'date',
  },
  modelValue: {
    type: String,
    default: '',
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
  format: {
    // 显示在输入框的格式
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

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

// update事件
function handleStartChange(val) {
  val = val || props.emptyValue
  emits('update:modelValue', val)
  emits('change')
}
</script>

<template>
  <el-date-picker :model-value="modelValue" :value-format="value_format_comp" :format="format_comp" :type="type" :placeholder="placeholder || '请选择'" @update:model-value="handleStartChange" />
</template>
