<script setup>
const value = defineModel()

const options = [{
  label: '正常',
  value: 1,
}, {
  label: '只读',
  value: 2,
}]
</script>

<template>
  <hl-form-item label="表单状态">
    <hl-radio v-model="value" :options="options" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
