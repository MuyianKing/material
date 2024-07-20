<script setup>
const props = defineProps({
  customConfig: {
    type: Object,
    required: true,
  },
})

// 监听配置变化，在全局挂载变量
watch(() => props.customConfig, (config) => {
  window.HL_UI_CONFIG = {
    // 上传文件接口地址
    upload_url: config.upload_url || '',

    // 图标选择组件接口地址
    icon_serlect_url: config.icon_serlect_url || '',
  }
})
</script>

<template>
  <el-config-provider />
</template>

<style lang='scss' scoped></style>
