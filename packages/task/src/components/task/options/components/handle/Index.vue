<script setup>
import HandleDialog from './components/Dialog.vue'

defineProps({
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
})

const emits = defineEmits(['refresh-one'])

const show_dialog = ref(false)
const form_config = ref(null)
const title = ref('')

const instance = getCurrentInstance()

async function handleClick() {
  try {
    const result = await instance.parent.parent.exposed.getData()
    title.value = `处置${result.title}`
    form_config.value = result.cur_node.form_config
    show_dialog.value = true
  } catch (e) {
    hl.message.error(e, '获取任务信息出错')
  }
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" :type="finish ? 'danger' : 'primary'" @click="handleClick">
    <slot />
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" :type="finish ? 'danger' : 'primary'" v-bind="$attrs" @click="handleClick">
    <slot />
  </el-link>

  <handle-dialog v-model="show_dialog" :task-id :config="form_config" :finish :title top="10px" @refresh="emits('refresh-one')" />
</template>

<style lang='scss' scoped></style>
