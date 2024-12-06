<script setup>
import { provide, toRefs } from 'vue'

const props = defineProps({
  // 列数
  column: {
    type: Number,
    default: 4,
  },
})

const { column } = toRefs(props)

provide('column', column)
</script>

<template>
  <div class="hl-descriptions">
    <slot />
  </div>
</template>
