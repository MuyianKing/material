<script setup>
import { provide } from 'vue'
import useDetailData from './useDetailData'

defineOptions({
  name: 'WjTaskCenterDetailHandleWrapper',
})

const props = defineProps({
  taskId: {
    type: [String, Number, null],
    required: true,
  },
})

const { task_data, outer_comp_ids, getData } = useDetailData(props.taskId)
provide('outer_comp_ids', outer_comp_ids)
defineExpose({
  getData,
})
</script>

<template>
  <slot :task="task_data" />
</template>

<style scoped lang="scss">

</style>
