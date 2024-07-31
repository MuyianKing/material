<script setup>
const options = [{
  label: '全部',
  value: 1,
}, {
  label: '分局',
  value: 2,
}, {
  label: '派出所 ',
  value: 3,
}, {
  label: '责任区',
  value: 4,
}]

const value = defineModel()
</script>

<template>
  <hl-form-item label="数据范围">
    <hl-radio v-model="value" :options />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
