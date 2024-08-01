<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import { HlButton, HlDate, HlFormDialog, HlFormItem } from '@hl/ui'

import { startTask } from '../../../../server/task'

const props = defineProps({
  tasks: Array,
  buttonText: {
    type: String,
    default: '批量启动',
  },
})

const emits = defineEmits(['refresh'])

const startForm = ref({
  start_time: '',
})

const dialogVisible = ref(false)

function handleClick() {
  if (props.tasks.length === 0) {
    hl.message.warning('请先勾选需要启动的任务')
    return
  }

  console.log(props.tasks)
  startForm.value.start_time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  dialogVisible.value = true
}

function submit() {
  startTask(props.tasks, startForm.value.start_time).then(() => {
    hl.message.success('任务启动成功')
    emits('refresh')
    dialogVisible.value = false
  }).catch((e) => {
    hl.message.error(e, '任务启动失败')
  })
}
</script>

<template>
  <hl-button type="success" @click="handleClick">
    {{ buttonText }}
  </hl-button>
  <hl-form-dialog v-model="dialogVisible" :model="startForm" title="批量启动" @submit="submit">
    <hl-form-item label="启动时间" required>
      <hl-date v-model="startForm.start_time" date-type="datetime" style="width: 100%">
        />
      </hl-date>
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang="scss" scoped>

</style>
