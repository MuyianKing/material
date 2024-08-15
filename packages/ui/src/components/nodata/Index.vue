<script setup name="HlNoData">
import { computed } from 'vue'
import img from '../assets/img/no-data.png'

const props = defineProps({
  img: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: 'auto',
  },
  width: {
    type: String,
    default: '100%',
  },
  text: {
    type: String,
    default: '没有数据',
  },
})

const src = computed(() => props.img || img)
</script>

<template>
  <div class="hl-no-data">
    <img class="no-data-img" :src="src">
    <div class="no-data-text">
      {{ text }}
    </div>
    <slot />
  </div>
</template>
