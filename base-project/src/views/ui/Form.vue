<script setup>
import HlCheckbox from '@hl/ui/src/components/checkbox/Index.vue'
import '@hl/ui/theme-chalk/checkbox.scss'

const options = [{
  label: '测试',
  value: 1,
}, {
  label: '测试2',
  value: 2,
}]
</script>

<template>
  <div>
    <hl-checkbox :options line />
  </div>
</template>

<style lang='scss' scoped>
</style>
