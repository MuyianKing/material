<script setup>
import { computed, inject } from 'vue'
import { getPrevNodes } from '../../../../hooks/flow'
import useFlowStore from '../../../../pinia/modules/useFlowStore'

const modelValue = defineModel({
  type: Object,
  default: null,
})

const getLf = inject('getLf')
const flowStore = useFlowStore()

// 添加节点
function handleClick(val) {
  const lf = getLf()
  if (val === 'del') {
    const selectElements = lf.getSelectElements()
    selectElements.nodes.forEach((node) => {
      lf.deleteNode(node.id)
    })

    selectElements.edges.forEach(edge => lf.deleteEdge(edge.id))
  } else if (val === 'condition') {
    openEdgeConfig(modelValue.value?.data.id, modelValue.value?.data)
  } else if (val === 'node_config') {
    const data = modelValue.value?.data
    const node_ids = getPrevNodes(lf, data.id)
    // 前面的兄弟
    const prev_node_config = node_ids.map(item => lf.getProperties(item))
    flowStore.openBaseConfig({
      ...data,
      prev_form_id: prev_node_config.map(item => ({
        node_name: item.base_config.title,
        node_id: item.id,
        form_id: item.form_id,
      })),
    }, lf)
  }

  modelValue.value = null
}

const _style = computed(() => {
  return {
    left: `${modelValue.value?.position?.x || 0}px`,
    top: `${modelValue.value?.position?.y || 0}px`,
  }
})

// 右击菜单项
const opt_menus = computed(() => {
  const lf = getLf()

  if (lf) {
    const selectElements = lf.getSelectElements()

    // 选中多个只能删除
    const multiple_items = selectElements.nodes.length > 1 || selectElements.edges.length > 1
    if (multiple_items) {
      // 类型变成all
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      modelValue.value.type = 'all'

      return [{
        label: '删除',
        value: 'del',
      }]
    }
  }

  if (modelValue.value?.type === 'node') {
    return [{
      label: '删除',
      value: 'del',
    }, {
      label: '属性配置',
      value: 'node_config',
    }]
  } else if (modelValue.value?.type === 'edge') {
    return [{
      label: '删除',
      value: 'del',
    }, {
      label: '配置条件',
      value: 'condition',
    }]
  }
  return []
})

function openEdgeConfig(id, data) {
  // 为边配置流转条件
  const lf = getLf()

  // 找到边数据
  const edge_data = lf.getEdgeDataById(id)

  // 找到开始节点：用来配置流转条件
  const node = lf.getProperties(edge_data.sourceNodeId)

  // 获取到线条上一个节点之前的所有节点
  const node_ids = getPrevNodes(lf, node.id)
  const prev_node_config = node_ids.map(id => lf.getProperties(id))
  const nodes = [node, ...prev_node_config]

  if (!nodes.filter(item => item.form_id).length === 0) {
    hl.message.warning('请至少为前面的一个节点关联表单')
    return
  }

  flowStore.openEdgeConfig({
    edge: data,
    nodes,
  }).catch((e) => {
    hl.message.error(e, '打开配置失败')
  })
}

defineExpose({
  openEdgeConfig,
})
</script>

<template>
  <div v-show="modelValue" class="add-node-wrap" :style="_style">
    <div v-for="item in opt_menus" :key="item.value" class="list-node-item" @click="handleClick(item.value)">
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-node-wrap {
  position: absolute;
  background-color: #fff;
  z-index: 999;
  border-radius: 4px;
  padding: 4px;
  box-shadow: 0 0 5px #d5d5d5;
}

.list-node-item {
  padding: 8px 10px;
  border-radius: 4px;
  flex: 1;
  width: 120px;
  text-align: center;
}

.list-node-item:hover {
  cursor: pointer;
  background-color: whitesmoke;
}
</style>
