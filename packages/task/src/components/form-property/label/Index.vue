<script setup>
import { HlFormItem, HlInput } from '@hl/ui'

const value = defineModel()
</script>

<template>
  <hl-form-item label="标签名称">
    <hl-input v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
