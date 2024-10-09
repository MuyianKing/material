<script setup>
import HlTable from '@hl/ui/src/components/table'
import HlTableColumn from '@hl/ui/src/components/table-column'

const data = []

for (let i = 0; i < 10; i++) {
  data.push({
    name: `muyian${i}`,
    age: 18 + i,
  })
}

console.log(data)
</script>

<template>
  <div class="bg-white p-4 h-full pt-24">
    <hl-table :data="data">
      <hl-table-column label="姓名" prop="name">
        <span class="line-clamp-1">
          姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名
        </span>
      </hl-table-column>
      <hl-table-column label="年龄" prop="age" />
    </hl-table>
  </div>
</template>

<style lang='scss' scoped>
</style>
