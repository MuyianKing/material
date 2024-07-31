<script setup>
import useListPage from '@hl/ui/src/list-page/index'
import { jump } from '@hl/utils/router'

const {
  HlListPage,
  query,
  getData,
  table_data,
} = useListPage({
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
