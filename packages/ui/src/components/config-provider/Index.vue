<script setup>
import { ElConfigProvider } from 'element-plus'
import { provide } from 'vue'

const props = defineProps({
  customConfig: {
    type: Object,
    required: true,
  },
})

/**
 * 提供全局配置
 * @param {object} customConfig
 * @param {Function} customConfig.uploadFile: 上传文件方法,
 * @param {Function} customConfig.downloadFile: 下载文件方法,
 * @param {Function} customConfig.getIcons：获取图标接口
 */
function provideGlobalConfig(customConfig) {
  provide('GLOBAL_CUSTOM_CONFIG', customConfig)
}

provideGlobalConfig(props.customConfig)
</script>

<template>
  <el-config-provider>
    <slot />
  </el-config-provider>
</template>
