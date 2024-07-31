<script setup>
const value = defineModel()
</script>

<template>
  <hl-form-item label="组件地址">
    <hl-input v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
