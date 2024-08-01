<script setup>
import { useUrlSearchParams } from '@vueuse/core'
import { defineExpose, onMounted, provide, reactive, ref } from 'vue'

import { getTaskConfigById } from '../../../server/config'
import TaskbaseInfo from '../../../model/task/base.info'
import HeaderComp from './components/header/Index.vue'

// // 用户离开页面需要提醒，防止误触导致表单数据丢失
// window.addEventListener('beforeunload', (e) => {
//   e.preventDefault()
//   e.returnValue = '确定离开该页面'
// })

// 当前面板的配置
const task_config = reactive({
  // 任务的基础信息和权限等配置
  base_info: new TaskbaseInfo(),
  // 节点和边的配置
  process: {
    nodes: [],
    edges: [],
  },
})

provide('task_config', task_config)

function getData(id) {
  const params = useUrlSearchParams('hash')
  id = id || params.id

  if (id) {
    getTaskConfigById(id).then((data) => {
      task_config.base_info = new TaskbaseInfo(data)
      task_config.process = data.process
    }).catch((e) => {
      hl.message.error(e, '获取数据出错')
    })
  }
}

function handleRefresh(config_id) {
  if (task_config.base_info.config_id !== config_id) {
    const params = useUrlSearchParams('hash')
    params.id = config_id
    setTimeout(() => {
      getData()
    })
  }
}

provide('validateBaseConfig', () => {
  return comp_ref.value.validate()
})

onMounted(() => {
  getData()
})

const comp_ref = ref()
defineExpose({
  // 校验任务基础配置
  validateBaseConfig() {
    try {
      return comp_ref.value.validate()
    } catch (e) {
      console.log(e)
    }
  },
  // 获取流程图数据
  getFlowData() {
    return comp_ref.value.getFlowData()
  },
  downloadFlow() {
    comp_ref.value && comp_ref.value.handleExport()
  },
})
</script>

<template>
  <div class="design-wrapper">
    <header-comp class="bg-white px-8" @refresh="handleRefresh" />
    <div class="content-body">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" ref="comp_ref" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>-+

<style lang="scss" scoped>
.design-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;

  .content-body {
    flex: 1;
    min-height: 0;
  }
}
</style>
