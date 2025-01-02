<script setup name="HlSearchButton">
import { inject } from 'vue'
import ButtonComp from '../button/Index.vue'

defineProps({
  icon: {
    type: [Boolean, undefined],
    default: undefined,
  },
  text: {
    type: String,
    default: '查询',
  },
})

const { buttonIcon } = inject('GLOBAL_CUSTOM_CONFIG', { buttonIcon: true })
</script>

<template>
  <button-comp icon="lucide:search" :show-icon="icon !== undefined ? icon : buttonIcon" :text="$slots.default ? '' : text">
    <slot />
  </button-comp>
</template>
