<script setup>
defineProps({
  column: {
    type: Number,
    default: 2,
  },
})
</script>

<template>
  <div class="hl-descriptions">
    <slot />
  </div>
</template>

<style lang='scss'>
.hl-descriptions {
  display: flex;
  flex-wrap: wrap;

  & > div {
    flex-shrink: 0;
  }
}
</style>
