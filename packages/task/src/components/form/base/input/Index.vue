<script setup>
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

const form = defineModel()

// 自定义属性
const self_config = {
  _property_config: {
    // 表示该组件是否需要用户输入
    editable: true,
    label: '标签名称',
    label_width: '',
    label_id: '',
    placeholder: '',
    guide: '',
    show: [],
    format: '',
    required: false,
    maxmin: '',
    default_value: {
      // 默认值类型
      type: 'custome',
      // 默认值：自定义类型value就是默认值，一些类型不要value，还有一些类型value存的是配置
      value: '',
    },
    // 1-正常状态 2-只读
    status: 1,
  },
  _style: {},
}

const { property } = useComponent(props, emits, self_config)
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <span v-if="mode === 'text'">{{ form?.[config.id] }}</span>
    <hl-input v-else-if="mode === 'edit'" disabled :placeholder="property?.placeholder" />
    <hl-input v-else v-model="form[config.id]" :tip="property.guide" :disabled="property.disabled" :placeholder="property?.placeholder" :minlength="property?.min_length" :maxlength="property?.max_length" />
    <slot />
  </custom-editable-comp>
</template>
