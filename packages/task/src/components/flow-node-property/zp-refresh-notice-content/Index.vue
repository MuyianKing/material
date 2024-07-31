<script setup>
import useAppStore from '@pinia/useAppStore'
import useFlowStore from '../../../pinia/modules/useFlowStore'

const value = defineModel()
const appStore = useAppStore()

const { node } = storeToRefs(useFlowStore())

const show = computed(() => {
  const val = value.value
  const config = node.value.base_config
  return val.zp_sp_refuse_notice_type !== 0 && value.value.zp_sp_refuse_notice_type.length > 0 && config.zp_enable === 1 && config.zp_sp_enable === 1
})
</script>

<template>
  <hl-form-item v-if="show" label="通知内容">
    <hl-input v-model="value.zp_sp_refuse_notice_message" type="textarea" :rows="3" class="flex-1" />
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
