<script setup>
import { inject } from 'vue'
import ButtonComp from '../button/Index.vue'

defineProps({
  icon: {
    type: [Boolean, undefined],
    default: undefined,
  },
  text: {
    type: String,
    default: '导入',
  },
})

const { buttonIcon } = inject('GLOBAL_CUSTOM_CONFIG', { buttonIcon: true })
</script>

<template>
  <button-comp color="#626aef" type="success" icon="ph:export-bold" :show-icon="icon !== undefined ? icon : buttonIcon" :text="$slots.default ? '' : text">
    <slot />
  </button-comp>
</template>
