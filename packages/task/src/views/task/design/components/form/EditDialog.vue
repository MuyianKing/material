<script setup>
import { defineEmits, defineModel, defineProps, nextTick } from 'vue'
import { HlDialog } from '@hl/ui'

import FormEditor from '../../../../form/editor/Index.vue'
import { getFlatFields } from '../../../../../hooks/form'

defineProps({
  formId: {
    type: [String, Number],
    default: '',
  },
  // 是否是开始节点
  isStart: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update'])

const form_id = defineModel('form_id', { type: [String, Number], default: 0 })

const model_value = defineModel({
  type: Boolean,
  default: false,
})

function handleSuccess(row) {
  const old_form_id = form_id.value
  form_id.value = row.form_id
  model_value.value = false

  nextTick(() => {
    // 找到所有对外提供的组件
    emits('update', {
      old_form_id,
      new_form_id: form_id.value,
      field_list: getFlatFields(row.form_data.form_field_list).filter(item => ['FormTaskUser', 'FormOrg', 'FormDeadline'].includes(item.key)),
    })
  })
}
</script>

<template>
  <hl-dialog v-model="model_value" class="task-form-edit-dialog" fullscreen title="编辑表单" top="0">
    <form-editor :form-id="form_id" :is-start="isStart" @save-success="handleSuccess" />
  </hl-dialog>
</template>

<style lang='scss'>
.el-dialog.task-form-edit-dialog {
  .form-editor-wrapper {
    height: calc(100vh - 68px) !important;
  }

  .el-dialog__body {
    height: calc(100vh - 48px);
    padding: 0 !important;
  }
}
</style>
