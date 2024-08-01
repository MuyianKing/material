<script setup>
import { HlFormItem, HlSelect } from '@hl/ui'
import { file_type_list } from '../../../default/form'

const value = defineModel()
</script>

<template>
  <hl-form-item label="附件类型">
    <hl-select v-model="value" :options="file_type_list" multiple />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
