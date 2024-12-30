<script setup name="HlAddButton">
import { inject } from 'vue'
import ButtonComp from '../button/Index.vue'

defineProps({
  icon: {
    type: [Boolean, undefined],
    default: undefined,
  },
  text: {
    type: String,
    default: '添加',
  },
})

const { buttonIcon } = inject('GLOBAL_CUSTOM_CONFIG', { buttonIcon: true })
</script>

<template>
  <button-comp type="danger" icon="icon-park-outline:add-one" :show-icon="icon !== undefined ? icon : buttonIcon" :text="$slots.default ? '' : text">
    <slot />
  </button-comp>
</template>
