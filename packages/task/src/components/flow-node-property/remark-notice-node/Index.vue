<script setup>
import useFlowStore from '../../../pinia/modules/useFlowStore'

const value = defineModel()

const { node, all_can_link_nodes } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.notice_type !== 0 && node.base_config.notice_type.length > 0 && node.base_config.notice_user === 2" label="继承节点">
    <hl-select v-model="value" :options="all_can_link_nodes" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
