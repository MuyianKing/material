<script setup>
import { HlFormItem, HlRadio } from '@hl/ui'
import { no_yes } from '../../../default/index'
import '@hl/ui/src/components/radio/Index.css'
import '@hl/ui/src/components/form-item/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="已读即签收">
    <hl-radio v-model="value" :options="no_yes" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
