<script setup>
import { HlFormItem, HlSelect } from '@hl/ui'
import { date_time_type } from '../../../default/form'

const value = defineModel()
</script>

<template>
  <hl-form-item label="日期类型">
    <hl-select v-model="value" :options="date_time_type" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
