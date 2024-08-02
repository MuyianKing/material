<script setup>
import { HlFormItem } from '@hl/ui'
import { ElSwitch } from 'element-plus'
import 'element-plus/es/components/switch/style/css'
import '@hl/ui/src/components/form-item/Index.css'

const property = defineModel()
</script>

<template>
  <hl-form-item v-if="property.expand" label="选项独占一行">
    <el-switch v-model="property.one_line" />
  </hl-form-item>
</template>

<style lang='scss' scoped>
</style>
