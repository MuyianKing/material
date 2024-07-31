<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { uploadFile } from '@server/file'
import { downloadFile, previewFileUrl } from 'utils/file'
import { getIcons } from '@server/icon'

const customConfig = {
  uploadFile,
  previewFileUrl,
  downloadFile,
  getIcons,
}
</script>

<template>
  <hl-config-provider :locale="zhCn" :custom-config>
    <router-view />
  </hl-config-provider>
</template>

<style lang="scss">
@import '@style/index.css';
@import '@style/custome.scss';
@import '@style/main.scss';
@import '@style/utils.scss';
</style>
