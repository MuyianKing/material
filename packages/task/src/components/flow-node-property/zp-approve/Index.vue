<script setup>
import useFlowStore from '../../../pinia/modules/useFlowStore'

const value = defineModel()

const options = [{
  label: '是',
  value: 1,
}, {
  label: '否',
  value: 2,
}]

const { node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.zp_enable === 1" label="是否需要审批">
    <hl-radio v-model="value" :options />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
