<script setup>
const value = defineModel()
</script>

<template>
  <hl-form-item label="多选">
    <el-switch v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
