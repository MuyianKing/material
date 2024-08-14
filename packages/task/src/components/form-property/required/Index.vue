<script setup>
import { HlFormItem, HlRadio } from '@hl/ui'
import { true_false } from '../../../default/index'

import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/radio/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="是否必填">
    <hl-radio v-model="value" :options="true_false" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
