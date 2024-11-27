<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { uploadFile } from '@server/file'
import { downloadFile, previewFileUrl } from 'utils/file'
import { getIcons } from '@server/icon'
import { HlConfigProvider } from '@hl/ui'

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
@use '@style/index.css';
@use '@style/custome.scss';
@use '@style/main.scss';
@use '@style/utils.scss';
</style>
