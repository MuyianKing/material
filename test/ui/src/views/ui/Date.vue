<script setup>
import { HlDate } from '@hl/ui'
import { reactive } from 'vue'

const date_obj = reactive({
  start: '',
  end: '',
})
</script>

<template>
  <div>
    <hl-date v-model:start="date_obj.start" v-model:end="date_obj.end" type="range" />
  </div>
</template>

<style lang='scss' scoped></style>
