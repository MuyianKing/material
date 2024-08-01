<script setup>
import { ref } from 'vue'
import { useList } from '@hl/hooks'
import { getList } from '../../../../server/common.task.page'
import CustomTable from '../../../../components/task/CustomeTable.vue'
import SearchConfig from './search-config/Index.vue'
import OptConfig from './opt-config/Index.vue'

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
  configUuid: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['refresh'])

const {
  HlListPage,
  query,
  table_data,
  search,
  loading,
  getData,
} = useList({
  query: {
    config_uuid: props.configUuid,
    ...props.params,
  },
  data_extend_keys: ['header_config'],
  server: getList,
})

const search_ref = ref()
function refreshParams() {
  search_ref.value?.getData()
}

function refresh() {
  getData()
  emits('refresh')
}
</script>

<template>
  <hl-list-page no-add>
    <template #search>
      <search-config ref="search_ref" v-model="query" :config-uuid @change="search" />
    </template>
    <template #button>
      <opt-config :config-uuid @params-refresh="refreshParams" @refresh-one="refresh" />
    </template>
    <template #table>
      <custom-table :loading :table-data="table_data" @refresh-one="refresh" @refresh="refresh" />
    </template>
  </hl-list-page>
</template>

<style scoped lang="scss">

</style>
