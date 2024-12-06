<script setup>
import { PersonSelectPanel } from '@hl/tyyh'
import { ElFormItem } from 'element-plus'
</script>

<template>
  <div class="p-4">
    <el-form-item label="单选" class="mt-4">
      <person-select-panel default-org-id="320412070000" />
    </el-form-item>

    <el-form-item label="多选" class="mt-4">
      <person-select-panel default-org-id="320412070000" multiple />
    </el-form-item>
  </div>
</template>

<style lang='scss' scoped>
</style>
