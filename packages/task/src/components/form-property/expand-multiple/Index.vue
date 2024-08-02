<script setup>
import { HlFormItem } from '@hl/ui'
import { ElSwitch } from 'element-plus'
import 'element-plus/es/components/switch/style/css'
import '@hl/ui/src/components/form-item/Index.css'

const property = defineModel()
</script>

<template>
  <div class="w-full flex">
    <hl-form-item label="展开" class="fleex-1">
      <el-switch v-model="property.expand" />
    </hl-form-item>
    <hl-form-item label="多选" class="fleex-1">
      <el-switch v-model="property.multiple" />
    </hl-form-item>
  </div>
</template>

<style lang='scss' scoped></style>
