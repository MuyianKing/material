<script setup>
import useFlowStore from '../../../pinia/modules/useFlowStore'

const value = defineModel()

const { prev_nodes, all_can_link_nodes, node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.custom_user === 2" label="继承节点">
    <hl-select v-model="value" :options="node.type === 'RemarkNode' ? all_can_link_nodes : prev_nodes" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
