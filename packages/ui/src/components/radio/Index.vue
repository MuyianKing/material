<script setup name="HlRadio">
import { ElRadio, ElRadioGroup } from 'element-plus'

const props = defineProps({
  options: {
    type: Array,
    default() {
      return []
    },
  },
  modelValue: {
    type: [String, Number, Boolean],
    default() {
      return ''
    },
  },
  empty: {
    type: Boolean,
    default() {
      return false
    },
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

const emits = defineEmits(['update:modelValue', 'change'])

function change(val) {
  emits('update:modelValue', val)
  emits('change', val)
}

function click(item) {
  if (props.readonly) {
    return
  }

  if (!props.empty)
    return

  const value = props.modelValue
  setTimeout(() => {
    if (value === item.value) {
      emits('update:modelValue', 0)
    }
  })
}
</script>

<template>
  <el-radio-group :model-value="modelValue" :class="{ 'hl-radio-line-item': line, 'hl-radio-readonly-group': readonly }" :disabled="disabled || readonly" @change="change">
    <el-radio v-for="item in options" :key="item.value" :value="item.value" @click="click(item)">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
