<script setup>
import { defineProps } from 'vue'
import { ElFormItem } from 'element-plus/es'

defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <el-form-item label="审批状态：">
    {{ data?.pass_label }}
  </el-form-item>
  <el-form-item label="审批说明：">
    {{ data?.text }}
  </el-form-item>
</template>

<style lang='scss' scoped></style>
