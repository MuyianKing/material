<script setup>
import { HlFormItem } from '@hl/ui'
import ComplexControlSelect from '../../person-complex-select/Index.vue'

import '@hl/ui/src/components/form-item/Index.css'

const model = defineModel()
</script>

<template>
  <hl-form-item label="配置人员">
    <complex-control-select v-model="model" />
  </hl-form-item>
</template>

<style scoped lang="scss"></style>
