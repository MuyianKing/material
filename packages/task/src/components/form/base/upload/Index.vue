<script setup>
import { HlPreview, HlUpload } from '@hl/ui'
import CustomEditableComp from '../../basic/CustomEditableComp.vue'

import useComponent from '../../utils'

const props = defineProps({
  config: {
    type: Object,
    default() {
      return {}
    },
  },
  mode: {
    type: String,
    default: 'edit',
  },
})

const emits = defineEmits(['update:config', 'ready'])

// 自定义属性
const self_config = {
  _property_config: {
    editable: true,
    label: '附件',
    label_width: '',
    label_id: '',
    required: false,
    upload_type: ['image'],
    upload_suffix: [],
    upload_multiple: true,
    upload_minmax: true,
    phone_type: [1],
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    default_value: {
      type: 'form_upload',
      value: null,
    },
  },
  _style: {},
}

const { property } = useComponent(props, emits, self_config)

const form = defineModel({
  type: Object,
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <hl-preview v-if="mode === 'text'" :files="form?.[config.id] || []" />
    <hl-upload v-else-if="mode === 'edit'" disabled />
    <hl-upload v-else v-model="form[config.id]" :readonly="property.disabled" :type="property.upload_type" :suffix="property.upload_suffix" :multiple="property.upload_multiple" :max-count="property.max_count" />
    <slot />
  </custom-editable-comp>
</template>
