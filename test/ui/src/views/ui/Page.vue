<script setup>
import { HlPage } from '@hl/ui'
import { reactive } from 'vue'

const query = reactive({
  limit: 20,
  page: 1,
})

const table = reactive({
  count: 100,
})

function getData() {}
</script>

<template>
  <div>
    <div>
      <div>page：{{ query.page }}</div>
      <div>size：{{ query.limit }}</div>
      <div>count：{{ table.count }}</div>
    </div>
    <hl-page v-model="query.page" :size="query.limit" :count="table.count" @change="getData" />
    <hl-page v-model="query.page" v-model:size="query.limit" :count="table.count" sizes @change="getData" />
  </div>
</template>

<style lang='scss' scoped>
</style>
