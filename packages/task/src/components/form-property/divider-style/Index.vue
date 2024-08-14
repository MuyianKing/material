<script setup>
import { HlFormItem, HlSelect } from '@hl/ui'
import { deivider_type } from '../../../default/form'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/select/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="分割样式">
    <hl-select v-model="value" :options="deivider_type" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
