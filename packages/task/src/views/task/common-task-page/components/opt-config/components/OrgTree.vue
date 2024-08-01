<script setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus/es'

const props = defineProps({
  allData: {
    type: Array,
    default: () => ([]),
  },
})
// 选中的节点数组
const selected = defineModel()

const defaultProps = {
  children: 'sub_organization',
  label: 'organization_name',
  value: 'organization_id',
}

const tree_data = ref([])

watch(() => props.allData, (val) => {
  tree_data.value = val
})

// 选中节点
function handleCheck(_, node) {
  selected.value = node.checkedKeys
}

// 全选/反选
function allSelected(isAll) {
  selected.value = recursionGetData(tree_data.value, isAll)
}

const treeRef = ref(null)

// 递归设置是否选中
function recursionGetData(data, isAll) {
  const newData = []

  function _recursion(data, isAll) {
    data.forEach((item) => {
      if (item.sub_organization) {
        _recursion(item.sub_organization, isAll)
      } else {
        if (isAll) {
          newData.push(item.organization_id)
        }
        treeRef.value.setChecked(item, isAll)
      }
    })
  }

  _recursion(data, isAll)
  return newData
}

defineExpose({
  allSelected,
})
</script>

<template>
  <div>
    <el-tree ref="treeRef"
             show-checkbox :data="tree_data"
             :default-checked-keys="selected"
             :props="defaultProps"
             check-strictly
             class="tree-body"
             empty-text="未获取到组织机构"
             node-key="organization_id"
             render-after-expand
             @check="handleCheck"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tree) {
  user-select: none;

  .el-tree-node.is-current {
    & > .el-tree-node__content {
      background-color: var(--color-primary) !important;
      color: white;
    }
  }

  .el-tree-node__content:hover {
    background-color: transparent;
  }

  .el-tree-node .el-tree-node__content:hover {
    background-color: var(--el-color-primary-light-5);
    color: white;
  }
}
</style>
