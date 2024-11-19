<script setup>
import { useList } from '@hl/hooks'
import HlTable from '@hl/ui/src/components/table'
import HlTableColumn from '@hl/ui/src/components/table-column'
import HlFormItem from '@hl/ui/src/components/form-item'
import HlInput from '@hl/ui/src/components/input'
import { HlEditButton } from '@hl/ui'

const {
  HlListPage,
  query,
  table_data,
  updateOne,
} = useList({
  query: {
    keyword: '',
  },
  server: async (params) => {
    if (params.id) {
      return {
        id: params.id,
        name: 'update muyianking',
      }
    }

    const data = []

    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        name: `muyian${i + 1}`,
      })
    }

    return {
      data,
      count: 100,
    }
  },
})
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
            <hl-edit-button @click="updateOne(row)" />
          </template>
        </hl-table-column>
      </hl-table>
    </template>
  </hl-list-page>
</template>

<style lang='scss' scoped></style>
