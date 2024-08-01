<script setup>
import { computed } from 'vue'
import { ElTable, ElTableColumn, ElTooltip } from 'element-plus/es'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  clickCell: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['cell-click'])
const rows = [
  {
    title: '处置人',
    key: 'handler',
    defaultShow: true,
  },
  {
    title: '协助人',
    key: 'helper',
  },
  {
    title: '抄送人',
    key: 'copyer',
  },
]
const tableData = computed(() => {
  const allRows = rows.map((row) => {
    const obj = {
      defaultShow: row.defaultShow || false,
    }
    props.data.forEach((item) => {
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

  const returnList = allRows.filter(item => Object.keys(item).length > 2)
  return returnList.length > 0 ? returnList : allRows.filter(item => item.defaultShow)
})

const tableColumns = computed(() => {
  return [{ label: '', key: 'title', fixed: 'left' }].concat(...props.data.map(item => ({ label: item.title, key: item.id, deploy: item.deploy })))
})

function handleClickCell({ row, column, deploy }) {
  if (deploy === 0) {
    return
  }

  if (props.clickCell && column.no > 0) {
    emits('cell-click', {
      process_id: column.property,
      label: column.label,
      person: row[column.property] || [],
    })
  }
}
</script>

<template>
  <el-table :data="tableData" border class="flow-list-table" scrollbar-always-on style="width:40vw" table-layout="auto">
    <el-table-column v-for="item in tableColumns" :key="item.key" :fixed="item.fixed" :label="item.label" :prop="item.key" :width="item.key === 'title' ? 60 : ''" align="center" :show-overflow-tooltip="{ content: '', disabled: true }">
      <template #header>
        {{ item.label }}
      </template>
      <template #default="{ row, column, $index }">
        <span :class="{ 'cursor-pointer': clickCell }" @click="handleClickCell({ row, column, index: $index, deploy: item.deploy })">
          <template v-if="item.key === 'title'">
            {{ row.title }}
          </template>
          <template v-else-if="row[item.key] && Array.isArray(row[item.key])">
            <el-tooltip effect="dark" :content="row[item.key].map(item => item.name_and_org).join('、')" placement="top">
              {{ row[item.key].map(item => item.name).join('、') }}
            </el-tooltip>
          </template>
          <template v-else>
            ---
          </template>
        </span>
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
      background-color: #ededed !important;
    }
  }
}
</style>
