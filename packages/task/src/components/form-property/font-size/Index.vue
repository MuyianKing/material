<script setup>
const value = defineModel(Number)
</script>

<template>
  <hl-form-item label="字体大小">
    <hl-input v-model="value" :clearable="false" type="number">
      <template #append>
        px
      </template>
    </hl-input>
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
