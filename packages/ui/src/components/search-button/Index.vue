<script setup name="HlSearchButton">
import ButtonComp from '../button/Index.vue'

defineProps({
  icon: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: '查询',
  },
})
</script>

<template>
  <button-comp icon="lucide:search" :show-icon="icon" :text="$slots.default ? '' : text">
    <slot />
  </button-comp>
</template>
