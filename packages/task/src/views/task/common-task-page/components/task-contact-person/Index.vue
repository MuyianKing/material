<script setup>
import { reactive, ref } from 'vue'
import { HlDialog, HlEditButton, HlFormItem, HlInput, HlPage, HlSearchButton, HlTable, HlTableColumn } from '@hl/ui'

import { refreshTableRow } from '../../../../../utils'
import { getLinkPerson, getLinkPersonOne } from '../../../../../server/common.task.page'
import ContactEdit from './components/Edit.vue'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: '人员',
  },
})

const query = reactive({
  query: '',
  limit: 20,
  page: 1,
  config_uuid: props.configUuid,
})
const data = ref({})
const loading = ref(false)

async function getData() {
  loading.value = true
  try {
    const res = await getLinkPerson(query)
    data.value = {
      data: res.data,
      count: res.count,
    }
  } catch (e) {
    hl.message.error(e, '获取失败')
  } finally {
    loading.value = false
  }
}

// 联络人列表状态
const show = ref(false)

// 设置单位联络人信息
const edit = reactive({
  show: false,
  data: [],
})

function handleEdit(row) {
  edit.show = true
  edit.data = row
}

function handleOpen() {
  show.value = true
  getData()
}

function refreshOne(row) {
  refreshTableRow(row, () => getLinkPersonOne({
    config_uuid: props.configUuid,
    organization_id: row.organization_id,
  }))
}
</script>

<template>
  <el-button type="success" @click="handleOpen">
    {{ text }}管理
  </el-button>

  <hl-dialog v-model="show" :title="`${text}管理`" top="50px" width="60%">
    <div class="flex-column table-body-wrapper">
      <div class="flex mb-2">
        <hl-form-item label="单位" class="mr-2">
          <hl-input v-model="query.query" clearable @input="getData" />
        </hl-form-item>
        <hl-search-button @click="getData" />
      </div>

      <hl-table :loading="loading" :data="data.data" class="flex-1-0">
        <hl-table-column label="单位" prop="organization_name" />
        <hl-table-column :label="text">
          <template #default="{ row }">
            <el-tag v-for="item in row.idcards" :key="item.id_card" type="primary" class="m-2">
              {{ item.name }}
            </el-tag>
          </template>
        </hl-table-column>
        <hl-table-column label="操作">
          <template #default="{ row }">
            <hl-edit-button @click="handleEdit(row)" />
          </template>
        </hl-table-column>
      </hl-table>

      <!-- 分页 -->
      <hl-page v-model="query.page" :size="query.limit" :count="data.count" @change="getData" />
    </div>

    <!-- 设置联络人 -->
    <contact-edit v-model="edit.show" :data="edit.data" :config-uuid @refresh="refreshOne(edit.data)" />
  </hl-dialog>
</template>

<style scoped lang="scss">
.table-body-wrapper {
  height: calc(100vh - 200px);
}
</style>
