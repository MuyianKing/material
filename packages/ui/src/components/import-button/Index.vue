<script setup>
import ButtonComp from '../button/Index.vue'

import 'element-plus/es/components/button/style/css'

defineProps({
  icon: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: '导入',
  },
})
</script>

<template>
  <button-comp color="#626aef" type="success" icon="ph:export-bold" :show-icon="icon" :text="$slots.default ? '' : text">
    <slot />
  </button-comp>
</template>

<style lang="scss" scoped>
.icon-item {
  font-size: 20px;
  color: var(--color-success);
  cursor: pointer;
}
</style>
