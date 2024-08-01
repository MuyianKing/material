<script setup>
import { useList } from '@hl/jooks'
import { jump } from '@hl/utils/es/router'
import { HlFormItem, HlInput, HlTable, HlTableColumn } from '@hl/ui'

const {
  HlListPage,
  query,
  getData,
  table_data,
} = useList({
  query: {
    keyword: '',
  },
  server: null,
})

function handleEdit() {
  jump({
    path: '/form/editor/index',
    query: {
      id: '',
    },
    type: '_blank',
  })
}
</script>

<template>
  <hl-list-page @add="handleEdit">
    <template #search>
      <hl-form-item label="关键字">
        <hl-input v-model="query.keyword" @change="getData" />
      </hl-form-item>
    </template>

    <template #table>
      <hl-table :data="table_data.data">
        <hl-table-column type="index" />
        <hl-table-column prop="form_name" label="表单名称" />
      </hl-table>
    </template>
  </hl-list-page>
</template>

<style lang='scss' scoped></style>
