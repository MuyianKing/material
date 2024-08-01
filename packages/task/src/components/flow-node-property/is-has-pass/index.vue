<script setup>
import { HlFormItem, HlRadio } from '@hl/ui'
import { is_has_pass } from '../../../default/index'

const value = defineModel()
</script>

<template>
  <hl-form-item label="是否包含过签">
    <hl-radio v-model="value" :options="is_has_pass" />
  </hl-form-item>
</template>

<style scoped lang="scss"></style>
