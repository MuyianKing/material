<script setup>
import { HlFormItem, HlInput } from '@hl/ui'

const value = defineModel()
</script>

<template>
  <hl-form-item label="列数">
    <hl-input v-model="value" type="number" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
