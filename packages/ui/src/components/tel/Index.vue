<script setup name="HTel">
defineProps({
  tel: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span class="tel">
    <slot>
      {{ tel }}
    </slot>
  </span>
</template>

<style lang="scss" scoped>
.tel {
  white-space: nowrap;
}
</style>
