<script setup>
import { ElFormItem } from 'element-plus'
import 'element-plus/es/components/form-item/style/css'

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
