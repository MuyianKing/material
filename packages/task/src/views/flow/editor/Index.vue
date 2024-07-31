<script setup>
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import LogicFlow from '@logicflow/core'

import { Control, SelectionSelect, Snapshot } from '@logicflow/extension'

import FlowConfig from '../config/Index.vue'
import { getPrevNodes, hanlderIsEmpty, splitNodeEdge, validateOuterFileds } from '../../../hooks/flow'
import link from '../../../components/logicflow/edge/link'
import { registerAllNodes } from '../../../components/logicflow/node/'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import StencilComp from './components/Stencil.vue'
import ContextMenu from './components/ContextMenu.vue'

LogicFlow.use(Control)
LogicFlow.use(SelectionSelect)
LogicFlow.use(Snapshot)

const { process, base_info } = toRefs(inject('task_config'))
const flowStore = useFlowStore()

const { error_message } = storeToRefs(useFlowStore())

let lf = null
const context_menu_value = ref(null)

provide('getLf', () => {
  return lf
})

function initGraph() {
  lf = new LogicFlow({
    container: document.querySelector('#container'),
    stopScrollGraph: true,
    adjustEdgeMiddle: true,
    adjustEdgeStartAndEnd: true,
    grid: {
      type: 'mesh',
      size: 20,
    },
  })
  registerAllNodes(lf)

  lf.register(link)
  lf.setDefaultEdgeType('link')
  lf.closeSelectionSelect()

  lf.on('node:contextmenu', ({ e, data }) => {
    context_menu_value.value = {
      type: 'node',
      position: {
        x: e.clientX,
        y: e.clientY,
      },
      data: data.properties,
    }
  })

  lf.on('node:click', ({ data }) => {
    data = data.properties
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
  })

  lf.on('edge:contextmenu', ({ e, data }) => {
    context_menu_value.value = {
      type: 'edge',
      position: {
        x: e.clientX,
        y: e.clientY,
      },
      data: {
        ...data.properties,
        id: data.id,
      },
    }
  })

  lf.on('blank:mousedown', () => {
    context_menu_value.value = null
  })

  // 新增边
  lf.on('edge:add', ({ data }) => {
    if (data.sourceNodeId === data.targetNodeId) {
      return
    }
    flowStore.closeConfig(lf)
  })

  // 边调整
  lf.on('edge:adjust', () => {
    flowStore.closeConfig(lf)
  })

  lf.on('edge:add', ({ data }) => {
    const source_node_data = lf.getProperties(data.sourceNodeId)
    const target_node_data = lf.getProperties(data.targetNodeId)

    if (source_node_data.id === target_node_data.id) {
      lf.deleteEdge(data.id)
      hl.message.warning('不可以连接自身节点')
      return
    }

    // 如果开始节点时签收节点，结束节点未配置处置人，那么结束节点的处置人继承开始节点
    if (source_node_data.type === 'SignNode' && hanlderIsEmpty(target_node_data.base_config.handler)) {
      target_node_data.base_config.handler = source_node_data.base_config.handler
      lf.setProperties(data.targetNodeId, target_node_data)
    }
  })

  // 监听节点删除
  lf.on('node:delete', useDebounceFn(() => {
    validateOuterFileds(lf.getGraphData()).then((error) => {
      error_message.value.push(...error)
    })
  }, 200))

  setContent()
}

async function setContent() {
  if (process?.value) {
    lf.render(process?.value)
    const cells = lf.getGraphData()
    error_message.value = await validateOuterFileds(cells)
  }
}

const config_ref = ref()

// 获取流程数据
async function getFlowData() {
  config_ref.value?.handleClose()

  await nextTick()
  const cells = lf.getGraphData()
  return splitNodeEdge(cells)
}

watch(process, () => {
  setContent()
})

onMounted(() => {
  nextTick(() => {
    initGraph()
  })
})

useEventListener(document, 'keyup', (e) => {
  if (e.key === 'Control') {
    // 取消可多选
    lf.closeSelectionSelect()
  }
})

function handleMouseEnter() {
  lf && lf.updateEditConfig({
    stopZoomGraph: false,
  })
}

function handleMouseLeave() {
  lf && lf.updateEditConfig({
    stopZoomGraph: true,
  })
}

// 导出流程图
function handleExport() {
  lf.getSnapshot(`${base_info.value.config_name}.png`, '#fff')
}

useEventListener(document, 'keydown', (e) => {
  if (e.key === 'Control') {
    // 打开可多选
    lf.openSelectionSelect()
  }
})

defineExpose({
  getFlowData,
  handleExport,
})
</script>

<template>
  <div class="flex w-full h-full relative">
    <stencil-comp />
    <div id="container" class="main-wrap" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" />
    <flow-config ref="config_ref" />
    <context-menu v-model="context_menu_value" />
  </div>
</template>

<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  flex: 1;
  min-width: 0;

  :deep(.lf-control-item i) {
    width: 16px;
    height: 16px;
  }
}

.export-btn {
  position: absolute;
  top: 10px;
  left: 270px;
  z-index: 9;
}
</style>
