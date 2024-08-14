<script setup>
import { ref, watch } from 'vue'
import { HlFormDialog, HlFormItem } from '@hl/ui'

import { PersonSelectPanel } from '@hl/tyyh'
import { taskDeploy } from '../../../../../server/task'
import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'

import '@hl/tyyh/src/components/person-select-panel/Index.css'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: [String, Number],
    required: true,
  },
  processId: {
    type: [String, Number],
    required: true,
  },
})
const emits = defineEmits(['update:modelValue', 'success'])
const addForm = ref({})

function onSubmit() {
  hl.message.loading('正在添加人员...')
  taskDeploy({
    deploy: 3,
    task_ids: [props.taskId],
    process_id: props.processId,
    new_id_card: addForm.value.id_card.join(','),
  }).then(() => {
    hl.message.success('添加成功')
    handleClose()
    emits('success', addForm.value.id_card.join(','))
  }).catch((e) => {
    hl.message.error(e, '添加失败')
  }).finally(() => {
    hl.message.closeLoading()
  })
}

function handleClose() {
  emits('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    addForm.value = {
      id_card: [],
    }
  }
}, { immediate: true })
</script>

<template>
  <hl-form-dialog :model="addForm" :model-value="modelValue" label-width="100px" title="添加人员" top="190px" width="700"
                  @close="handleClose" @submit="onSubmit"
  >
    <hl-form-item label="添加的人员" prop="id_card" required>
      <person-select-panel v-model="addForm.id_card" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang="scss" scoped></style>
