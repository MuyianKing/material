<script setup name="HlIcon">
import { Icon } from '@iconify/vue'
import { getCanUseValue } from '@hl/utils'
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: [Number, String],
    default: '18px',
  },
  color: {
    type: String,
    default: '',
  },
})

const _style = computed(() => {
  return {
    'font-size': getCanUseValue(props.size),
    'color': props.color,
  }
})
</script>

<template>
  <icon class="hl-icon" aria-hidden="false" :style="_style" />
</template>
