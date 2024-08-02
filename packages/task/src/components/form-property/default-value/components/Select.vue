<script setup>
import { inject, toRefs } from 'vue'
import { HlSelect } from '@hl/ui'
import '@hl/ui/src/components/select/Index.css'

const { property_config } = toRefs(inject('editor_store'))

const model = defineModel()
</script>

<template>
  <hl-select v-model="model" :options="property_config.property?.options || []" />
</template>

<style lang='scss' scoped>
</style>
