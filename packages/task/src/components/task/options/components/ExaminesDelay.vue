<script setup>
import { ref, watch } from 'vue'
import { HlFormDialog, HlFormItem, HlInput, HlSelect } from '@hl/ui'
import { examinesDelayTask } from '../../../../server'
import ExaminesDelay from '../../../../model/task/examinesDelay'
import { examinesApplyFor } from '../../../../default/task'

const props = defineProps({
  taskId: {
    type: [String, Number],
    default: '',
  },
  button: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['refresh-one'])

const form = ref(new ExaminesDelay())
const show_detail = ref(false)

watch(show_detail, (val) => {
  if (val) {
    form.value = new ExaminesDelay(props.taskId)
  }
})
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="success" @click="show_detail = true">
    审批呈请延长
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="success" v-bind="$attrs" @click="show_detail = true">
    <slot>
      审批呈请延长
    </slot>
  </el-link>

  <hl-form-dialog v-model="show_detail" title="审批呈请延长" :model="form" :server="examinesDelayTask" @refresh="$emit('refresh-one')">
    <hl-form-item label="审批结果" required prop="result">
      <hl-select v-model="form.result" :options="examinesApplyFor" />
    </hl-form-item>
    <hl-form-item label="原因" required prop="remark">
      <hl-input v-model="form.remark" type="textarea" :rows="4" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style scoped lang="scss"></style>
