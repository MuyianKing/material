<script setup>
import { onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { HlTable, HlTableColumn } from '@hl/ui'
import WrapperComp from '../../components/Wrapper.vue'
import { cancelTask, getTaskSubscriptionList } from '../../../../../server/benches'
import { getQuery } from '../../../../../hooks/task'
import TaskSubscription from './components/TaskSubscription.vue'
import CancelAttention from './components/cancelAttention.vue'

const emits = defineEmits(['search'])
const taskData = ref([])
async function getData() {
  try {
    const { data } = await getTaskSubscriptionList()
    taskData.value = data.map((item, index) => ({
      ...item,
      index: index + 1,
      finishing_rate: item.total ? `${((item.total - item.unfinish) / item.total * 100).toFixed(2) || 0}%` : 0,
    }))
  } catch (error) {
    hl.message.error(error, '获取关注任务列表错误')
  }
}

const search = useDebounceFn(() => {
  getData()
}, 150)

async function handleCancel(row) {
  try {
    await cancelTask({ uuid: row.uuid })
    search()
  } catch (error) {
    hl.message.error(error, '取消关注失败')
  }
}

// 点击高亮
const light_line = ref(-1)
function handleClick(row) {
  emits('search', getQuery({
    config_uuids: row.config_uuids,
  }, light_line.value === -1))
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="attention-list">
    <wrapper-comp title="关注任务" class="h-full">
      <template #right>
        <task-subscription :task-data="taskData" @refresh="search" />
      </template>
      <hl-table v-model:light-line="light_line" :data="taskData" hight-light hover="pointer" @row-click="handleClick">
        <hl-table-column label="序号" prop="index" />
        <hl-table-column label="任务名称" prop="title" />
        <hl-table-column label="完成率" prop="finishing_rate" />
        <hl-table-column label="完成数/总数">
          <template #default="{ row }">
            {{ row.total - row.unfinish }} / {{ row.total }}
          </template>
        </hl-table-column>
        <hl-table-column label="操作">
          <template #default="{ row }">
            <cancel-attention @click="handleCancel(row)" />
          </template>
        </hl-table-column>
      </hl-table>
    </wrapper-comp>
  </div>
</template>

<style lang='scss' scoped>
.attention-list {
  height: 100%;

  :deep(.active) {
    background-color: var(--el-color-primary-light-8);
  }
}
</style>
