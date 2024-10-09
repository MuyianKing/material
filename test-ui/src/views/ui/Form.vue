<script setup>
import HlFormItem from '@hl/ui/src/components/form-item'
import HlInput from '@hl/ui/src/components/input'
import { ElForm } from 'element-plus'

import { reactive } from 'vue'

const model = reactive({
  name: '',
})
</script>

<template>
  <div class="p-4">
    <el-form :model="model">
      <hl-form-item label="姓名" prop="name" required phone>
        <hl-input v-model="model.name" />
      </hl-form-item>
    </el-form>
  </div>
</template>

<style lang='scss' scoped></style>
