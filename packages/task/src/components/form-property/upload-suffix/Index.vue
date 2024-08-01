<script setup>
import { HlFormItem, HlSelect } from '@hl/ui'
import { suffix_type_list } from '../../../default/form'

const value = defineModel()
</script>

<template>
  <hl-form-item label="附件后缀">
    <hl-select v-model="value" :options="suffix_type_list" multiple />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
