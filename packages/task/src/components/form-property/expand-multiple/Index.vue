<script setup>
import { HlFormItem } from '@hl/ui'

const property = defineModel()
</script>

<template>
  <div class="w-full flex">
    <hl-form-item label="展开" class="fleex-1">
      <el-switch v-model="property.expand" />
    </hl-form-item>
    <hl-form-item label="多选" class="fleex-1">
      <el-switch v-model="property.multiple" />
    </hl-form-item>
  </div>
</template>

<style lang='scss' scoped></style>
