<script setup>
import { HlTable, HlTableColumn } from '@hl/ui'

defineProps({
  data: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div>
    <template v-if="data">
      <div class="title">
        {{ data.title }}
      </div>
      <div class="list">
        <div v-for="(item, index) in data.list" :key="index" class="item">
          <el-popover v-if="item.content.length > 0" :width="400" :placement="index === 0 ? 'top' : 'right'" trigger="click">
            <template #reference>
              <div>{{ item.name }}</div>
            </template>

            <hl-table :data="item.content">
              <hl-table-column prop="key" label="姓名" />
              <hl-table-column prop="value" label="事项" />
            </hl-table>
          </el-popover>
          <div v-else>
            {{ item.name }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped></style>
