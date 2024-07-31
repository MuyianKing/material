<script setup>
import FormDetail from '../../../../../../views/form/preview/Template.vue'
import { finishTask } from '../../../../../../server'

const props = defineProps({
  taskId: {
    type: [String, Number, null],
    required: true,
  },
  config: {
    type: [null, Object],
    required: true,
  },
  formId: {
    type: [null, String],
    default: '',
  },
  formData: {
    type: Object,
    default: null,
  },
  title: {
    type: String,
    default: '重新处置',
  },
  finish: {
    type: Boolean,
    default: false,
  },
  server: {
    type: Function,
    default: null,
  },
})

const emits = defineEmits(['refresh'])

async function submit() {
  try {
    const { form } = await form_ref.value.validate()
    hl.message.loading('正在保存...')
    await finallySubmit(form)
  } catch (e) {
    hl.message.error(e, '操作失败')
  } finally {
    hl.message.closeLoading()
  }
}

const form_ref = ref()

const show = defineModel({
  type: Boolean,
  default: false,
})

async function finallySubmit(form) {
  if (props.server) {
    await props.server(form)
  } else {
    await finishTask(props.taskId, {
      ...form,
      id: props.formId,
    }, props.finish ? 1 : 0)
  }

  hl.message.success('操作成功')
  emits('refresh')
  show.value = false
}
</script>

<template>
  <hl-dialog v-model="show" width="900px" top="60px" :title>
    <form-detail ref="form_ref" :config :form-data :task-id />
    <template #footer>
      <hl-button @click="submit">
        <slot>
          {{ formData ? '重新提交' : '提交' }}
        </slot>
      </hl-button>
    </template>
  </hl-dialog>
</template>

<style scoped lang="scss">

</style>
