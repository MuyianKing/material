<script setup>
import { deivider_type } from '../../../default/form'

const value = defineModel()
</script>

<template>
  <hl-form-item label="分割样式">
    <hl-select v-model="value" :options="deivider_type" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
