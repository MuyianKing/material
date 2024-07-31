<script setup>
import { true_false } from '../../../default/index'

const model = defineModel()
</script>

<template>
  <hl-form-item label="是否对外">
    <hl-radio v-model="model" :options="true_false" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
