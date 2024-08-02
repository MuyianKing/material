<script setup>
import { storeToRefs } from 'pinia'
import { HlFormItem, HlRadio } from '@hl/ui'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/radio/Index.css'

const value = defineModel()

const options = [{
  label: '一般配置',
  value: 1,
}, {
  label: '处置人',
  value: 2,
}]

const { node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.zp_enable === 1 && node.base_config.zp_sp_enable === 1" label="是否需要审批">
    <hl-radio v-model="value" :options />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
