<script setup>
import { true_false } from '../../../default/index'

const value = defineModel()
</script>

<template>
  <hl-form-item label="是否斜体">
    <hl-radio v-model="value" :options="true_false" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
