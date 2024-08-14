<script setup>
import FirstHandle from '../first-handle/Index.vue'

const value = defineModel()
</script>

<template>
  <first-handle v-model="value" handle-type="second" />
</template>

<style lang='scss' scoped></style>
