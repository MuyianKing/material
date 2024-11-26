<script setup>
import HlFormItem from '@hl/ui/src/components/form-item'
import HlInput from '@hl/ui/src/components/input'
import { HlButton } from '@hl/ui'
import { ElForm } from 'element-plus'

import { reactive, ref } from 'vue'

const model = reactive({
  name: '',
  age: '',
})

const form_ref = ref()
function submit() {
  form_ref.value.validate()
}
</script>

<template>
  <div class="p-4">
    <el-form ref="form_ref" :model="model" label-width="80px">
      <hl-form-item label="姓名" prop="name" required>
        <hl-input v-model="model.name" />
      </hl-form-item>
      <hl-form-item label="年龄" prop="age" id-card>
        <hl-input v-model="model.age" />
      </hl-form-item>
    </el-form>

    <div class="text-right">
      <hl-button @click="submit">
        提交
      </hl-button>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
