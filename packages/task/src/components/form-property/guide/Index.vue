<script setup>
import { HlFormItem, HlInput } from '@hl/ui'

const value = defineModel()
</script>

<template>
  <hl-form-item label="指引提示">
    <hl-input v-model="value" type="textarea" :rows="3" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
