<script setup>
import { onMounted, ref } from 'vue'
import { ElTree } from 'element-plus'
import { getAvailableHeader } from '../../server/common.task.page'
import 'element-plus/es/components/tree/style/css'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
})

const tree_data = ref([])

function getData() {
  getAvailableHeader(props.configUuid).then((data) => {
    tree_data.value = []

    data.forEach((item) => {
      const children = {
        label: item.group,
        value: `__${item.group}`,
      }

      children.children = item.list_items.map((child) => {
        return {
          label: child.name,
          value: child.item,
        }
      })

      tree_data.value.push(children)
    })
  }).catch((e) => {
    hl.message.error(e, '获取可配置参数出错')
  })
}

const tree_ref = ref()

function getChecked() {
  return tree_ref.value.getCheckedKeys().filter(item => !item.startsWith('__'))
}

onMounted(() => {
  getData()
})

defineExpose({
  getChecked,
})
</script>

<template>
  <el-tree ref="tree_ref" default-expand-all :data="tree_data" show-checkbox node-key="value" />
</template>

<style lang='scss' scoped></style>
