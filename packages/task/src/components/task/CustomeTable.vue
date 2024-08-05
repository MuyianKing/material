<script setup>
import { HlTable, HlTableColumn } from '@hl/ui'
import { vLoading } from 'element-plus'
import TaskStatus from './Status.vue'
import AdditionalComp from './Additional.vue'
import TaskOpt from './options/Index.vue'
import 'element-plus/es/components/loading/style/css'
import '@hl/ui/src/components/table/Index.css'
import '@hl/ui/src/components/table-column/Index.css'

defineProps({
  tableData: {
    type: Object,
    default() {
      return {}
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['refresh', 'refresh-one'])

// 高亮行
function rowClass(row) {
  return row._a_alarm === 1 ? 'highlight' : ''
}
</script>

<template>
  <hl-table v-loading="loading" :data="tableData.data" :row-class="rowClass" row-key="task_id">
    <hl-table-column type="index" />
    <hl-table-column v-for="column in tableData.header_config" :key="column.prop" :label="column.label"
                     :prop="column.prop"
    >
      <template #default="{ row }">
        <task-status v-if="column.prop === 'status'" :data="row.status" />
        <additional-comp v-else-if="column.prop === 'additional_list'" :list="row.additional_list" />
        <span v-else v-html="row[column.prop]" />
      </template>
    </hl-table-column>
    <hl-table-column label="操作" min-width="100">
      <template #default="{ row }">
        <task-opt :task="row" @refresh-one="$emit('refresh-one', row)" @refresh="$emit('refresh')" />
      </template>
    </hl-table-column>
  </hl-table>
</template>

<style scoped lang="scss"></style>
