<script setup>
import { ref } from 'vue'

import { HlUpload } from '@hl/ui'

const file = ref(null)
</script>

<template>
  <hl-upload v-model="file" type="image" trigger-type="card" />

  <el-date-picker type="datetime" />
</template>

<style lang='scss' scoped></style>
