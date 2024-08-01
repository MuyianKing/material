<script setup>
import { HlFormItem, HlRadio } from '@hl/ui'

const value = defineModel()

const options = [{
  label: '是',
  value: 1,
}, {
  label: '否',
  value: 2,
}]
</script>

<template>
  <hl-form-item label="是否允许转派">
    <hl-radio v-model="value" :options />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
