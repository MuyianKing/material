<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { HlButton } from '@hl/ui'
import TaskFormEdit from '../../../views/task/design/components/form/EditDialog.vue'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import '@hl/ui/src/components/button/Index.css'

const emits = defineEmits(['update'])

const value = defineModel({
  type: Object,
  default() {
    return {
      form_id: '',
    }
  },
})

const show_edit_form = ref(false)
function createForm() {
  show_edit_form.value = true
}

const { node } = storeToRefs(useFlowStore())

const is_start = computed(() => {
  return node.value.type === 'StartNode'
})

function handleUpdate(row) {
  emits('update', row)
}
</script>

<template>
  <div class="text-center pt-4">
    <hl-button type="success" icon="tabler:send" @click="createForm">
      {{ value.form_id ? '已关联，点击修改' : '去创建' }}
    </hl-button>

    <task-form-edit v-model="show_edit_form" v-model:form_id="value.form_id" :is-start="is_start" @update="handleUpdate" />
  </div>
</template>
