<script setup>
import { ElButton, ElLink } from 'element-plus'
import { taskSuccess } from '../../../../server'

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
})
const emits = defineEmits(['refresh-one'])

async function handleClick() {
  try {
    await hl.message.confirm('确认完成任务？')

    await taskSuccess({ task_id: props.taskId })
    emits('refresh-one')
  } catch (error) {
    console.log('取消完成', error)
    hl.message.error(error, '完成失败')
  }
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" :type="finish ? 'danger' : 'primary'" @click="handleClick">
    完成
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" :type="finish ? 'danger' : 'primary'" v-bind="$attrs"
    @click="handleClick">
    完成
  </el-link>
</template>

<style scoped lang="scss"></style>
