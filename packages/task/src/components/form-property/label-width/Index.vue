<script setup>
import { HlFormItem, HlInput } from '@hl/ui'

const value = defineModel()
</script>

<template>
  <hl-form-item label="标签长度">
    <hl-input v-model="value" type="number">
      <template #append>
        px
      </template>
    </hl-input>
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
