<script setup>
const { property_config } = toRefs(inject('editor_store'))

const model = defineModel()
</script>

<template>
  <hl-select v-model="model" :options="property_config.property?.options || []" />
</template>

<style lang='scss' scoped>
</style>
