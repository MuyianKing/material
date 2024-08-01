<script setup>
import { inject, watch } from 'vue'
import { ElForm } from 'element-plus'
import EditorPanelItem from '../../../../../components/form-editor/EditorPanelItem.vue'

import 'element-plus/es/components/form/style/css'

const { form_field_list, form_config } = toRefs(inject('editor_store'))

watch(form_field_list, (val) => {
  const index = val.findIndex(item => item === false)
  if (index > -1) {
    form_field_list.value.splice(index, 1)
  }
})
</script>

<template>
  <el-form :label-width="+form_config.label_width + 5">
    <editor-panel-item v-model="form_field_list" class="editor-wrapper" />
  </el-form>
</template>

<style lang="scss" scoped>
.editor-wrapper {
  padding: 10px;
  border-left: 1px solid #ebecee;
  border-right: 1px solid #ebecee;
  overflow: auto;
}
</style>
