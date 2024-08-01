<script setup>
import { HlFormItem, HlInput } from '@hl/ui'

const property = defineModel()
</script>

<template>
  <hl-form-item label="文本长度">
    <div class="flex">
      <hl-input v-model="property.min_length" class="flex-1" type="number" placeholder="字符最短" />
      <span class="mx-2">~</span>
      <hl-input v-model="property.max_length" class="flex-1" type="number" placeholder="字符最长" />
    </div>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
