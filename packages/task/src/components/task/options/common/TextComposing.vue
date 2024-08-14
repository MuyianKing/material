<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex justify-between w-full pl-3">
    <div v-for="item in text.split('')">
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
