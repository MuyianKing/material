<script setup>
import { HlFormItem, HlRadio } from '@hl/ui'
import { no_yes } from '../../../default/index'

import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/radio/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="创建多条任务">
    <hl-radio v-model="value" :options="no_yes" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
