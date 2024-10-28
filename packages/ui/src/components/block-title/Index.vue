<script setup name="BlockTitle">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  title: {
    type: String,
    default: '',
  },
  fontSize: {
    type: Number,
    default: 16,
  },
  color: {
    type: String,
    default: '#595757',
  },
  showBlock: {
    type: Boolean,
    default: true,
  },
  // 是否开启渐变
  linearGradient: {
    type: Boolean,
    default: false,
  },
})

const title_style = computed(() => {
  return {
    'color': props.color,
    'font-size': `${props.fontSize}px`,
  }
})
</script>

<template>
  <div :class="linearGradient ? 'hl-block-title' : 'hl-flat-block-title'" v-bind="$attrs">
    <div class="flex h-full">
      <div v-if="showBlock" class="block" :class="type" />
      <div class="title flex items-center justify-center" :style="title_style">
        <slot>{{ title }}</slot>
      </div>
    </div>
    <div>
      <slot name="after" />
    </div>
  </div>
</template>
