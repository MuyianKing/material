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
 * @param {Function} customConfig.uploadFile : 上传文件方法,
 * @param {Function} customConfig.downloadFile : 下载文件方法,
 * @param {Function} customConfig.getIcons ：获取图标接口
 * @param {boolean} customConfig.buttonIcon ：search-button、add-button、export-button、import-button、reset-button默认是否带有图标
 * @param {boolean} customConfig.tableIcon ：edit-button、detail-button、del-button默认样式可选：icon、text
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
