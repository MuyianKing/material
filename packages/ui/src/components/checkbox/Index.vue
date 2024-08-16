<script name="HlRadio" setup>
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default() {
      return []
    },
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  // 每个选项是否一行显示
  line: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel({
  type: [String, Array, Number],
  default() {
    return []
  },
})

function handleChange(val) {
  model.value = props.multiple ? val : val.pop() || ''
}

const value = computed(() => {
  if (!model.value) {
    return []
  }

  // 将modelValue的值统一变更为字符串数组
  let _value
  if (Array.isArray(model.value)) {
    _value = model.value
  } else if (typeof model.value === 'number') {
    _value = [model.value]
  } else {
    _value = model.value.toString().split(',').filter(item => item)
  }
  if (props.multiple) {
    return _value.map(item => _list_value_map.value[item]) || []
  } else {
    return _value || []
  }
})

// 所有待选项的value组成的对象，key为字符串的value
const _list_value_map = computed(() => {
  const value_map = {}
  props.options.forEach((item) => {
    value_map[`${item.value}`] = item.value
  })

  return value_map
})
</script>

<template>
  <el-checkbox-group class="hl-checkbox" :class="{ 'hl-checkbox-line-item': line }" :model-value="value" @change="handleChange">
    <el-checkbox v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
