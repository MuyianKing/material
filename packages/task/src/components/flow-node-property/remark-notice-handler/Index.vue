<script setup>
import ComplexControlSelect from '../../person-complex-select/Index.vue'
import useFlowStore from '../../../../../../packages/task/src/pinia/modules/useFlowStore'

const value = defineModel()
const { node, all_can_link_nodes } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.notice_type !== 0 && node.base_config.notice_type.length > 0 && node.base_config.notice_user === 0" label="通知人员">
    <complex-control-select v-model="value" label="通知人员" v-bind="$attrs" :nodes="all_can_link_nodes" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
