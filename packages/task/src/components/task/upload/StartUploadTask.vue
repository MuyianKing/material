<script setup>
import { useList } from '@hl/jooks'
import { ref, watch } from 'vue'
import { HlDialog } from '@hl/ui'
import { ElAlert } from 'element-plus'
import TaskTable from '../../../views/task/manage/components/TaskTable.vue'
import { getTaskManagerOne, taskManagement } from '../../../server/task'
import { refreshTableRow } from '../../../utils'
import SelectionStart from '../../../views/task/manage/components/SelectionStart.vue'

const props = defineProps({
  groupId: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['submit'])

const {
  HlListPage,
  table_data,
  search,
  query,
  getData,
} = useList({
  query: {
    info_group_id: props.groupId,
  },
  server: taskManagement,
})

// 刷新一行
function refresh({ type, row }) {
  if (type === 'delete' || type === 'refresh') {
    getData()
  } else {
    refreshTableRow(row, () => getTaskManagerOne(row.task_id))
  }
}

function handleSubmit() {
  emits('submit')
}

const selected_task_ids = ref([])
watch(() => props.groupId, (val) => {
  query.info_group_id = val
  search()
})
</script>

<template>
  <hl-dialog title="下发任务" width="90%" top="50">
    <div class="start-task">
      <hl-list-page no-add no-search>
        <template #search>
          <el-alert center title="请确定流程中的，签收，办理，审批人员没有问题后下发任务，或者您也可以到自助指令/任务管理界面下发任务" type="warning"
            :closable="false" />
        </template>

        <template #table>
          <task-table v-model:check="selected_task_ids" :data="table_data.data" style="height: calc(100vh - 350px)"
            @refresh="refresh" />
        </template>
      </hl-list-page>
    </div>

    <template #footer>
      <selection-start :tasks="selected_task_ids" button-text="下发" @refresh="handleSubmit" />
    </template>
  </hl-dialog>
</template>

<style scoped lang="scss">
.start-task {
  :deep(.list-page) {
    padding: 0;

    .search-area {
      padding: 0;
      margin: 0;
      margin-bottom: 10px;
    }

    .bottom {
      margin-top: 0;
    }

    .table-body {
      padding: 0;
    }
  }
}
</style>
