<script setup>
import { storeToRefs } from 'pinia'
import { HlFormItem } from '@hl/ui'
import DictPicker from '../../false-dict/Picker.vue'
import useFlowStore from '../../../pinia/modules/useFlowStore'

const { node } = storeToRefs(useFlowStore())
const value = defineModel()
</script>

<template>
  <hl-form-item v-if="node.base_config.zp_enable === 1 && node.base_config.zp_sp_enable === 1" label="是否通知">
    <dict-picker v-model="value" comp="checkbox" type="notice_type" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
