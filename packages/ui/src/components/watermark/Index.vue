<script setup>
import { ElWatermark } from 'element-plus'
import 'element-plus/es/components/watermark/style/css'
</script>

<template>
  <el-watermark class="water-mark" />
</template>

<style lang="scss" scoped>
.water-mark {
  width: 100%;
  height: 100%;
  position: absolute !important;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
