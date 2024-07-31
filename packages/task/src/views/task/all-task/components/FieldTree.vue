<script setup>
import { getParams } from '../../../../server'

const tree_data = ref([])
function getData() {
  getParams().then((data) => {
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
