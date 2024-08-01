<script name="TaskCenterIndex" setup>
import { ref } from 'vue'
import { HlIcon } from '@hl/ui'

import TaskMine from './components/task-mine/Index.vue'
import TaskBar from './components/task-bar/Index.vue'
import TaskList from './components/task-list/Index.vue'
import TaskAttention from './components/task-attention/Index.vue'

const my_task_ref = ref()

const _hide = ref(true)

function hideLeft(hide) {
  _hide.value = hide
}

const task_list_ref = ref()

function handleSearch(params) {
  task_list_ref.value && task_list_ref.value.handleSearch(params)
}
</script>

<template>
  <div id="printMe" ref="my_task_ref" class="my-task">
    <div :class="{ 'hide-item': _hide }" class="left">
      <div class="task-layout">
        <task-mine @search="handleSearch" />
        <task-bar class="flex-1" @search="handleSearch" />
        <task-attention class="flex-1" @search="handleSearch" />
      </div>
    </div>
    <div class="right task-layout">
      <div class="hide-btn">
        <hl-icon :icon="_hide ? 'uiw:right' : 'uiw:left'" @click="hideLeft(!_hide)" />
      </div>
      <task-list ref="task_list_ref" class="h-full" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.my-task {
  display: flex;
  padding: 10px;
  height: 100%;
}

$left_width: 440px;

.left {
  width: $left_width;
  transition: all ease 0.5s;
  margin-right: 10px;

  .task-layout {
    width: $left_width;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.right {
  flex: 1;
  min-width: 0;
  height: 100%;
  position: relative;

  .hide-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    background-color: var(--color-info);
    color: white;
    z-index: 999;
    height: 30px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    cursor: pointer;
  }
}

.task-layout > div {
  min-height: 0;
  margin-bottom: 10px;
}

.task-layout > div:last-child {
  margin-bottom: 0;
}

.hide-item {
  width: 0;
  overflow: hidden;
  margin-right: 0;
}
</style>
