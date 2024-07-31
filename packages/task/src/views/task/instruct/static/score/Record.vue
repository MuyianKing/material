<script name="InstructIndex" setup>
import useListPage from '@hl/ui/src/list-page/index'
import { cloneDeep } from 'lodash-es'
import { deductionType } from '../../../../../default/instruct'
import { getJzzlScoreRecord } from '../../../../../server/instruct'
import TaskDetail from '../../../../task/detail/Index.vue'

const props = defineProps({
  queryParams: {
    type: Object,
    default: () => ({}),
  },
  org: {
    type: [Number, String],
    required: true,
  },
  title: {
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
    type: '',
    config_uuid: useRoute().meta?.params?.config_uuids || '',
    create_end_time: '',
    create_start_time: dayjs().subtract(7, 'd').format('YYYY-MM-DD 00:00:00'),
  },
  data_extend_keys: ['header'],
  server: getJzzlScoreRecord,
  autoSearch: false,
})

const taskId = ref('')
const taskDetailShow = ref(false)

function handleClick(row) {
  taskId.value = row.taskInfo?.task_id
  taskDetailShow.value = true
}

const attrs = useAttrs()
watch(() => attrs.modelValue, (val) => {
  if (val) {
    Object.assign(query, cloneDeep(props.queryParams))
    query.organization = props.org
    getData()
  }
})
</script>

<template>
  <hl-dialog :title="`${title}扣分记录`" height="80vh" top="60px" width="1000px">
    <hl-list-page class="p-0" label-width="auto" no-add>
      <template #search>
        <hl-form-item label="时间">
          <hl-date v-model:end="query.create_end_time" v-model:start="query.create_start_time" date-type="datetime" type="range" @change="search" />
        </hl-form-item>
        <hl-form-item label="类型">
          <hl-select v-model="query.type" :options="deductionType" all clearable style="width: 150px" @change="search" />
        </hl-form-item>
      </template>
      <template #table>
        <hl-table :data="table_data.data">
          <hl-table-column type="index" width="60" />
          <hl-table-column label="任务标题" prop="taskId">
            <template #default="{ row }">
              <el-link :underline="false" type="primary" @click="handleClick(row)">
                {{ row.taskInfo?.title }}
              </el-link>
            </template>
          </hl-table-column>
          <hl-table-column label="类型" prop="score">
            <template #default="{ row }">
              <el-tag :type="row.scoreType?.type" size="large">
                {{ row.scoreType?.label }}
              </el-tag>
            </template>
          </hl-table-column>
          <hl-table-column label="时间" prop="score">
            <template #default="{ row }">
              <hl-time :time="row.time" />
            </template>
          </hl-table-column>
          <hl-table-column label="扣分" prop="score">
            <template #default="{ row }">
              {{ row.score }}
            </template>
          </hl-table-column>
        </hl-table>
      </template>
    </hl-list-page>

    <task-detail v-model="taskDetailShow" :show-ctrl="false" :task-id="taskId" />
  </hl-dialog>
</template>

<style lang="scss" scoped></style>
