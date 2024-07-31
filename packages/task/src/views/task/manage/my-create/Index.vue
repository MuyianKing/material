<script setup>
import { HlDate } from '@hl/ui'
import useListPage from '@hl/ui/src/list-page/index'

import { getTaskManagerOne, taskManagement } from '../../../../server/task'
import { refreshTableRow } from '../../../../utils'
import SelectionStart from '../components/SelectionStart.vue'
import DeleteButtun from '../components/DeleteButton.vue'
import TaskTable from '../components/TaskTable.vue'

const props = defineProps({
  groupId: {
    type: String,
    default: '',
  },
})

const {
  HlListPage,
  query,
  table_data,
  search,
  getData,
} = useListPage({
  query: {
    create_end_time: '',
    create_start_time: '',
    query: '',
    info_group_id: props.groupId,
  },
  server: taskManagement,
  pageConfig: {
    sizes: true,
  },
})

// 刷新一行
function refresh({ type, row }) {
  if (type === 'delete' || type === 'refresh') {
    getData()
  } else {
    refreshTableRow(row, () => getTaskManagerOne(row.task_id))
  }
}

const selected_task_ids = ref([])
const check_all = ref(false)

function refreshAfterDelAll() {
  check_all.value = false
  getData()
}
</script>

<template>
  <div class="create-container">
    <div class="content">
      <!-- 条件搜索 -->
      <hl-list-page no-add>
        <template #search>
          <hl-form-item label="创建时间">
            <hl-date v-model:end="query.create_end_time" v-model:start="query.create_start_time" date-type="datetime" type="range" @change="search" />
          </hl-form-item>
          <hl-form-item label="任务标题">
            <hl-input v-model="query.query" style="width: 200px" @input="search" />
          </hl-form-item>
        </template>
        <template #button>
          <selection-start :tasks="selected_task_ids" @refresh="getData" />
          <delete-buttun :tasks="selected_task_ids" @refresh="refreshAfterDelAll" />
        </template>
        <template #table>
          <task-table v-model:check="selected_task_ids" v-model:check-all="check_all" :data="table_data.data" @refresh="refresh" />
        </template>
      </hl-list-page>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-container {
  display: flex;
  padding: 10px;
  padding-top: 0;
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
}
</style>
