<script  setup name="InstructIndex">
import useListPage from '@hl/ui/src/list-page/index'
import { getJzzlScore } from '../../../../../server/instruct'
import RecordScore from './Record.vue'
import Deduct from './Deduct.vue'

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
  server: getJzzlScore,
})

const clickOrganization = ref('')
const showScoreRecord = ref(false)
const orgName = ref('')

function handleClick(row) {
  orgName.value = row.org_info?.organization_name
  clickOrganization.value = row.org_info?.organization_id
  showScoreRecord.value = true
}
</script>

<template>
  <hl-list-page label-width="auto" no-add>
    <template #search>
      <hl-form-item label="时间">
        <hl-date v-model:end="query.create_end_time" v-model:start="query.create_start_time" date-type="datetime" type="range" @change="search" />
      </hl-form-item>
    </template>
    <template #table>
      <hl-table :data="table_data.data">
        <hl-table-column type="index" />
        <hl-table-column label="单位" prop="organization" />
        <hl-table-column prop="score">
          <template #header>
            扣分
            <deduct />
          </template>
          <template #default="{ row }">
            <el-link underline type="primary" style="text-decoration: underline" @click="handleClick(row)">
              {{ row.score }}
            </el-link>
          </template>
        </hl-table-column>
      </hl-table>
    </template>

    <record-score v-model="showScoreRecord" :org="clickOrganization" :query-params="query" :title="orgName" />
  </hl-list-page>
</template>

<style lang="scss" scoped></style>
