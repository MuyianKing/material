<script setup>
// 任务图标的容器
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 20,
  },
})

const font_size = computed(() => {
  return `${props.size}px`
})

const box_size = computed(() => {
  return `${props.size + 20}px`
})
</script>

<template>
  <div class="task-icon">
    <hl-icon :icon="icon" :size="font_size" />
  </div>
</template>

<style lang="scss" scoped>
.task-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  height: v-bind(box_size);
  width: v-bind(box_size);
  color: white;
  border-radius: 8px;
}
</style>
