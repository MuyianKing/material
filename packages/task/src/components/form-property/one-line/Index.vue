<script setup>
const property = defineModel()
</script>

<template>
  <hl-form-item v-if="property.expand" label="选项独占一行">
    <el-switch v-model="property.one_line" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
