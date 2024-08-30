<script setup>
import HlCheckbox from '@hl/ui/src/components/checkbox'
import HlRadio from '@hl/ui/src/components/radio'
import HlSelect from '@hl/ui/src/components/select'

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
    <hl-select :options :model-value="1" readonly />
  </div>
</template>

<style lang='scss' scoped>
</style>
