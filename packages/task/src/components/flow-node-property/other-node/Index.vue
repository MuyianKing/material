<script setup>
import { storeToRefs } from 'pinia'
import { HlFormItem, HlSelect } from '@hl/ui'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/select/Index.css'

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
