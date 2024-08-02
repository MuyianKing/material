<script setup>
import { ref } from 'vue'
import { ElLink } from 'element-plus'
import { HlButton, HlFormDialog, HlFormItem, HlInput, HlRadio } from '@hl/ui'
import { AuditFeedback } from '../../../../../../model/task/auditFeedback'
import { examinesApplyFor } from '../../../../../../default/task'
import { taskAuditFeedbackAudit } from '../../../../../../server'

import 'element-plus/es/components/link/style/css'

import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'
import '@hl/ui/src/components/button/Index.css'
import '@hl/ui/src/components/radio/Index.css'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: 'link',
  },
})
defineEmits(['refresh'])

const form = ref({})
const show = ref(false)
function handleIssue() {
  show.value = true
  form.value = new AuditFeedback(props.data)
}
</script>

<template>
  <el-link v-if="type === 'link'" type="danger" text="审批反馈" @click="handleIssue" />
  <hl-button v-else type="danger" @click="handleIssue">
    审批反馈
  </hl-button>

  <hl-form-dialog v-model="show" title="审批反馈" width="600px" top="60px" label-width="110" :model="form"
    :server="taskAuditFeedbackAudit" @refresh="$emit('refresh')">
    <hl-form-item label="审批结果：" prop="result" required>
      <hl-radio v-model="form.result" :options="examinesApplyFor" />
    </hl-form-item>
    <hl-form-item label="原因：" prop="remark" :required="form.result === 0">
      <hl-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4,maxRows: 24 }" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style scoped lang="scss"></style>
