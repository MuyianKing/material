<script setup>
import useListPage from '@hl/ui/src/list-page'
import { getJzzlList } from '../../../../../../server/instruct'
import TaskOpt from '../../../../../../components/task/options/Index.vue'

const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['refresh'])

const {
  HlListPage,
  query,
  table_data,
  search,
  loading,
} = useListPage({
  query: {
    type: 100,
  },
  data_extend_keys: ['header'],
  server: getJzzlList,
  autoSearch: false,
})

watch(() => props.params, () => {
  Object.assign(query, props.params)
  search()
})

// 刷新外围列表
function refresh() {
  emits('refresh')
  search()
}

const title = computed(() => {
  return props.params.key ? `${props.params.organization_name}（${props.params.key}）` : props.params.organization_name
})
</script>

<template>
  <hl-dialog v-if="$attrs.modelValue" :title top="60px" width="70%">
    <hl-list-page no-add style="padding: 0!important;">
      <template #search>
        <hl-form-item label="时间">
          <hl-date v-model:end="query.create_end_time" v-model:start="query.create_start_time" date-type="datetime" type="range" @change="search" />
        </hl-form-item>
      </template>

      <template #table>
        <hl-table v-if="$attrs.modelValue" v-loading="loading" :data="table_data.data" class="table-height">
          <hl-table-column type="index" />
          <hl-table-column v-for="item in table_data.header" :key="item" :label="item">
            <template #default="{ row }">
              <template v-if="item === '任务状态'">
                <div v-for="state in row[item]" :key="state.color" :style="{ color: state.color }">
                  {{ state.html }}
                </div>
              </template>
              <template v-else>
                {{ row[item] }}
              </template>
            </template>
          </hl-table-column>
          <hl-table-column label="操作">
            <template #default="{ row }">
              <task-opt :task="row" @refresh-one="refresh" @refresh="refresh" />
            </template>
          </hl-table-column>
        </hl-table>
      </template>
    </hl-list-page>
  </hl-dialog>
</template>

<style scoped lang="scss">
.table-height {
  height: calc(100vh - 350px);
}
</style>
