<script setup>
import { HlFormItem, HlSelect } from '@hl/ui'
import { align_type } from '../../../default/form'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/select/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="对齐方式">
    <hl-select v-model="value" :options="align_type" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
