<script setup>
import { ElConfigProvider } from 'element-plus'

import { provide } from 'vue'

const props = defineProps({
  /**
   * upload_url: 上传文件接口地址,
   * icon_serlect_url: 图标选择组件接口地址,
   * getUserStore：获取用户信息
   */
  customConfig: {
    type: Object,
    required: true,
  },
})

provide('GLOBAL_CUSTOM_CONFIG', props.customConfig)
</script>

<template>
  <el-config-provider>
    <slot />
  </el-config-provider>
</template>
