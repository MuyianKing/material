<script setup>
import { HlSelect } from '@hl/ui'

const options = [{
  label: '天',
  value: 'day',
}, {
  label: '小时',
  value: 'hour',
}, {
  label: '分钟',
  value: 'minute',
}]
</script>

<template>
  <hl-select :options="options">
    template
  </hl-select>
</template>

<style lang='scss' scoped>
</style>
