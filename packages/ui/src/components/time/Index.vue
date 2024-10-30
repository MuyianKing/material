<script setup>
import { computed } from 'vue'

const props = defineProps({
  time: {
    type: String,
    default: '',
  },
  separator: {
    type: String,
    default: ' ',
  },
  nowrap: {
    type: Boolean,
    default: false,
  },
})

const parse_time = computed(() => props.time?.split(props.separator).filter(item => item) || ['', ''])
</script>

<template>
  <div :class="{ 'flex-wrap': !nowrap }" class="inline-flex justify-center">
    <div class="whitespace-nowrap">
      {{ parse_time[0] || '' }}
    </div>
    <div v-if="parse_time[1]" class="ml-1 whitespace-nowrap">
      {{ parse_time[1] || '' }}
    </div>
  </div>
</template>
