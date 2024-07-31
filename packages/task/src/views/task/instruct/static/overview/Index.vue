<script setup name="InstructIndex">
import useListPage from '@hl/ui/src/list-page/index'
import { getJzzlTaskCount } from '../../../../../server/instruct'
import { taskTypes } from '../../../../../default/task'
import TypeSelect from '../../task/components/TypeSelect.vue'
import DetailList from './components/DetailList.vue'

const {
  HlListPage,
  query,
  table_data,
  search,
} = useListPage({
  query: {
    type: '',
    config_uuid: useRoute().meta?.params?.config_uuids || '',
    create_end_time: '',
    create_start_time: dayjs().subtract(7, 'd').format('YYYY-MM-DD 00:00:00'),
  },
  data_extend_keys: ['header'],
  server: getJzzlTaskCount,
})

const params = ref({})
const show = ref(false)

function handleDetail(row, item) {
  if (row[item.key] <= 0) {
    return
  }

  show.value = true
  params.value = {
    create_end_time: query.create_end_time,
    create_start_time: query.create_start_time,
    organization_id: row.organization_id,
    query_type: item.label_type,
    organization_name: row.organization,
    key: item.label,
  }
}
</script>

<template>
  <hl-list-page label-width="auto" no-add no-search>
    <template #search>
      <hl-form-item label="时间">
        <hl-date v-model:end="query.create_end_time" v-model:start="query.create_start_time" date-type="datetime" type="range" @change="search" />
      </hl-form-item>
      <hl-form-item label="指令类别">
        <hl-select v-model="query.list_type" :options="taskTypes" all style="width: 120px;" :clearable="false" @change="search" />
      </hl-form-item>

      <hl-form-item label="任务类型" class="w-[200px]">
        <type-select v-model="query.type" :type-list="query.list_type" />
      </hl-form-item>

      <hl-search-button @click="search" />
      <hl-export-button icon />
    </template>
    <template #table>
      <hl-table :data="table_data.data">
        <hl-table-column v-for="item in table_data.header?.filter(e => e)" :key="item" :label="item.key === 'organization' ? '单位' : item.label" :prop="item.key">
          <template #default="{ row }">
            <span :class="{ active: row[item.key] > 0 || item.key === 'organization' }" @click="handleDetail(row, item)" v-html="row[item.key]" />
          </template>
        </hl-table-column>
      </hl-table>

      <hl-page v-model:page="query.pageNum" :count="table_data.count" :pager-count="5" :size="query.pageSize" />
    </template>

    <detail-list v-model="show" :params="params" @refresh="search" />
  </hl-list-page>
</template>

<style lang="scss" scoped>
.active {
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
}
</style>
