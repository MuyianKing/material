<script setup>
import { remarkTask } from '../../../../server'
import HandleDialog from './handle/components/Dialog.vue'

const props = defineProps({
  taskId: {
    type: [String, Number],
    default: '',
  },
  finish: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
})

const emits = defineEmits(['refresh-one'])

const show_dialog = ref(false)
const form_config = ref(null)
const title = ref('')

const instance = getCurrentInstance()

async function handleClick() {
  try {
    const result = await instance.parent.exposed.getData()
    title.value = result.title
    form_config.value = result.a_node_info[props.value]
    show_dialog.value = true
  } catch (e) {
    hl.message.error(e, '获取任务信息出错')
  }
}

function submit(form) {
  return remarkTask({
    task_id: props.taskId,
    handle_num: props.value,
    content: form,
  })
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" :type="finish ? 'danger' : 'primary'" @click="handleClick">
    <slot />
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" :type="finish ? 'danger' : 'primary'" v-bind="$attrs" @click="handleClick">
    <slot />
  </el-link>

  <handle-dialog v-model="show_dialog" :task-id :config="form_config" :title top="10px" :server="submit" @refresh="emits('refresh-one')" />
</template>

<style lang='scss' scoped></style>
