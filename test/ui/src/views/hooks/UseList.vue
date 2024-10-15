<script setup>
import { useList } from '@hl/hooks'
import HlTable from '@hl/ui/src/components/table'
import HlTableColumn from '@hl/ui/src/components/table-column'
import HlFormItem from '@hl/ui/src/components/form-item'
import HlInput from '@hl/ui/src/components/input'

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
      data: [],
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
      </hl-table>
    </template>
  </hl-list-page>
</template>

<style lang='scss' scoped>
</style>
