<script setup>
import { ref } from 'vue'

import { HlUpload } from '@ui'

const image = ref(null)
</script>

<template>
  <div>
    {{ image }}
    <hl-upload v-model="image" />
    <hl-upload v-model="image" type="file" />
  </div>
</template>

<style lang='scss' scoped>
</style>
