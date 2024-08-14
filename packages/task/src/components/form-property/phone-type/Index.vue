<script setup>
import { HlCheckbox, HlFormItem } from '@hl/ui'

import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/checkbox/Index.css'

const model = defineModel()

const options = [{
  label: '不限制',
  value: 1,
}, {
  label: '拍照或录像',
  value: 2,
}, {
  label: '本地上传',
  value: 3,
}]

function handleChange(val) {
  const last = [...val].pop()

  if ((last === 2 || last === 3) && val.includes(1)) {
    model.value = val.filter(item => item !== 1)
  } else if (last === 1 || last === undefined) {
    model.value = [1]
  }
}
</script>

<template>
  <hl-form-item label="附件来源">
    <hl-checkbox v-model="model" :options="options" line @change="handleChange" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
