<script setup>
import { guid } from '@hl/utils/es/common'
import { storeToRefs } from 'pinia'
import { inject } from 'vue'
import { HlIcon } from '@hl/ui'
import { node_list } from '../../../../default/flow'
import NodeData from '../../../../model/flow/node.data'
import useFlowStore from '../../../../pinia/modules/useFlowStore'
import { validateOuterFileds } from '../../../../hooks/flow'

const { error_message } = storeToRefs(useFlowStore())

const getLf = inject('getLf')

function addNode(config) {
  config = {
    ...config,
    id: guid(),
  }

  getLf().dnd.startDrag({
    ...config,
    properties: new NodeData(config),
  })
}

const node_list_comp = node_list.map((node) => {
  node.style = { backgroundColor: node.top_bg }
  return node
})

async function handleRefresh() {
  error_message.value = await validateOuterFileds(getLf().getGraphData())
}

// useIntervalFn(async () => {
//   error_message.value = await validateOuterFileds(getLf().getGraphData())
// }, 3000)
</script>

<template>
  <div class="stencil-list">
    <div>
      <div class="node-list">
        <div v-for="node in node_list_comp.filter(item => !item.category)" :key="node.type" class="node-item" :style="node.style" @mousedown="addNode(node)">
          {{ node.base_config.title }}
        </div>
      </div>
      <div class="node-list mt-4">
        <div v-for="node in node_list_comp.filter(item => item.category === 'other')" :key="node.type" class="node-item" :style="node.style" @mousedown="addNode(node)">
          {{ node.base_config.title }}
        </div>
      </div>
    </div>

    <div v-if="error_message.length > 0" class="bottom-wrapper">
      <div class="message-title">
        <hl-icon icon="bx:error" size="28" />
        <span class="ml-2">错误信息</span>
        <hl-icon icon="mingcute:refresh-3-fill" class="refresh" title="刷新" @click="handleRefresh" />
      </div>
      <div v-for="(item, index) in error_message" :key="item.key" class="message-item">
        <div>{{ index + 1 }}、</div>
        <div>{{ item.message }}</div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
$border-radius: 5px;

.stencil-list {
  width: 260px;
  height: 100%;
  user-select: none;
  position: relative;
  height: 100%;

  .node-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;
    height: fit-content;
    background-color: #fff;
  }

  .node-item {
    width: 100px;
    height: fit-content;
    border-radius: $border-radius;
    line-height: 34px;
    color: white;
    text-align: center;
    margin: 10px;
    cursor: move;
  }

  .bottom-wrapper {
    position: absolute;
    bottom: 0;
    padding: 10px;
    background-color: #ffd3d3;
    color: red;
    max-height: calc(100% - 250px);
    overflow: auto;

    .message-title {
      font-size: 20px;
      display: flex;
      align-items: center;
      position: relative;

      .refresh {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }

    .message-item {
      display: flex;
      margin-top: 10px;
      line-height: 22px;
    }
  }
}
</style>
