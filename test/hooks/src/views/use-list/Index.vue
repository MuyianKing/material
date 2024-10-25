<script setup>
import { useList, usePageRequest, useRequest } from '@hl/hooks'
import { HlFormItem, HlInput, HlTable, HlTableColumn } from '@hl/ui'

async function server() {

}

usePageRequest(server)
useRequest(server)

const {
  HlListPage,
  query,
  getData,
  table_data,
} = useList({
  query: {
    keyword: '',
  },
  server() {
    return {
      count: 0,
      data: [],
    }
  },
})

function handleEdit() {
  console.log('handleEdit')
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
      </hl-table>
    </template>
  </hl-list-page>
</template>

<style lang='scss' scoped></style>
