<script setup>
const value = defineModel()
</script>

<template>
  <hl-form-item label="接口地址">
    <hl-input v-model="value" placeholder="不配置默认请求统一用户" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
