<script setup>
import { defineProps } from 'vue'
import { HlBlockTitle } from '@hl/ui'

defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="test-comp-wrapper">
    <hl-block-title :title />
    <div class="pt-2 pl-4">
      <slot />
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
