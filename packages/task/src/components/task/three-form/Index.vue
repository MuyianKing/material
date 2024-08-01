<script setup>
import { ref } from 'vue'
import { ElForm } from 'element-plus'
import PreviewPanelItem from '../../form-editor/PreviewPanelItem.vue'
import genFormConfig from './hooks/genFormConfig'

const props = defineProps({
  config: {
    type: Array,
    default() {
      return []
    },
  },
})

const list = ref(genFormConfig(props.config))

console.log(list)

const form_data = ref({})

const form_ref = ref()

defineExpose({
  validateForm() {
    return new Promise((resolve, reject) => {
      form_ref.value.validate(async (valid) => {
        if (valid) {
          resolve(form_data.value)
        } else {
          reject(new Error('表单校验失败'))
        }
      })
    })
  },
})
</script>

<template>
  <el-form ref="form_ref" :model="form_data">
    <preview-panel-item v-model:form-data="form_data" v-model="list" />
  </el-form>
</template>

<style scoped lang="scss"></style>
