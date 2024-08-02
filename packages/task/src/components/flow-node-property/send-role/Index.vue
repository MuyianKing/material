<script setup>
import { RoleSelect } from '@hl/tyyh'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { HlFormItem } from '@hl/ui'
import useFlowStore from '../../../../../../packages/task/src/pinia/modules/useFlowStore'
import '@hl/ui/src/components/form-item/Index.css'

const value = defineModel()
const { node } = storeToRefs(useFlowStore())
const showItemFlag = computed(() => {
  if (node.value.base_config.custom_user === 2) {
    if (Array.isArray(node.value.base_config.send_org)) {
      return node.value.base_config.send_org.length > 0
    } else {
      return !!node.value.base_config.send_org
    }
  }
  return false
})
</script>

<template>
  <hl-form-item v-if="showItemFlag" label="下发角色">
    <role-select v-model="value" class="w-full" clearable label="下发角色" multiple v-bind="$attrs" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
