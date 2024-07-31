<script setup>
import useListPage from '@hl/ui/src/list-page/index'
import { getDetail } from '../../../../../server/infoGroup'
import StatusLabel from '../../../../../components/task/Status.vue'
import SetParams from './params/SetParams.vue'
import GetParams from './params/GetParams.vue'
import SetHeader from './header/SetHeader.vue'
import FormStatus from './FormStatus.vue'
import ExportBtn from './ExportBtn.vue'

const route = useRoute()
const info_group_id = route.params.id

const {
  HlListPage,
  query,
  getData,
  table_data,
  search,
  loading,
} = useListPage({
  query: {
    info_group_id,
    query: '',
    status: '',
    create_time: '',
    where: [],
    // 循环周期
    circle_index: '',
  },
  data_extend_keys: ['header_config', 'circle'],
  server: getDetail,
  autoSearch: true,
})
// 设置查询条件后刷新条件区域
const query_ref = ref()

function handleParamsRefresh() {
  query_ref.value && query_ref.value.getData()
}

// 重置参数
function resetQuery() {
  for (const key in query) {
    if (['page', 'limit'].includes(key)) {
      continue
    }

    if (Array.isArray(query[key])) {
      query[key] = []
    } else {
      query[key] = ''
    }
  }
}

// 高亮行
function rowClass(row) {
  return row._a_alarm === 1 ? 'highlight' : ''
}

function objectSpanMethod({
  row,
  column,
}) {
  if (column.columnKey !== 'WorkNode') {
    if (row.row_num) {
      return {
        rowspan: row.row_num,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }

  return {
    rowspan: 1,
    colspan: 1,
  }
}

defineExpose({
  handleSearch(params) {
    resetQuery()
    for (const key in params) {
      query[key] = params[key]
      search()
    }
  },
})
</script>

<template>
  <hl-list-page no-add no-search>
    <template #search>
      <get-params ref="query_ref" v-model="query.where" :info-group-id="info_group_id" @search="search" />
      <hl-form-item label="循环周期" label-width="fit">
        <hl-select v-model="query.circle_index" :options="table_data.circle" style="width: 177px" @change="search" />
      </hl-form-item>
    </template>

    <template #button>
      <hl-search-button @click="search" />
      <set-header :info-group-id="info_group_id" @refresh="getData" />
      <set-params @refresh="handleParamsRefresh" />
      <export-btn :query="query" />
    </template>

    <template #table>
      <el-table v-loading="loading" :data="table_data.data" :row-class="rowClass" :span-method="objectSpanMethod" border cell-class-name="special-table-cell" class="special-table" header-row-class-name="special-table-header-row" table-layout="auto">
        <el-table-column align="center" label="序号" prop="special_index" width="60" />
        <el-table-column v-for="item in table_data.header_config" :key="item.item" :column-key="item.node_type" :label="item.name" :prop="item.item" align="center">
          <template #default="{ row }">
            <hl-time v-if="item.type === 'time'" :time="row[item.item]" />
            <template v-if="item.type === 'FormUpload'">
              <hl-preview :files="row[item.item] || []" class="justify-center" height="50px" />
            </template>
            <template v-else-if="item.item === 'status'">
              <status-label :data="row[item.item] || []" />
            </template>
            <template v-else-if="item.item === 'FormStatus'">
              <form-status :data="row[item.item] || []" class="mx-auto" />
            </template>
            <template v-else>
              {{ row[item.item] }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </hl-list-page>
</template>

<style lang='scss' scoped>
.special-table {
  height: 100%;

  :deep(.el-table__body-wrapper) {
    height: 100%;

    .el-scrollbar__view {
      height: 100%;

      .el-table__body {
        height: 100%;
      }
    }
  }
}

:deep(table) {
  .el-button {
    padding: 0;
    height: fit-content;
  }

  .highlight {
    background-color: #fff3f3;
  }

  .special-table-header-row {
    background-color: #f5f5f5;

    th {
      background-color: #5692ff;

      .cell {
        white-space: nowrap;
        color: #fff;
      }
    }
  }
}
</style>
