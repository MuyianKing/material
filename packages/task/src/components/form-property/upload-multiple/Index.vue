<script setup>
import { HlFormItem } from '@hl/ui'

const value = defineModel()
</script>

<template>
  <hl-form-item label="多个附件">
    <el-switch v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
