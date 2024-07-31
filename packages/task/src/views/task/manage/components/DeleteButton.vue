<script setup>
import { deleteTask } from '../../../../server/task'

const props = defineProps({
  tasks: Array,
})

const emits = defineEmits(['refresh'])

function deleteTaskFun() {
  if (props.tasks.length === 0) {
    hl.message.warning('请选择任务后再进行删除操作')
    return
  }
  hl.message.confirm('确认删除所选任务？').then(() => {
    deleteTask(props.tasks).then(() => {
      hl.message.success('删除成功')
      emits('refresh')
    }).catch((e) => {
      hl.message.error(e, '删除失败')
    })
  })
}
</script>

<template>
  <hl-button type="danger" @click="deleteTaskFun">
    批量删除
  </hl-button>
</template>

<style lang="scss" scoped>

</style>
