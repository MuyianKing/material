<script setup>
import { HlFormItem } from '@hl/ui'
import { ElSwitch } from 'element-plus'
import 'element-plus/es/components/switch/style/css'
import '@hl/ui/src/components/form-item/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="多选">
    <el-switch v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
