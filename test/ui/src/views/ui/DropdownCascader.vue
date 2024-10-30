<script setup>
import { HlDropdownCascader } from '@hl/ui'
import { ref } from 'vue'
import { ElFormItem } from 'element-plus'

const options = [
  {
    label: '测试1',
    value: 1,
    children: [
      {
        label: '测试1-1',
        value: 11,
        children: [
          {
            label: '测试1-1-1',
            value: 111,
          },
          {
            label: '测试1-1-2',
            value: 112,
          },
        ],
      },
      {
        label: '测试1-2',
        value: 12,
      },
    ],
  },
  {
    label: '测试2',
    value: 2,
  },
]

const test = ref()
const mul_value = ref([])
</script>

<template>
  <div class="pt-4 pl-4">
    <el-form-item label="基本用法：">
      <hl-dropdown-cascader v-model="test" :options label="下拉" />
    </el-form-item>
    <el-form-item label="多选下拉：">
      <hl-dropdown-cascader v-model="mul_value" :options multiple label="下拉" no-all :cascader-props="{
        checkStrictly: false,
      }"
      />
    </el-form-item>
  </div>
</template>

<style lang='scss' scoped>
:deep(.hl-dropdown) {
  margin: 5px;
}
</style>
