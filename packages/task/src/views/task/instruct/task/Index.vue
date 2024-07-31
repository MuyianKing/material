<script setup name="InstructTemplate">
import useListPage from '@hl/ui/src/list-page/index'
import useBus from '@utils/bus'
import { exportJzzl, getJzzlList, getJzzlOne } from '../../../../server/instruct'
import { taskStatusOptions } from '../../../../default/instruct'
import { downloadTemplate, refreshTableRow } from '../../../../utils'
import UploadTask from '../../../../components/task/upload/UploadTask.vue'
import PublishTask from '../../publish/Index.vue'
import InstructTable from './components/InstructTable.vue'
import TabTitle from './components/TabTitle.vue'
import OrgCascader from './components/OrgnizationCascader.vue'
import TypeSelect from './components/TypeSelect.vue'

// 局长指令id
const config_uuid = useRoute().meta?.params?.config_uuid
const list_type = +useRoute().meta?.params?.type
const {
  HlListPage,
  query,
  table_data,
  search,
  getData,
} = useListPage({
  query: {
    // 对应tab值
    type: 89,
    // 局长指令还是督办指令
    list_type,
    task_status: '',
  },
  // resource表示该用户是否拥有发布权限
  data_extend_keys: ['header', 'resource'],
  server: getJzzlList,
})

// 创建任务弹窗
const showPublish = ref(false)

function handleRefresh(row) {
  refreshTableRow(row, () => getJzzlOne(row.task_id, list_type))
}

async function handleExportJzzl() {
  try {
    const { url, file_name } = await exportJzzl(query)
    hl.file.download(url, file_name)
  } catch (e) {
    hl.message.error(e, '导出失败')
  }
}

function tabChange() {
  table_data.data = []
  table_data.count = 0
  getData()
}

const { offBus } = useBus()
onUnmounted(() => {
  // 手动取消监听 - 由于组件下的tab-title不能触发Unmounted和失活回调
  offBus('refreshTableRow')
})
</script>

<template>
  <div class="director-instruct flex flex-col min-h-0 h-full w-full p-[10px] pt-0">
    <div class="content">
      <!-- 条件搜索 -->
      <hl-list-page label-width="auto" no-add>
        <template #search>
          <div class="w-full">
            <tab-title v-model="query.type" :list-type="list_type" @handle-change="tabChange" />
          </div>
          <hl-form-item label="关键词">
            <hl-input v-model="query.query" placeholder="指令标题、指令内容、拟办意见" style="width: 220px;" @input="search" />
          </hl-form-item>
          <hl-form-item label="发布时间">
            <hl-date v-model:end="query.create_end_time" v-model:start="query.create_start_time" date-type="datetime" type="range" @change="search" />
          </hl-form-item>
          <hl-form-item label="承办单位">
            <org-cascader v-model="query.organization" :max-collapse-tags="1" check-strictly collapse-tags multiple @change="search" />
          </hl-form-item>
          <hl-form-item label="任务类型">
            <type-select v-model="query.task_type" all clearable style="width: 120px" @change="search" />
          </hl-form-item>
          <hl-form-item label="任务状态">
            <hl-select v-model="query.task_status" :options="taskStatusOptions" style="width: 150px" @change="search" />
          </hl-form-item>
        </template>
        <template #button>
          <template v-if="table_data.resource">
            <hl-add-button v-show="query.type === 31" icon text="发布" @click="showPublish = true" />
          </template>
          <hl-export-button icon @click="handleExportJzzl" />
        </template>
        <template #table>
          <instruct-table :data="table_data.data" :header="table_data.header" @refresh-one="handleRefresh" @refresh="search" />
        </template>
        <div v-show="query.type === 31" class="absolute right-[10px] top-0" style="transform: translateY(-50%)">
          <div v-if="table_data.resource" class="flex justify-end items-end">
            <el-link :underline="false" class="whitespace-nowrap mr-4" type="primary" @click="downloadTemplate(config_uuid)">
              <hl-icon icon="fluent:calendar-template-24-regular" />
              下载模板
            </el-link>
            <upload-task :config-uuid="config_uuid" @refresh="search">
              <el-link :underline="false" class="whitespace-nowrap" type="success">
                <hl-icon icon="material-symbols:export-notes-outline-rounded" />
                导入数据
              </el-link>
            </upload-task>
          </div>
        </div>
      </hl-list-page>
    </div>

    <publish-task v-model="showPublish" :config-uuid="config_uuid" @refresh="search" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
}
</style>
