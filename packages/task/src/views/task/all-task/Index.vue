<script setup>
import { useList } from '@hl/jooks'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { HlSearchButton } from '@hl/ui'
import { getTaskList, getTaskOne } from '../../../server'
import { refreshTableRow } from '../../../utils'
import CustomTable from '../../../components/task/CustomeTable.vue'
import MonitorComp from './components/query/components/MonitorComp.vue'
import ParamsConfig from './components/ParamsConfig.vue'
import HeaderConfig from './components/HeaderConfig.vue'
import QueryComp from './components/query/Index.vue'
import '@hl/ui/src/components/search-button/Index.css'

const props = defineProps({
  autoSearch: {
    type: Boolean,
    default: true,
  },
})

const {
  HlListPage,
  query,
  getData,
  table_data,
  search,
  loading,
} = useList({
  query: {
    query: '',
    status: '',
    create_time: '',
  },
  data_extend_keys: ['header_config'],
  server: getTaskList,
  autoSearch: props.autoSearch,
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

// 刷新一行
function refreshOne(row) {
  refreshTableRow(row, () => getTaskOne(row.task_id))
}

const route = useRoute()
onMounted(() => {
  if (route.path === '/task/task/all') {
    getData()
  }
})

defineExpose({
  handleSearch(params) {
    resetQuery()
    for (const key in params) {
      query[key] = params[key]
    }
    search()
  },
})
</script>

<template>
  <hl-list-page id="test" no-add no-search>
    <template #search>
      <query-comp ref="query_ref" v-model="query" @search="search" />
      <monitor-comp v-model="query.contain_jkry" @search="search" />
    </template>

    <template #button>
      <hl-search-button @click="search" />
      <params-config @refresh="handleParamsRefresh" />
      <header-config @refresh="getData" />
    </template>

    <template #table>
      <custom-table :loading :table-data="table_data" @refresh-one="refreshOne" @refresh="getData" />
    </template>
  </hl-list-page>
</template>

<style lang='scss' scoped>
:deep(table) {
  .el-button {
    padding: 0;
    height: fit-content;
  }

  .highlight {
    background-color: #fff3f3;
  }
}
</style>
