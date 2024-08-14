<script setup>
import { HlFormItem } from '@hl/ui'
import { ElColorPicker } from 'element-plus'
import 'element-plus/es/components/color-picker/style/css'
import '@hl/ui/src/components/form-item/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="背景颜色">
    <el-color-picker v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
