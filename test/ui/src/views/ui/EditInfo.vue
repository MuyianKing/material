<script setup>
import { HlEditInfo } from '@hl/ui'
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <div>
    <hl-edit-info v-model="test" />
  </div>
</template>

<style lang='scss' scoped></style>
