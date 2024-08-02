<script setup>
import { ref } from 'vue'
import { HlDate, HlFormItem, HlInput } from '@hl/ui'
import { useList } from '@hl/hooks'

import { getTaskManagerOne, taskDeploy, taskMyManage } from '../../../../server/task'
import { refreshTableRow } from '../../../../utils'

import TaskTable from '../components/TaskTable.vue'
import DeployIndex from './deploy/Index.vue'
import TypeSwitch from './deploy/TypeSwitch.vue'
import '@hl/ui/src/components/date/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'

const {
  HlListPage,
  query,
  table_data,
  search,
  getData,
} = useList({
  query: {
    create_end_time: '',
    create_start_time: '',
    query: '',
    deploy: 2,
  },
  pageConfig: {
    sizes: true,
  },
  server: taskMyManage,
})

// 刷新一行
function refresh({ type, row }) {
  if (type === 'delete' || type === 'refresh') {
    getData()
  } else {
    refreshTableRow(row, () => getTaskManagerOne(row.task_id))
  }
}

// 调度
const deploy_visible = ref(false)

// 按钮调度
const selected_task_ids = ref([])

function handleDeploySubmit(e) {
  if (selected_task_ids.value.length === 0) {
    hl.message.warning('请先选择任务')
    return
  }

  hl.message.loading('正在调度人员...')
  taskDeploy({
    ...e,
    task_ids: selected_task_ids.value,
  }).then(() => {
    hl.message.success('调度成功')
  }).catch((e) => {
    hl.message.error(e, '调度失败')
  }).finally(() => {
    hl.message.closeLoading()
  })
}
</script>

<template>
  <div class="manage-container">
    <div class="content">
      <!-- 条件搜索 -->
      <hl-list-page no-add>
        <template #search>
          <hl-form-item label="创建时间">
            <hl-date v-model:end="query.create_end_time" v-model:start="query.create_start_time" date-type="datetime"
              type="range" @change="search" />
          </hl-form-item>
          <hl-form-item label="任务标题">
            <hl-input v-model="query.query" style="width: 200px" @input="search" />
          </hl-form-item>
        </template>
        <template #button>
          <div class="flex justify-end items-center flex-1" style="min-width:500px">
            <type-switch v-model:deploy="query.deploy" v-model:id-card="query.id_card" @search="search"
              @deploy-submit="handleDeploySubmit" />
          </div>
        </template>
        <template #table>
          <task-table v-model:check="selected_task_ids" :data="table_data.data" @refresh="refresh" />
        </template>
      </hl-list-page>
    </div>
    <deploy-index v-model="deploy_visible" />
  </div>
</template>

<style lang="scss" scoped>
.manage-container {
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
