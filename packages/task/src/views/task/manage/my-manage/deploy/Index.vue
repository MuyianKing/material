<script setup>
import { ref } from 'vue'
import { HlFormDialog, HlFormItem, HlRadio } from '@hl/ui'
import IdCardList from './IdCardList.vue'
import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/radio/Index.css'

const formData = ref({})

// 1：两个人员之间调度 2：检测到人员变化 3：指定某个节点调度, 添加一个人  4: 删除一个人
const deployOptions = ref([
  {
    label: '两个人员之间调度',
    value: 1,
  },
  {
    label: '检测到人员变化',
    value: 2,
  },
  {
    label: '指定某个节点调度,添加一个人',
    value: 3,
  },
  {
    label: '删除一个人',
    value: 5,
  },
])
</script>

<template>
  <hl-form-dialog :model="formData" title="调度">
    <hl-form-item label="调度类型">
      <hl-radio v-model="formData.type" :options="deployOptions" />
    </hl-form-item>
    <id-card-list v-model="formData.new_id_card" label="新人员" prop="new_id_card" />
    <id-card-list v-model="formData.process_id" label="调度新人员" prop="new_id_card" />
  </hl-form-dialog>
</template>

<style lang="scss" scoped></style>
