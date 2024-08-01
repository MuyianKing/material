<script setup>
import { getCurrentInstance, inject, onMounted, ref, toRefs, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { HlButton, HlExportButton } from '@hl/ui'
import { ElTabPane, ElTabs } from 'element-plus/es'

import TaskIcon from '../../../../../components/task/Icon.vue'
import { publishTaskConfig, saveTaskConfig } from '../../../../../server/config'
import { validateFlowData, validateOuterFileds } from '../../../../../hooks/flow'
import useFlowStore from '../../../../../pinia/modules/useFlowStore'

const emits = defineEmits(['refresh'])
const { base_info } = toRefs(inject('task_config'))
const active_tab = ref('')

const { error_message } = storeToRefs(useFlowStore())

const route = useRoute()
const router = useRouter()

const tab_list = [{
  label: '① 基础信息',
  name: 'base-config',
}, {
  label: '② 流程配置',
  name: 'flow',
}]

const validateBaseConfig = inject('validateBaseConfig')

// 保存
async function handleSave() {
  try {
    hl.message.loading('正在保存...')
    const process = await instance.parent.exposed.getFlowData()

    saveTaskConfig({
      ...base_info.value,
      process,
    }).then((data) => {
      emits('refresh', data.data.config_id)
      base_info.value.is_publish = false
      hl.message.success('保存成功')
    }).catch((e) => {
      hl.message.error(e, '保存失败')
    })
  } catch (error) {
    hl.message.error(error)
  } finally {
    hl.message.closeLoading()
  }
}

// 发布
async function handlePublish() {
  try {
    hl.message.loading('正在提交...')
    const process = await instance.parent.exposed.getFlowData()

    validateFlowData(process)
    const error = await validateOuterFileds(process)
    error_message.value = error

    // 一个错误直接提示
    if (error.length === 1) {
      hl.message.confirm(error[0].message, '提示', {
        type: 'error',
        showCancelButton: false,
      })
      return
    }

    // 多个错误提示注意左下角
    if (error.length > 0) {
      hl.message.confirm('流程中存在错误配置，详情请看界面左下角', '提示', {
        type: 'error',
        showCancelButton: false,
      })
      return
    }

    const data = await publishTaskConfig({
      ...base_info.value,
      process,
    })

    emits('refresh', data.data.config_id)
    base_info.value.is_publish = true
    hl.message.success('发布成功')
  } catch (e) {
    hl.message.error(e, '发布失败')
  } finally {
    hl.message.closeLoading()
  }
}

// 切换tab时，基础配置页面需要校验参表单数据是否合法
const instance = getCurrentInstance()

let update_self = false
let click_tab = 'base-config'

async function handleBefore(tab, oldActiveName) {
  if (oldActiveName === 'base-config') {
    await validateBaseConfig()
  }

  update_self = true
  click_tab = tab
  let url = `/task/design/${click_tab}`
  if (route.query.id) {
    url += `?id=${route.query.id}`
  }
  router.push(url)
}

// 导出
function handleExport() {
  instance.parent.exposed.downloadFlow()
}

watch(route, () => {
  if (!update_self && active_tab.value !== 'base-config') {
    active_tab.value = 'base-config'
  } else {
    active_tab.value = click_tab
  }

  update_self = false
}, {
  immediate: true,
})

onMounted(() => {
  let url = `/task/design/base-config`
  if (route.query.id) {
    url += `?id=${route.query.id}`
  }
  router.push(url)
})
</script>

<template>
  <div class="header-wrapper">
    <div class="flex items-center">
      <task-icon :icon="base_info.logo" />
      <span class="ml-3">
        {{ base_info.config_name || '未命名任务' }}
        <template v-if="!base_info.is_publish">（未发布）</template>
      </span>
    </div>

    <el-tabs :model-value="active_tab" class="tabs-wrapper" :before-leave="handleBefore">
      <el-tab-pane v-for="tab in tab_list" :key="tab.name" :label="tab.label" :name="tab.name" />
    </el-tabs>

    <div v-show="active_tab === 'flow'">
      <hl-export-button class="btn" text="导出流程图" @click="handleExport" />
      <hl-button type="primary" icon="teenyicons:folder-tick-solid" class="btn" @click="handleSave">
        保存
      </hl-button>
      <hl-button type="warning" icon="streamline:mail-send-email-message-solid" class="btn" @click="handlePublish">
        <template v-if="!base_info.is_publish">
          发布
        </template>
        <template v-else>
          再次发布
        </template>
      </hl-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #dcdfe6;
  position: relative;
}

.tabs-wrapper {
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.btn {
  border-radius: 16px;
}

:deep(.el-tabs) {
  .el-tabs__header {
    margin: 0;

    .el-tabs__nav {
      align-items: center;
      height: 60px;
    }
  }
}
</style>
