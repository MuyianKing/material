<script name="HlRadio" setup>
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import { computed, ref, watch } from 'vue'

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
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
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
    return _value.map(item => value_map.value[item]) || []
  } else {
    return _value || []
  }
})

// 所有待选项的value组成的对象，key为字符串的value
let value_map = ref({})
watch(() => props.options, () => {
  value_map.value = {}
  props.options.forEach((item) => {
    value_map.value[`${item.value}`] = item.value
  })
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <el-checkbox-group v-bind="$attrs" class="hl-checkbox" :class="{ 'hl-checkbox-line-item': line, 'hl-checkbox-readonly-group': readonly }" :disabled="disabled || readonly" :model-value="value" @change="handleChange">
    <el-checkbox v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
