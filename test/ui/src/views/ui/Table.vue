<script setup>
import HlTable from '@hl/ui/src/components/table'
import HlTableColumn from '@hl/ui/src/components/table-column'

const data = []

for (let i = 0; i < 100; i++) {
  data.push({
    name: `muyian${i}`,
    age: 18 + i,
  })
}
</script>

<template>
  <div class="bg-white p-4 h-full pt-24">
    <hl-table :data="data" scrollbar-always-on>
      <hl-table-column type="index" />
      <hl-table-column label="姓名" prop="name">
        <span class="line-clamp-1">
          姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名
        </span>
      </hl-table-column>
      <hl-table-column label="年龄" prop="age" />
    </hl-table>
  </div>
</template>

<style lang='scss' scoped></style>
