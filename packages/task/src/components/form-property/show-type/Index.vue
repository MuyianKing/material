<script setup>
import { HlFormItem, HlRadio } from '@hl/ui'

const options = [{
  label: '级联形式',
  value: 'cascader',
}, {
  label: '下拉形式',
  value: 'tree-select',
}]

const value = defineModel()
</script>

<template>
  <hl-form-item label="选择方式">
    <hl-radio v-model="value" :options />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
