<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { HlFormItem, HlIcon, HlInput } from '@hl/ui'
import { ElTooltip } from 'element-plus'
import useFlowStore from '../../../pinia/modules/useFlowStore'
import 'element-plus/es/components/tooltip/style/css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/icon/Index.css'
import '@hl/ui/src/components/input/Index.css'

const value = defineModel()
const appStore = hl.appStore

const { node } = storeToRefs(useFlowStore())

const show = computed(() => {
  const val = value.value
  return val.zp_sp_notice_type !== 0 && value.value.zp_sp_notice_type.length > 0 && node.value.base_config.zp_enable === 1 && node.value.base_config.zp_sp_enable === 1
})
</script>

<template>
  <hl-form-item v-if="show" label="通知内容">
    <hl-input v-model="value.zp_sp_notice_message" type="textarea" :rows="3" class="flex-1" />
    <el-tooltip effect="dark" placement="top-start">
      <template #content>
        <div>${title}在下发消息时会用【任务标题】替换</div>
        <div>${app}在下发消息时会用【{{ appStore.app_name }}】替换</div>
      </template>
      <hl-icon icon="mingcute:question-fill" class="text-gray-600 ml-2 cursor-pointer" />
    </el-tooltip>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
