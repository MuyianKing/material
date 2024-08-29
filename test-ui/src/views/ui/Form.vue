<script setup>
import HlCheckbox from '@hl/ui/src/components/checkbox'
import HlRadio from '@hl/ui/src/components/radio'

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
    <hl-checkbox :options line readonly :model-value="1" />

    <hl-radio :options readonly :model-value="1" />
  </div>
</template>

<style lang='scss' scoped>
</style>
