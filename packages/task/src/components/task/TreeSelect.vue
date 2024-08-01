<script setup>
import { onMounted, ref } from 'vue'
import { ElTreeSelect } from 'element-plus'
import { getConfigTree } from '../../server/benches'

import 'element-plus/es/components/tree-select/style/css'

const emits = defineEmits(['change'])

const transformKeys = [
  { label: 'group_name', value: 'group_id', children: 'config_list' },
  { label: 'config_name', value: 'config_uuid', children: 'config_list' },
]

const treeData = ref([])
async function getData() {
  try {
    const { data } = await getConfigTree()
    treeData.value = transformData(data, transformKeys[0])
  } catch (e) {
    hl.message.error(e, '获取任务模板树失败')
  }
}

let index = 0
function transformData(data, transform_key) {
  if (Array.isArray(data)) {
    if (transformKeys[index + 1]) {
      index++
    }
    data.forEach((item) => {
      item.label = item[transform_key?.label || 'label']
      item.value = item[transform_key?.value || 'value']
      if (item[transform_key?.children || 'children'] && item[transform_key?.children || 'children'].length > 0) {
        item.children = transformData(item[transform_key?.children || 'children'], transformKeys[index])
      }
    })
  }

  return data
}

function handleChange(ids) {
  const data = []
  if (ids) {
    for (const id of ids) {
      data.push(getValue(treeData.value, id))
    }
  }
  emits('change', data)
}

function getValue(data, id) {
  for (const item of data) {
    if (id === item.value) {
      return item
    } else if (item.children && item.children.length > 0) {
      const val = getValue(item.children, id)
      if (val) {
        return val
      }
    }
  }
}

onMounted(() => {
  getData()
  index = 0
})
</script>

<template>
  <el-tree-select :data="treeData" style="width: 170px" @change="handleChange" />
</template>

<style scoped lang="scss"></style>
