<script setup>
import { ref, watch } from 'vue'
import { HlDate, HlFormDialog, HlFormItem, HlInput } from '@hl/ui'
import { delayTask } from '../../../../server'
import DelayModel from '../../../../model/task/delay'

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
  button: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['refresh-one'])

const show_detail = ref(false)
function handleClick() {
  show_detail.value = true
}

const form = ref(new DelayModel())
watch(show_detail, (val) => {
  if (val) {
    form.value = new DelayModel(props.task?.task_id, props.task?.status_end_time)
  }
})
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="warning" @click="handleClick">
    呈请延长
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="warning" v-bind="$attrs" @click="handleClick">
    <slot>
      呈请延长
    </slot>
  </el-link>

  <hl-form-dialog v-model="show_detail" title="呈请延长" :model="form" :server="delayTask" @refresh="$emit('refresh-one')">
    <hl-form-item label="延长到" required prop="end_time">
      <hl-date v-model="form.end_time" date-type="datetime" class="w-full" />
    </hl-form-item>
    <hl-form-item label="延长理由" required prop="remark">
      <hl-input v-model="form.remark" type="textarea" :rows="4" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
