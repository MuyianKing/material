<script setup>
import ComplexControlSelect from '../../person-complex-select/Index.vue'
import useFlowStore from '../../../../../../packages/task/src/pinia/modules/useFlowStore.js'

const value = defineModel()
const { node, all_can_link_nodes } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.custom_user === 0" :label="node.base_config?.handler_label || '处置人'">
    <complex-control-select v-model="value" :label="node.base_config?.handler_label || '处置人'" v-bind="$attrs" :nodes="all_can_link_nodes" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
