<script setup>
import { storeToRefs } from 'pinia'
import { HlFormItem } from '@hl/ui'
import ComplexControlSelect from '../../person-complex-select/Index.vue'
import useFlowStore from '../../../pinia/modules/useFlowStore'

const value = defineModel()
const { node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.custom_user === 0" label="抄送人">
    <complex-control-select v-model="value" title="抄送人" v-bind="$attrs" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
