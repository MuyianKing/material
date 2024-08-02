<script setup>
import { HlFormItem, HlRadio } from '@hl/ui'
import { is_multiple_handle } from '../../../default/flow'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/radio/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="是否多次处置">
    <hl-radio v-model="value" :options="is_multiple_handle" />
  </hl-form-item>
</template>

<style scoped lang="scss"></style>
