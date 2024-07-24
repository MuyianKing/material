<script setup>
const options = [{
  label: '是',
  value: 1,
}, {
  label: '否',
  value: 2,
}]
</script>

<template>
  <div class="p-4">
    <hl-checkbox :options />
  </div>
</template>

<style lang='scss' scoped>
</style>
