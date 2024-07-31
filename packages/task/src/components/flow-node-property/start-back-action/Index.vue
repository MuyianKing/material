<script setup>
const value = defineModel()
const options = [{
  label: '自动重新下发',
  value: 0,
}, {
  label: '手动重新下发',
  value: 1,
}]
</script>

<template>
  <hl-form-item label="被退回行为">
    <hl-radio v-model="value" :options="options" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
