<script setup>
import { ElButton } from 'element-plus'
import IconComp from '../icon/Index.vue'
import 'element-plus/es/components/button/style/css'

defineProps({
  icon: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: '导出',
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <el-button v-if="type === 'button'" type="success">
    <icon-comp v-if="icon" icon="ph:export-bold" class="mr-1" />
    {{ text }}
    <slot />
  </el-button>
  <icon-comp v-else icon="ph:export-bold" class="mr-1 icon-item" />
</template>

<style lang="scss" scoped>
.icon-item {
  font-size: 20px;
  color: var(--color-success);
  cursor: pointer;
}
</style>
