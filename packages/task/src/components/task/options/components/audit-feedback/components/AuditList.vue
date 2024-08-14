<script setup>
import { reactive, ref, useAttrs, watch } from 'vue'
import { HlDialog, HlSearchPage, HlTable, HlTableColumn } from '@hl/ui'
import { vLoading } from 'element-plus'
import { taskAuditFeedbackList } from '../../../../../../server/task'
import Detail from './Detail.vue'
import Audit from './Audit.vue'
import 'element-plus/es/components/loading/style/css'

import '@hl/ui/src/components/dialog/Index.css'
import '@hl/ui/src/components/search-page/Index.css'
import '@hl/ui/src/components/table/Index.css'
import '@hl/ui/src/components/table-column/Index.css'

const props = defineProps({
  taskId: {
    type: [String, Number],
    default: '',
  },
})
const emits = defineEmits('refresh')

const tableData = reactive({})
const loading = ref(false)
async function getData() {
  try {
    loading.value = true
    const res = await taskAuditFeedbackList({ task_id: props.taskId })
    tableData.data = res.data.data
    tableData.header = res.data.header
  } catch (e) {
    hl.message.error(e, '获取失败')
  } finally {
    loading.value = false
  }
}

const attrs = useAttrs()
watch(() => attrs.modelValue, (value) => {
  if (value) {
    getData()
  }
})

function refresh() {
  getData()
  emits('refresh')
}
</script>

<template>
  <hl-dialog width="900px" title="审批反馈" top="50px">
    <hl-search-page id="audit-feedback" no-add no-search>
      <template #table>
        <hl-table v-loading="loading" :data="tableData.data" row-key="id">
          <hl-table-column v-for="item in tableData.header" :key="item.item" :label="item.name" :prop="item.item" />
          <hl-table-column label="操作" width="150px">
            <template #default="{ row }">
              <div class="flex items-center justify-around">
                <detail :data="row" :task-id="taskId" />
                <audit :data="row" @refresh="refresh" />
              </div>
            </template>
          </hl-table-column>
        </hl-table>
      </template>
    </hl-search-page>
  </hl-dialog>
</template>

<style scoped lang="scss"></style>
