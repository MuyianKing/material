<script setup>
import { storeToRefs } from 'pinia'
import { HlFormItem } from '@hl/ui'
import ComplexControlSelect from '../../person-complex-select/Index.vue'
import useFlowStore from '../../../pinia/modules/useFlowStore'

const value = defineModel()

const { node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.zp_enable === 1 && node.base_config.zp_sp_enable === 1 && node.base_config.zp_sp_type === 1" label="审批人">
    <complex-control-select v-model="value" title="审批人" v-bind="$attrs" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
