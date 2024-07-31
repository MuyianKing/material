<script setup>
import PreviewDialog from '../../preview/PreviewDialog.vue'
import { saveFormConfig } from '../../../../server/form'

const { form_config, form_field_list, id } = toRefs(inject('editor_store'))

const show_preview = ref(false)
function handlePreview() {
  show_preview.value = true
}

// 保存
function handleSave() {
  saveFormConfig({
    id,
    form_config: form_config.value,
    form_field_list: form_field_list.value,
  })
}
</script>

<template>
  <div class="header-wrapper">
    <div class="form-title">
      <hl-icon icon="la:edit" class="edit-icon" />
      <hl-edit-info v-model="form_config.form_name" class="ml-1" placeholder="未命名表单" />
    </div>

    <div>
      <hl-button type="success" icon="icon-park-outline:preview-open" class="btn" @click="handlePreview">
        预览
      </hl-button>
      <hl-button icon="teenyicons:folder-tick-solid" class="btn" @click="handleSave">
        保存
      </hl-button>
    </div>

    <preview-dialog v-model="show_preview" :config="{ form_config, form_field_list }" />
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #dcdfe6;
  position: relative;
  padding: 0 20px;
}

.form-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #666;

  .edit-icon {
    font-size: 22px;
    flex-shrink: 0;
  }
}

.form-title:hover {
  text-decoration: underline;
  color: var(--color-primary);
}

.btn {
  border-radius: 16px;
}
</style>
