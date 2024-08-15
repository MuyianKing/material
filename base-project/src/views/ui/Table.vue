<script setup>
import { ref } from 'vue'
import HlTable from '@hl/ui/src/components/table/Index.vue'
import HlTableColumn from '@hl/ui/src/components/table-column/Index.vue'
import '@hl/ui/theme-chalk/table.scss'

const data = ref([{
  name: 'muyian',
  age: 18,
}])
</script>

<template>
  <div>
    <hl-table :data select border>
      <hl-table-column label="姓名" prop="name" />
      <hl-table-column label="年龄" prop="age" />
    </hl-table>
  </div>
</template>

<style lang='scss' scoped>
</style>
