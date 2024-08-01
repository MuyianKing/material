<script setup>
import { computed, defineEmits, defineModel, ref } from 'vue'

import { isBenchesJK, setGroupTaskShow } from '../../../../../../../server/benches'
import CreateTask from './CreateTask.vue'

const emits = defineEmits(['search'])
const value = defineModel()
const status = ref()

async function getData() {
  try {
    const res = await isBenchesJK()
    status.value = res.data.info_group
    value.value = res.data.info_group
  } catch (error) {
    hl.message.error(error, '获取失败')
  }
}

getData()

async function handleChange(state) {
  status.value = state
  hl.message.loading('正在设置...')
  try {
    await setGroupTaskShow(status.value)
    value.value = state
    emits('search')
  } catch (error) {
    status.value = state === 1 ? 0 : 1
    hl.message.error(error, '设置失败')
  } finally {
    hl.message.closeLoading()
  }
}

const itemWith = '50px'
const sliderPosition = computed(() => {
  if (status.value === 1) {
    return {
      left: '0',
    }
  } else if (status.value === 0) {
    return {
      left: itemWith,
    }
  }

  return {
    left: '-76px',
  }
})
</script>

<template>
  <div class="task-group">
    <span>任务组：</span>
    <div class="smooth-switch-box flex items-center relative ml-2">
      <div :class="{ active: status === 1 }" class="smooth-switch-item" @click="handleChange(1)">
        是
      </div>
      <div :class="{ active: status === 0 }" class="smooth-switch-item" @click="handleChange(0)">
        否
      </div>
      <div :style="sliderPosition" class="smooth-switch-slider" />
    </div>

    <create-task />
  </div>
</template>

<style lang="scss" scoped>
.task-group {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 999;
}

.smooth-switch-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  line-height: 26px;
  height: 26px;
  cursor: pointer;
  overflow: hidden;
  color: #666;
}

.smooth-switch-item {
  width: v-bind(itemWith);
  height: 100%;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease-in-out;

  &.active {
    color: #fff;
  }
}

.smooth-switch-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(itemWith);
  height: 100%;
  background-color: #409eff;

  transition: left 0.2s ease-in-out;
}
</style>
