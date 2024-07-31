<script setup>
import useFlowStore from '../../../pinia/modules/useFlowStore'

const value = defineModel()
const { node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item :label="node.base_config?._name_label || '名称'">
    <hl-input v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
