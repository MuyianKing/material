<script setup>
import { defineEmits, defineProps, onMounted, ref } from 'vue'

import TaskContactPerson from '../task-contact-person/Index.vue'
import { getOptBtn } from '../../../../../server/common.task.page'
import UnitManager from './components/UnitManager.vue'
import CreateTask from './components/CreateTask.vue'
import HeaderConfig from './components/HeaderConfig.vue'
import ParamsConfig from './components/ParamsConfig.vue'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['refresh-one', 'params-refresh'])

const opt_config = ref({})

function getData() {
  getOptBtn(props.configUuid).then((data) => {
    opt_config.value = data
  }).catch((e) => {
    hl.message.error(e, '获取可操作操作出错')
  })
}

function refresh() {
  emits('refresh-one')
}

onMounted(() => {
  getData()
})
</script>

<template>
  <!--  创建任务 -->
  <create-task v-if="opt_config.create === 1" :config-uuid @refresh="refresh" />

  <div class="flex flex-1 justify-end">
    <header-config :config-uuid @refresh="refresh" />
    <params-config :config-uuid @refresh="$emit('params-refresh')" />

    <!-- 单位管理 -->
    <unit-manager v-if="opt_config.org === 1" :config-uuid />
    <!-- 配置人员 -->
    <task-contact-person v-if="opt_config.user === 1" :config-uuid text="人员" />
  </div>
</template>

<style scoped lang="scss">

</style>
