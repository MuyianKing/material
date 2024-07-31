<script setup>
</script>

<template>
  <el-tooltip content="平台超时自动积分，规则：超过签收相关单位记0.5分。超时反馈相关单位记0.5分。每超时24小时，记0.5分。累计不超过2次" placement="top">
    <hl-icon icon="ph:question-fill" class="icon"></hl-icon>
  </el-tooltip>
</template>

<style scoped lang="scss">
.icon {
  cursor: pointer;
}
</style>
