<script setup name="HlDateRange">
import dayjs from 'dayjs'
import { ElDatePicker } from 'element-plus'
import { computed, nextTick, watch } from 'vue'

const props = defineProps({
  // 类型：同el-date
  type: {
    type: String,
    default: 'date',
  },
  start: {
    type: String,
    default: '',
  },
  end: {
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
  format: {
    // 显示在输入框的格式
    type: String,
    default: '',
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
  separator: {
    type: String,
    default: ' ~ ',
  },
  // 单个时间组件的长度
  width: {
    type: [String, Number],
    default: '',
  },
  // 是否关闭开始时间比结束时间大的提示,默认关闭不会改变v-model的值，不会执行change事件
  noWarning: {
    type: Boolean,
    default: false,
  },
  emptyValue: {
    type: [String, Number, Object],
    default: '',
  },
})

const emits = defineEmits(['update:start', 'update:end', 'change'])

const model_value = defineModel({
  type: String,
  default: '',
})

// 开始时间update事件
function handleStartChange(val) {
  val = val || props.emptyValue
  emits('update:start', val)
}

// 结束世间update事件
function handleEndChange(val) {
  val = val || props.emptyValue
  emits('update:end', val)
}

// change事件
function handleChange(val) {
  emits('change', val)
}

watch([() => props.start, () => props.end], () => {
  model_value.value = `${props.start}_${props.end}`
  handleChange(model_value.value)
}, {
  immediate: true,
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

// 单个时间选择框的样式
const el_date_style_comp = computed(() => {
  if (props.width === 'auto') {
    return {
      flex: 1,
      width: 'auto',
    }
  }

  const width = props.width || (props.type === 'date' ? 150 : 200)
  return {
    width: `${width}px !important`,
  }
})

const start_comp = computed(() => {
  return props.start || model_value.value?.split('_')[0] || ''
})

const end_comp = computed(() => {
  return props.end || model_value.value?.split('_')[1] || ''
})

// 限制结束时间
function endDisableFun(val) {
  if (props.type !== 'date') {
    return false
  }

  if (!start_comp.value) {
    return true
  }

  if (dayjs(val).valueOf() <= dayjs(start_comp.value).valueOf()) {
    return true
  }

  return false
}

// 限制开始时间
function startDisableFun(val) {
  if (props.type !== 'date') {
    return false
  }

  if (end_comp.value && dayjs(val).valueOf() >= dayjs(end_comp.value).valueOf()) {
    return true
  }

  return false
}

// model_value属于被动变化，但是需要初始化一次
watch(model_value, () => {
  nextTick(() => {
    const date = model_value.value.split('_').filter(d => d)
    if (date.length >= 2) {
      model_value.value = `${dayjs(date[0]).format(start_value_format_comp.value)}_${dayjs(date[1]).format(end_value_format_comp.value)}`
      handleChange(model_value.value)
    }
  })
}, {
  immediate: true,
  once: true,
})
</script>

<template>
  <div class="flex items-center">
    <!-- 开始时间 -->
    <el-date-picker v-bind="$attrs" :model-value="start_comp" :type :placeholder="startPlaceholder || '请选择开始时间'" :format="format_comp" :value-format="start_value_format_comp" :style="el_date_style_comp" :disabled-date="startDisableFun" @update:model-value="handleStartChange" />
    <span class="mx-2 text-gray-400 separator">{{ separator }}</span>
    <!-- 结束时间 -->
    <el-date-picker v-bind="$attrs" :model-value="end_comp" :type :placeholder="endPlaceholder || '请选择结束时间'" :format="format_comp" :value-format="end_value_format_comp" :style="el_date_style_comp" :disabled-date="endDisableFun" @update:model-value="handleEndChange" />
  </div>
</template>
