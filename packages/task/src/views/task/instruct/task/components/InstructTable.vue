<script setup>
import TaskStatus from '../../../../../components/task/Status.vue'
import TaskOpt from '../../../../../components/task/options/Index.vue'

defineProps({
  header: {
    type: Array,
    default: () => ([]),
  },
  data: {
    type: Array,
    default: () => ([]),
  },
})
const emits = defineEmits(['refresh', 'refresh-one'])

function rowClass(row) {
  return row._a_alarm === 1 ? 'highlight' : ''
}

function refreshOne(row) {
  emits('refresh-one', row)
}

function refresh(row) {
  emits('refresh', row)
}

onUnmounted(() => {
  console.log('instructTable - onUnmounted')
})
</script>

<template>
  <hl-table :data="data" :row-class="rowClass" row-key="task_id">
    <hl-table-column label="序号" prop="index" />
    <hl-table-column v-for="(item, index) in header.filter(e => e)" :key="index" :label="item" :prop="item">
      <template #default="{ row }">
        <task-status v-if="item === '任务状态'" :data="row['任务状态']" />
        <span v-else v-html="row[item]" />
      </template>
    </hl-table-column>
    <hl-table-column label="操作">
      <template #default="{ row }">
        <task-opt :task="row" @refresh-one="refreshOne(row)" @refresh="refresh(row)" />
      </template>
    </hl-table-column>
  </hl-table>
</template>

<style lang="scss" scoped>
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
