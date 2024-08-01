<script setup>
import { inject } from 'vue'
import { HlSelect } from '@hl/ui'

const { property_config } = toRefs(inject('editor_store'))

const model = defineModel()
</script>

<template>
  <hl-select v-model="model" :options="property_config.property?.options || []" />
</template>

<style lang='scss' scoped>
</style>
