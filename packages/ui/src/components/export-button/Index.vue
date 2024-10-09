<script setup>
import ButtonComp from '../button/Index.vue'

defineProps({
  icon: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: '导出',
  },
})
</script>

<template>
  <button-comp class="hl-export-button" type="success" icon="ph:export-bold" :show-icon="icon" :text="$slots.default ? '' : text">
    <slot />
  </button-comp>
</template>
