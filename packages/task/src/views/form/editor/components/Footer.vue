<script setup>
import { inject, ref } from 'vue'
import { HlButton } from '@hl/ui'
import PreviewDialog from '../../preview/PreviewDialog.vue'
import { saveFormConfig } from '../../../../server/form'
import { validateForm } from '../../../../hooks/form'

const props = defineProps({
  // 是否是开始节点
  isStart: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['created'])

const { form_config, form_field_list, id } = toRefs(inject('editor_store'))

const show_preview = ref(false)
const preview_config = ref({
  form_config: null,
  form_field_list: [],
})

// 预览
function handlePreview() {
  preview_config.value = {
    form_config: form_config.value,
    form_field_list: form_field_list.value,
  }
  show_preview.value = true
}

// 保存
async function handleSave() {
  try {
    validateForm(form_field_list.value, {
      is_start: props.isStart,
    })

    const form_data = {
      form_config: form_config.value,
      form_field_list: form_field_list.value,
    }

    id.value && (form_data.form_id = id.value)

    const result = await saveFormConfig(form_data)
    hl.message.success('保存成功')
    emits('created', {
      form_id: result?.data.form_id,
      form_data,
    })
  } catch (error) {
    hl.message.error(error, '保存表单出错')
  }
}
</script>

<template>
  <div class="header-wrapper">
    <hl-button type="success" icon="icon-park-outline:preview-open" class="btn" @click="handlePreview">
      预览
    </hl-button>
    <hl-button icon="teenyicons:folder-tick-solid" class="btn" @click="handleSave">
      保存
    </hl-button>

    <preview-dialog v-model="show_preview" :config="preview_config" />
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  height: 50px;
  width: 100%;
  border-top: 1px solid #dcdfe6;
  position: relative;
  padding: 0 20px;
  text-align: right;
  line-height: 50px;
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
