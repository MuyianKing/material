<script setup>
import { getParams } from '../../../../../server/infoGroup'

const props = defineProps({
  infoGroupId: {
    type: [Number, String],
    required: true,
  },
})

const tree_data = ref([])

function getData() {
  getParams(props.infoGroupId).then((data) => {
    tree_data.value = []
    data = data.data || []
    const obj = {}
    data.forEach((item) => {
      if (!obj[item.group_name]) {
        obj[item.group_name] = {
          group: item.group_name,
          list_items: [item],
        }
      } else {
        obj[item.group_name].list_items.push(item)
      }
    })
    for (const key in obj) {
      const item = obj[key]
      const children = {
        label: item.group,
        value: `__${item.group}`,
      }

      children.children = item.list_items.map((child) => {
        return {
          ...child,
          label: child.name,
          value: child.item,
        }
      })

      tree_data.value.push(children)
    }
  }).catch((e) => {
    hl.message.error(e, '获取可配置参数出错')
  })
}

const tree_ref = ref()

function getChecked() {
  const checkedNodes = tree_ref.value.getCheckedNodes()
  return checkedNodes.filter(item => !item.value.startsWith('__')).map(node => ({ ...node, label: undefined, value: undefined }))
}

onMounted(() => {
  getData()
})

defineExpose({
  getChecked,
})
</script>

<template>
  <el-tree ref="tree_ref" :data="tree_data" default-expand-all node-key="value" show-checkbox />
</template>

<style lang='scss' scoped></style>
