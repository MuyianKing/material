<script setup>
import { ref } from 'vue'
import { ElButton, ElLink } from 'element-plus'
import { getTaskById, publishTask } from '../../../../../server'
import HandleDialog from './components/Dialog.vue'

import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/link/style/css'

const props = defineProps({
  taskId: {
    type: [String, Number],
    default: '',
  },
  button: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh-one'])

const show_dialog = ref(false)
const form_config = ref(null)
const title = ref('')
const form_data = ref(null)
let config_uuid = ''

async function handleClick() {
  const result = await getTaskById(props.taskId)
  config_uuid = result.config_uuid
  title.value = `重新下发${result.title}`
  form_config.value = result.start_node.form_config
  form_data.value = result.start_node.form_content
  show_dialog.value = true
}

function handleSubmit(form) {
  return publishTask({
    config_uuid,
    task_id: props.taskId,
    ...form,
  })
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="danger" @click="handleClick">
    <slot />
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="danger" v-bind="$attrs" @click="handleClick">
    <slot />
  </el-link>

  <handle-dialog v-model="show_dialog" :server="handleSubmit" :task-id :config="form_config" :form-data="form_data"
                 :title @refresh="emits('refresh-one')"
  >
    下发
  </handle-dialog>
</template>

<style lang='scss' scoped></style>
