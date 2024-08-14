<script setup>
import { inject, toRefs } from 'vue'
import { HlFormItem, HlInput } from '@hl/ui'
import { ElForm } from 'element-plus'
import 'element-plus/es/components/form/style/css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'

const { form_config } = toRefs(inject('editor_store'))
</script>

<template>
  <el-form>
    <hl-form-item label="标签宽度">
      <hl-input v-model="form_config.label_width" type="number">
        <template #append>
          px
        </template>
      </hl-input>
    </hl-form-item>
  </el-form>
</template>
