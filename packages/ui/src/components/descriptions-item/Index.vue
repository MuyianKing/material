<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  // 占的列数
  span: {
    type: Number,
    default: 1,
  },
  // label宽度，内容取剩下的
  labelWidth: {
    type: String,
    default: '',
  },
})

const column = inject('column', 4)

const _style = computed(() => {
  return {
    width: `${100 / column.value * props.span}%`,
  }
})
</script>

<template>
  <div class="hl-descriptions-item" :style="_style">
    <div class="hl-descriptions-item-label" :style="{ width: labelWidth }">
      {{ label }}
    </div>
    <div class="hl-descriptions-item-content">
      <slot />
    </div>
  </div>
</template>
