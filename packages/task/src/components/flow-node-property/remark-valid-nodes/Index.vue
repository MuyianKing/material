<script setup>
import { storeToRefs } from 'pinia'
import { HlFormItem, HlSelect } from '@hl/ui'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/select/Index.css'

const value = defineModel()

const { all_can_link_nodes } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item label="生效节点">
    <hl-select v-model="value" :options="all_can_link_nodes" multiple placeholder="不选全程生效" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
