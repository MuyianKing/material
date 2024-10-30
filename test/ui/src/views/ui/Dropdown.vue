<script setup>
import { HlDropdown } from '@hl/ui'
import { ref } from 'vue'
import { ElFormItem } from 'element-plus'

const options = [
  {
    label: '测试1',
    value: 1,
  },
  {
    label: '测试2',
    value: 2,
  },
]

const test = ref()
const test2 = ref()
const mul_value = ref([])
</script>

<template>
  <div class="pt-4 pl-4">
    <div class="pl-4">
      <el-form-item label="基本用法：">
        <hl-dropdown v-model="test" :options label="下拉" />
      </el-form-item>

      <el-form-item label="保持label：">
        <hl-dropdown v-model="test2" :options keep-label label="下拉" />
      </el-form-item>

      <el-form-item label="多选下拉：">
        <hl-dropdown v-model="mul_value" :options multiple label="下拉" />
      </el-form-item>
    </div>
  </div>
</template>

<style lang='scss' scoped>
:deep(.hl-dropdown) {
  margin: 5px;
}
</style>
