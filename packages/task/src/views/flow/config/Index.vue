<script setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { HlIcon } from '@hl/ui'
import { ElTabPane, ElTabs } from 'element-plus'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import EdgeConfig from './edge/Index.vue'
import NodeConfig from './node/Index.vue'

const activeName = ref('first')

const { node, show, edge } = storeToRefs(useFlowStore())
const style_comp = computed(() => {
  return { width: show.value ? '440px' : '0', padding: show.value ? '5px' : '0' }
})

const getLf = inject('getLf')

function handleClick() {
  getLf().clearSelectElements()
}

function handleClose() {
  useFlowStore().closeConfig(getLf())
}

watchEffect(() => {
  activeName.value = node.value ? 'first' : edge.value ? 'third' : ''
})

defineExpose({
  handleClose,
})
</script>

<template>
  <div class="config-wrapper" :style="style_comp" @click="handleClick">
    <div class="tabs-wrapper">
      <el-tabs v-model="activeName" class="px-2 h-full">
        <template v-if="node">
          <el-tab-pane label="基础配置" name="first">
            <node-config />
          </el-tab-pane>
        </template>
        <template v-else-if="edge">
          <el-tab-pane label="条件配置" name="third">
            <edge-config />
          </el-tab-pane>
        </template>
      </el-tabs>

      <div v-show="show" class="close-item">
        <hl-icon icon="icon-park-outline:right" @click="handleClose" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.config-wrapper {
  transition: all ease 0.3s;
  position: relative;
  background-color: #fff;
}

.tabs-wrapper {
  height: 100%;
  width: 430px;
  overflow: auto;
}

:deep(.el-tabs__content) {
  height: calc(100% - 55px);
  overflow: auto;
}

.close-item {
  width: 20px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateX(-50%) translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;
  box-shadow:
    -1px 0 5px #c4c1c1,
    5px 0 0 white;
  color: gray;
}
</style>
