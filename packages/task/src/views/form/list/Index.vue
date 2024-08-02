<script setup>
import { useList } from '@hl/hooks'
import { jump } from '@hl/utils/es/router'
import { HlFormItem, HlInput, HlTable, HlTableColumn } from '@hl/ui'
import {useRouter} from "vue-router"
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'
import '@hl/ui/src/components/table/Index.css'
import '@hl/ui/src/components/table-column/Index.css'

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
  },useRouter())
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
