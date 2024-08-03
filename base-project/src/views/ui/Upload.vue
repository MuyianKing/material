<script setup>
import { ref } from 'vue'

import { HlUpload } from '@ui'

const image = ref(null)
</script>

<template>
  <div>
    <hl-upload v-model="image" />
  </div>
</template>

<style lang='scss' scoped>
</style>
