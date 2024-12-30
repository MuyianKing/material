<script setup>
import { debounceRef } from '@hl/ui/utils'

const value = debounceRef('', 1000)
</script>

<template>
  <div>
    <div>
      {{ value }}
    </div>
    <input v-model="value">
  </div>
</template>

<style lang='scss' scoped>
</style>
