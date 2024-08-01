<script setup>
import { defineEmits, defineExpose, defineProps, nextTick, ref, watch } from 'vue'

import MyAttention from '../attention/Index.vue'
import TaskTypeSwitch from '../switch-btn/TaskTypeSwitch.vue'
import AllTask from '../../../../../all-task/Index.vue'
import MonitorTask from '../../../../../monitor-task/Index.vue'

defineProps({
  editing: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['refresh', 'set-count'])

function handleSearch(params) {
  nextTick(() => {
    task_list_ref.value && task_list_ref.value.handleSearch(params)
  })
}

function handleRefresh(params) {
  emits('refresh', params)
  handleSearch(params)
}

const task_type_value = ref(0)
watch(task_type_value, (val) => {
  if (val === 0) {
    handleRefresh()
  }
})

const task_list_ref = ref()
defineExpose({
  handleSearch,
})
</script>

<template>
  <div class="flex-column relative h-full">
    <div style="min-height: 25px">
      <task-type-switch v-model="task_type_value" class="absolute top-2 right-0" />
      <my-attention :editable="editing" :task-type="task_type_value" @search="handleRefresh" @set-count="(count) => $emit('set-count', count)" />
    </div>
    <all-task v-if="task_type_value === 0" ref="task_list_ref" class="flex-1-0" />
    <monitor-task v-if="task_type_value === 1" class="flex-1-0" :auto-search="false" />
  </div>
</template>

<style scoped lang="scss">

</style>
