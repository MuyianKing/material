<script setup>
import { HlFormItem, HlInput } from '@hl/ui'

const value = defineModel()
</script>

<template>
  <hl-form-item label="提示信息">
    <hl-input v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
