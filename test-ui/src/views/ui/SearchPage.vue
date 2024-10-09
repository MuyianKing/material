<script setup>
import { HlSearchPage } from '@ui'
import { ElButton, ElFormItem, ElInput } from 'element-plus'
</script>

<template>
  <hl-search-page fixed-button>
    <template #header>
      <el-form-item label="测试">
        <el-input placeholder="请输入" />
      </el-form-item>

      <el-button type="danger">
        查询
      </el-button>
    </template>
    <template #button>
      <el-button type="primary">
        test
      </el-button>
    </template>
  </hl-search-page>
</template>

<style lang='scss' scoped></style>
