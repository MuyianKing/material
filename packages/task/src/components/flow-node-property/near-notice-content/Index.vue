<script setup>
import useAppStore from '@pinia/useAppStore'
import { HlFormItem, HlIcon, HlInput } from '@hl/ui'
import { ElTooltip } from 'element-plus'
import 'element-plus/es/components/tooltip/style/css'

const value = defineModel()

const appStore = useAppStore()
</script>

<template>
  <hl-form-item v-if="value.near_type !== 0 && value.near_type.length > 0" label="通知内容">
    <hl-input v-model="value.near_message" type="textarea" :rows="3" class="flex-1" />
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
