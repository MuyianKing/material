<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
@import '@style/index.css';
@import '@style/custome.scss';
@import '@style/main.scss';
@import '@style/utils.scss';
</style>
