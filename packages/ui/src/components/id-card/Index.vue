<script setup name="HlIdCard">
defineProps({
  idCard: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span class="id-card">{{ idCard }}</span>
</template>

<style lang="scss" scoped>
.id-card {
  white-space: nowrap;
}
</style>
