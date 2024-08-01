<script setup>
import { defineEmits, defineModel, defineProps, ref } from 'vue'
import { HlTable, HlTableColumn, HlTime } from '@hl/ui'

import TaskStatus from '../../../../components/task/Status.vue'
import TaskOpt from '../../../../components/task/options/Index.vue'
import HandlePerson from '../my-manage/deploy/HandlePerson.vue'
import FlowList from './FlowList.vue'

defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
})

// 刷新一行
const emits = defineEmits(['refresh'])

const selected_task_ids = defineModel('check', {
  type: Array,
  default() {
    return []
  },
})

// 单个调度人员
const handle_person_visible = ref(false)
const handle_person_data = ref({})

function handleFlowClick(event, row) {
  handle_person_data.value = {
    ...event,
    task_id: row.task_id,
    dialog_title: `${event.label}节点的处置人`,
  }
  handle_person_visible.value = true
}

const check_all = defineModel('checkAll', {
  type: Boolean,
  default: false,
})
function refresh(type, row) {
  emits('refresh', {
    type,
    row,
  })
}
</script>

<template>
  <hl-table v-model:check="selected_task_ids" v-model:check-all="check_all" :data="data" row-key="task_id" select v-bind="$attrs">
    <hl-table-column label="序号" prop="index" style="white-space: nowrap;" width="60" />
    <hl-table-column label="任务名称" prop="config_name" width="200" />
    <hl-table-column label="任务标题" prop="title" width="200" />
    <hl-table-column label="创建时间" prop="create_time" width="200">
      <template #default="{ row }">
        <hl-time :time="row.create_time" />
      </template>
    </hl-table-column>
    <hl-table-column label="开始时间" prop="work_starttime" width="200">
      <template #default="{ row }">
        <hl-time :time="row.work_starttime" />
      </template>
    </hl-table-column>
    <hl-table-column label="流程" prop="work_starttime" width="200" no-tip>
      <template #default="{ row }">
        <flow-list :data="row.persons || []" click-cell @cell-click="handleFlowClick($event, row)" />
      </template>
    </hl-table-column>
    <hl-table-column label="状态" prop="status">
      <template #default="{ row }">
        <task-status :data="row.statusConfig || []" />
      </template>
    </hl-table-column>
    <hl-table-column label="操作" width="200">
      <template #default="{ row }">
        <task-opt :task="row" @refresh="refresh($event, row)" @refresh-one="refresh($event, row)" />
      </template>
    </hl-table-column>
  </hl-table>

  <handle-person v-model="handle_person_visible" :data="handle_person_data" @refresh="refresh('refresh')" />
</template>

<style scoped lang="scss">

</style>
