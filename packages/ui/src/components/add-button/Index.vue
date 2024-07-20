<script setup name="HlAddButton">
import ButtonComp from '../button/Index.vue'

defineProps({
  icon: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: '添加',
  },
})
</script>

<template>
  <button-comp type="danger" icon="icon-park-outline:add-one" :show-icon="icon" :text="text">
    <slot />
  </button-comp>
</template>
