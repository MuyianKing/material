<script setup>
const value = defineModel()
</script>

<template>
  <hl-form-item label="背景颜色">
    <el-color-picker v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
