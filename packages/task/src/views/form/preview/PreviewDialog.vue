<script setup>
import { provide, ref } from 'vue'
import { HlDialog } from '@hl/ui'
import PreviewTemplate from './Template.vue'
import '@hl/ui/src/components/dialog/Index.css'

defineProps({
  config: {
    type: Object,
    default: null,
  },
  formId: {
    type: [String, Number],
    default: '',
  },
})

const form_data = ref({})
const form = ref({})
provide(form)
</script>

<template>
  <hl-dialog title="表单预览" width="90%" top="50px" class="task-preview-dialog">
    <preview-template v-model="form_data" :config="config" :form-id="formId" />
  </hl-dialog>
</template>

<style lang="scss">
.task-preview-dialog {
  max-width: 1200px;

  .task-edit-form {
    height: calc(100vh - 190px);
  }
}
</style>
