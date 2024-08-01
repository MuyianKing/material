<script setup>
import { HlFormItem } from '@hl/ui'
import { ElColorPicker } from 'element-plus'
import 'element-plus/es/components/color-picker/style/css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="字体颜色">
    <el-color-picker v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
