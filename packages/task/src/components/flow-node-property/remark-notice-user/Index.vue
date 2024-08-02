<script setup>
import { storeToRefs } from 'pinia'
import { HlFormItem, HlRadio } from '@hl/ui'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/radio/Index.css'

const value = defineModel()

const options = [{
  label: '一般配置',
  value: 0,
}, {
  label: '自定义',
  value: 1,
}, {
  label: '节点继承',
  value: 2,
}, {
  label: '当前节点的处置人员',
  value: 3,
}]

const { node } = storeToRefs(useFlowStore())
</script>

<template>
  <hl-form-item v-if="node.base_config.notice_type !== 0 && node.base_config.notice_type.length > 0" label="通知人员配置">
    <hl-radio v-model="value" :options="options" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
