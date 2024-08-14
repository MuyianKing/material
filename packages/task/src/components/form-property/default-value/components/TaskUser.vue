<script setup>
import ComplexControlSelect from '../../../person-complex-select/Index.vue'

const model = defineModel()
</script>

<template>
  <complex-control-select v-model="model" />
</template>

<style lang='scss' scoped></style>
