<script setup>
const value = defineModel()
</script>

<template>
  <hl-form-item label="备注">
    <hl-input v-model="value" type="textarea" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
