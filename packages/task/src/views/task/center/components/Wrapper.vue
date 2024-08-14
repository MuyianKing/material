<script setup>
import { HlBlockTitle } from '@hl/ui'
import '@hl/ui/src/components/block-title/Index.css'

defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="block-wrapper">
    <div class="flex justify-between">
      <hl-block-title v-if="!$slots.title">
        {{ title }}
      </hl-block-title>
      <slot v-else name="title" />
      <slot name="center" />
      <slot name="right" />
    </div>

    <div class="wrapper-content">
      <slot />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.block-wrapper {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;

  .wrapper-content {
    flex: 1;
    min-height: 0;
    padding-top: 10px;
    overflow: auto;
  }
}
</style>
