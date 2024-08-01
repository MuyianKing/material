<script setup>
import { HlCheckbox, HlFormItem, HlIcon } from '@hl/ui'
import { sign_type_list } from '../../../default/flow'

defineProps({
  node: {
    type: Object,
    default() {
      return {}
    },
  },
})

const value = defineModel()
</script>

<template>
  <hl-form-item v-if="node.type !== 'EndNode'" label="流转方式">
    <hl-checkbox v-model="value" :multiple="false" :options="sign_type_list" />
    <el-tooltip effect="dark" placement="top-start">
      <template #content>
        <div>会签：该节点所有人都完成才会进入下一节点。</div>
        <div>或签：该节点一个人完成处置，即进入下一个节点，其他人无需再处置</div>
        <div>过签：一个人完成处置，即进入下一个节点，不影响其他人处置</div>
      </template>
      <hl-icon class="text-gray-600 ml-2 cursor-pointer" icon="mingcute:question-fill" />
    </el-tooltip>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
