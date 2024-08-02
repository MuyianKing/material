<script setup>
import { HlFormItem, HlInput } from '@hl/ui'

import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="Token字段名">
    <hl-input v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
