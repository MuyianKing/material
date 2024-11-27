<script setup>
import { useList } from '@hl/hooks'
import HlTable from '@hl/ui/src/components/table'
import HlTableColumn from '@hl/ui/src/components/table-column'
import HlFormItem from '@hl/ui/src/components/form-item'
import HlInput from '@hl/ui/src/components/input'
import { HlEditButton } from '@hl/ui'
import { getList } from '@server/user'

const {
  HlListPage,
  query,
  table_data,
  updateOne,
} = useList({
  query: {
    keyword: '',
  },
  server: getList,
})

const edit_data = ref(null)
function handleEdit(row) {
  edit_data.value = row
}

function handleRefresh() {
  updateOne(edit_data)
}
</script>

<template>
  <hl-list-page>
    <template #search>
      <hl-form-item label="关键字">
        <hl-input v-model="query.keyword" />
      </hl-form-item>
    </template>

    <template #table>
      <hl-table :data="table_data.data">
        <hl-table-column type="index" />
        <hl-table-column label="姓名" prop="name" />
        <hl-table-column label="操作">
          <template #default="{ row }">
            <hl-edit-button @click="handleEdit(row)" />
          </template>
        </hl-table-column>
      </hl-table>
    </template>

    <edit-comp @refresh="handleRefresh" />
  </hl-list-page>
</template>

<style lang='scss' scoped></style>
