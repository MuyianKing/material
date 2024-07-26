<script setup>
defineProps({
  title: "",
})
</script>

<template>
  <div class="test-comp-wrapper">
    <hl-block-title :title />
    <div class="pt-2 pl-4">
      <slot></slot>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
