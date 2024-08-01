<script setup>
import { defineEmits, defineProps } from 'vue'
import { HlTable, HlTableColumn } from '@hl/ui'

import TaskOpt from '../../../../../components/task/options/Index.vue'
import TaskStatus from '../../../../../components/task/Status.vue'

defineProps({
  configUuid: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    default() {
      return []
    },
  },
})

defineEmits(['refresh-one', 'refresh'])
</script>

<template>
  <hl-table :data>
    <hl-table-column type="index" />
    <hl-table-column label="任务编号" prop="task_id" />
    <hl-table-column label="任务标题" prop="title" />
    <hl-table-column label="创建时间" prop="work_starttime" type="time" />
    <hl-table-column label="截至时间" prop="work_endtime" type="time" />
    <hl-table-column label="任务状态">
      <template #default="{ row }">
        <task-status :data="row.a_status" />
      </template>
    </hl-table-column>
    <hl-table-column label="操作" min-width="100">
      <template #default="{ row }">
        <task-opt :task="row" @refresh-one="$emit('refresh-one')" @refres="$emit('refresh')" />
      </template>
    </hl-table-column>
  </hl-table>
</template>

<style scoped lang="scss">

</style>
