<script setup>
import { getList } from '../../../server/organization'
import { useDebounceFn } from "@vueuse/core"

const emits = defineEmits(['change'])

const _defaultProps = {
  children: 'sub_organization',
  label: 'organization_name',
}

const query = reactive({
  query: '',
})

const tree_data = ref([])
const loading = ref(false)
const default_expanded_keys = ref([])

function getData() {
  loading.value = true
  getList(query).then((data) => {
    default_expanded_keys.value = []
    if (data.data && data.data.length > 0) {
      default_expanded_keys.value.push(data.data[0].organization_id)
    }

    tree_data.value = data.data
  }).catch((e) => {
    hl.message.error(e, '获取职务出错')
  }).finally(() => {
    loading.value = false
  })
}

const search = useDebounceFn(() => {
  getData()
}, hl.common.SEARCH_INTERVAL)

const extend = ref(false)
const treeRef = ref()

function handleExtend() {
  extend.value = !extend.value
  loading.value = true

  nextTick(() => {
    setTimeout(() => {
      const nodes = treeRef.value.store.nodesMap
      for (const node in nodes) {
        if (nodes[node].childNodes?.length > 0 && nodes[node].parent.id === 1) {
          nodes[node].expanded = extend.value
        }
      }

      setTimeout(() => {
        loading.value = false
      }, 0)
    }, 100)
  })
}

let last_node = null

function handleClick(e, node) {
  if (last_node && last_node.data.organization_id !== e.organization_id) {
    last_node.data.selected = false
    last_node.isCurrent = false
  }

  last_node = node

  e.selected = !e.selected
  node.isCurrent = e.selected
  emits('change', e.selected ? e.organization_id : '')
}

// 切换选中节点
function switchNode(code = '320402000000') {
  const node = treeRef.value.store.nodesMap[code]
  if (node) {
    node.data.selected = false
    handleClick(node.data, node)
  }
}

onMounted(() => {
  getData()
})

defineExpose({
  switchNode,
})
</script>

<template>
  <div class="job-tree">
    <div class="flex">
      <hl-input v-model="query.query" class="mb-2" placeholder="请输入部门名称搜索" @input="search" />
      <el-button class="ml-2" type="success" @click="handleExtend">
        <hl-icon v-if="!extend" icon="icon-park-outline:expand-down-one" />
        <hl-icon v-else icon="icon-park-outline:fold-up-one" />
        <span class="ml-1">全部{{ !extend ? '展开' : '收起' }}</span>
      </el-button>
    </div>

    <el-tree ref="treeRef" v-loading="loading" :data="tree_data" :default-expanded-keys="default_expanded_keys" :expand-on-click-node="false" :props="_defaultProps" class="tree-body" empty-text="未获取到组织机构" node-key="organization_id" render-after-expand @node-click="handleClick" />
  </div>
</template>

<style lang="scss" scoped>
.job-tree {
  display: flex;
  flex-direction: column;

  .tree-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    min-width: fit-content;
    width: 100%;
  }
}

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
