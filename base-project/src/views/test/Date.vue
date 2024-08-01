<script setup>
import { ref } from 'vue'

import { HlDate } from '@hl/ui'

const date = ref('')

const date_range = ref()
const date_start = ref()
const date_end = ref()
</script>

<template>
  <div>
    <hl-date v-model="date" />
    <hl-date v-model="date" date-type="datetime" />
    <hl-date v-model="date_range" v-model:start="date_start" v-model:end="date_end" type="range" />
  </div>
</template>

<style lang='scss' scoped>
</style>
