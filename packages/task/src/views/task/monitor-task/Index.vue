<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { HlDate, HlFormItem, HlInput, HlSearchButton, HlTable, HlTableColumn, HlTime } from '@hl/ui'
import { ElLink, ElTooltip } from 'element-plus'

import { useList } from '@hl/jooks'
import { jump } from '@hl/utils/es/router'
import { getList, setTop } from '../../../server/infoGroup'

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
  server: getList,
})

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

function handleClickDetail(row) {
  const url = `/monitor-task/detail/${row.info_group_id}`
  jump({
    path: url,
  })
}

async function handleSetTop(row) {
  hl.message.loading('正在设置置顶...')
  const info = row.is_top === 1 ? '取消置顶' : '置顶'
  try {
    await setTop({ info_group_id: row.info_group_id, is_top: row.is_top === 1 ? 2 : 1 })
    row.is_top = row.is_top === 1 ? 2 : 1
    hl.message.success(`${info}成功`)
  } catch (e) {
    hl.message.error(e, `${info}失败`)
  } finally {
    hl.message.closeLoading()
  }
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
      search()
    }
  },
})
</script>

<template>
  <hl-list-page id="test" label-width="auto" no-add no-search>
    <template #search>
      <hl-form-item label="关键词">
        <hl-input v-model="query.query" placeholder="请输入标题等查询" style="width:180px" />
      </hl-form-item>
      <hl-form-item label="创建时间">
        <hl-date v-model:end="query.create_endtime" v-model:start="query.create_starttime" date-type="datetime"
          placeholder="请选择日期" type="range" />
      </hl-form-item>
    </template>

    <template #button>
      <hl-search-button @click="search" />
    </template>

    <template #table>
      <hl-table v-loading="loading" :data="table_data.data" :row-class="rowClass">
        <hl-table-column type="index" />
        <hl-table-column label="任务组名称" prop="info_group_title" />
        <hl-table-column label="创建时间" prop="time">
          <template #default="{ row }">
            <hl-time :time="row.time" />
          </template>
        </hl-table-column>
        <hl-table-column label="总数" prop="total" />
        <hl-table-column label="完成数" prop="finish" />
        <hl-table-column label="单位详情" prop="org">
          <template #default="{ row }">
            <div>
              <template v-for="(item,index) in row.a_organization" :key="index">
                <el-tooltip :content="`${item.name}: ${item.statusName}`" effect="light" placement="top">
                  <span :style="`color: ${item.statusColor}`" class="whitespace-nowrap">{{ item.name }}</span>
                </el-tooltip>
                <span v-if="index < row.a_organization.length - 1">、</span>
              </template>
            </div>
          </template>
        </hl-table-column>
        <hl-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-link :underline="false" type="primary" @click="handleClickDetail(row)">
              查看
            </el-link>
            <el-link :type="row.is_top === 1 ? 'warning' : 'success'" :underline="false" class="ml-2"
              @click="handleSetTop(row)">
              {{ row.is_top === 1 ? '取消置顶' : '置顶' }}
            </el-link>
          </template>
        </hl-table-column>
      </hl-table>
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
