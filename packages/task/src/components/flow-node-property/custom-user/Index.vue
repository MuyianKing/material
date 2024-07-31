<script setup>
const value = defineModel()

const options = [{
  label: '一般配置',
  value: 0,
}, {
  label: '自定义',
  value: 1,
}, {
  label: '节点继承',
  value: 2,
}]
</script>

<template>
  <hl-form-item label="配置方式">
    <hl-radio v-model="value" :options="options" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
