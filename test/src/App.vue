<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <hl-config-provider :locale="zhCn" :custom-config="{}">
    <router-view />
  </hl-config-provider>
</template>

<style>
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'microsoft yahei', arial, STHeiTi, sans-serif;
}
</style>
