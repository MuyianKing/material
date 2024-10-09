<script setup name="BlockTitle">
defineProps({
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
  showBlock: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: ' #595757',
  },
})
</script>

<template>
  <div class="hl-block-title">
    <div class="flex h-full">
      <div v-if="showBlock" class="block" :class="type" />
      <div class="title flex items-center justify-center">
        <slot>{{ title }}</slot>
      </div>
    </div>
    <div>
      <slot name="after" />
    </div>
  </div>
</template>
