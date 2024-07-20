<script setup>

</script>

<template>
  <hl-config-provider :locale="zhCn">
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
