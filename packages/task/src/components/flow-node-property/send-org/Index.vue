<script setup>
import { Organization } from '@hl/tyyh'
import { storeToRefs } from 'pinia'
import { HlFormItem } from '@hl/ui'
import useFlowStore from '../../../../../../packages/task/src/pinia/modules/useFlowStore'
import '@hl/ui/src/components/form-item/Index.css'

const value = defineModel()
const { node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.custom_user === 2" label="下发单位">
    <organization v-model="value" class="w-full" label="下发单位" multiple v-bind="$attrs" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
