<script setup>
import { inject, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { HlFormItem, HlInput, HlSelect } from '@hl/ui'
import { ElDivider } from 'element-plus'
import { getPrevNodes } from '../../../hooks/flow'
import useFlowStore from '../../../../../../packages/task/src/pinia/modules/useFlowStore'
import 'element-plus/es/components/divider/style/css'

const model_value = defineModel({
  type: Object,
  required: true,
})

const { node } = storeToRefs(useFlowStore())
const getLf = inject('getLf')

const node_list = ref([])
watch(node, () => {
  const lf = getLf()
  if (lf) {
    node_list.value = getPrevNodes(lf, node.value.id, {
      obj: true,
    })
  }
}, {
  deep: true,
  immediate: true,
})
</script>

<template>
  <div>
    <el-divider content-position="left">
      审批配置
    </el-divider>
    <hl-form-item label="审批通过标签名称" required label-width="150px">
      <hl-input v-model="model_value.pass_label" />
    </hl-form-item>

    <hl-form-item label="审批驳回标签名称" required label-width="150px">
      <hl-input v-model="model_value.reject_label" />
    </hl-form-item>

    <hl-form-item label="驳回重新开始节点" required label-width="150px">
      <hl-select v-model="model_value.back_node" :options="node_list" />
    </hl-form-item>
  </div>
</template>

<style lang='scss' scoped></style>
