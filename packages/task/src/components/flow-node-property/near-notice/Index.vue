<script setup>
import { HlFormItem } from '@hl/ui'
import DictPicker from '../../false-dict/Picker.vue'
import '@hl/ui/src/components/form-item/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="临期通知">
    <dict-picker v-model="value" comp="checkbox" type="notice_type" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
