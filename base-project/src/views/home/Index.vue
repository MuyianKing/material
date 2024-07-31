<script setup>
const file = ref(null)
</script>

<template>
  <hl-upload v-model="file" type="image" trigger-type="card" />
</template>

<style lang='scss' scoped></style>
