<script setup>
import { useList } from '@hl/hooks'

const {
  HlListPage,
  query,
  table_data,
} = useList({
  query: {
    keyword: '',
  },
  server() {
    console.log('server')
    return {
      count: 100,
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
        <hl-input v-model="query.keyword" />
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
