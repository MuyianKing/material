<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const customConfig = {

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
