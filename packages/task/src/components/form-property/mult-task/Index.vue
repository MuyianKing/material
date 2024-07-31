<script setup>
import { no_yes } from '../../../default/index'

const value = defineModel()
</script>

<template>
  <hl-form-item label="创建多条任务">
    <hl-radio v-model="value" :options="no_yes" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
