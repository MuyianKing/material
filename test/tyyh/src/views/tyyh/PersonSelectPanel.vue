<script setup>
import PersonSelectPanel from '@hl/tyyh/src/components/person-select-panel/Index.vue'
import { ElFormItem } from 'element-plus'
</script>

<template>
  <div class="p-4">
    <person-select-panel default-org-id="320412070000" />

    <div class="mt-4">
      <el-form-item label="多选">
        <person-select-panel default-org-id="320412070000" multiple />
      </el-form-item>
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
