<script name="FormStatus" setup>
import { ElTable, ElTableColumn, ElTag } from 'element-plus/es'
import { computed, defineProps } from 'vue'

const { data } = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
const rows = [
  {
    title: '处置人',
    key: 'handler',
  },
]
const tableData = computed(() => {
  const allRows = rows.map((row) => {
    const obj = {}
    data.forEach((item) => {
      if (item[row.key] && Array.isArray(item[row.key]) && item[row.key].length > 0) {
        const person = item[row.key]
        person.forEach((p) => {
          let org = p.organization || []
          org = org[0] || {}
          p.name_and_org = `${p.name}(${org.organization_name})`
        })
        obj[item.id] = item[row.key]
      }
      obj.title = row.title
    })
    return obj
  })

  return allRows.filter(item => Object.keys(item).length > 1)
})

const tableColumns = computed(() => {
  return data.map(item => ({ label: item.title, key: item.id, finish: item.finish, pass: item.pass }))
})

// 更改表头样式
function headerCellStyle() {
  return {
    'background-color': 'rgba(50, 107, 250, 0.5) !important',
  }
}
</script>

<template>
  <el-table :data="tableData" border class="flow-list-table" scrollbar-always-on style="width:40vw" table-layout="auto" :header-cell-style="headerCellStyle()">
    <el-table-column v-for="item in tableColumns" :key="item.key" :fixed="item.fixed" :label="item.label" :prop="item.key"
                     :width="item.key === 'title' ? 60 : ''"
                     align="center" show-overflow-tooltip
    >
      <template #header>
        {{ item.label }}
        <el-tag v-if="typeof item.pass !== 'undefined'" :type="item.pass ? 'success' : 'warning'" size="small">
          {{ item.pass ? '通过' : '驳回' }}
        </el-tag>
        <el-tag v-else-if="typeof item.finish !== 'undefined'" :type="item.finish ? 'success' : 'warning'" size="small">
          {{ item.finish ? '已' : '未' }}{{ item.label }}
        </el-tag>
      </template>
      <template #default="{ row }">
        <template v-if="item.key === 'title'">
          {{ row.title }}
        </template>
        <template v-else-if="row[item.key] && Array.isArray(row[item.key])">
          {{ row[item.key].map(item => item.name_and_org).join('、') }}
        </template>
        <template v-else>
          ---
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
.flow-list-table {
  :deep(.el-table__inner-wrapper) {
    th,
    td,
    td .cell {
      padding: 1px 0;
    }

    th {
      background-color: #e8e8e8 !important;
      color: #777;
    }
  }
}
</style>
