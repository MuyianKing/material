<script setup>
import { HlFormItem } from '@hl/ui'
import { ElSwitch } from 'element-plus'
import 'element-plus/es/components/switch/style/css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="展开">
    <el-switch v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
