<script setup>
import { inject, nextTick, onMounted, useSlots } from 'vue'

const context_item_renders = inject('context_item_renders')

// 没有插槽的渲染函数
function DEFAULT_RENDER_CELL(row) {
  return row.label
}

const slots = useSlots()

onMounted(() => {
  nextTick(() => {
    context_item_renders.value.push(slots.default || DEFAULT_RENDER_CELL)
  })
})
</script>

<template>
  <div />
</template>
