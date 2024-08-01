<script setup>
import { HlFormItem } from '@hl/ui'
import ComplexControlSelect from '../../person-complex-select/Index.vue'

const model = defineModel()
</script>

<template>
  <hl-form-item label="配置人员">
    <complex-control-select v-model="model" />
  </hl-form-item>
</template>

<style scoped lang="scss">

</style>
