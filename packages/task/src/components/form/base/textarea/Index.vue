<script setup>
import { HlInput } from '@hl/ui'
import CustomEditableComp from '../../basic/CustomEditableComp.vue'
import useComponent from '../../utils'
import '@hl/ui/src/components/input/Index.css'

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
    // 表示该组件是否需要用户输入
    editable: true,
    label: '标签名称',
    label_width: '',
    label_id: '',
    placeholder: '',
    guide: '',
    show: [],
    required: false,
    maxmin: '',
    rows: 2,
    // 1-正常状态 2-只读
    status: 1,
    default_value: {
      // 默认值类型
      type: 'custome',
      // 默认值：自定义类型value就是默认值，一些类型不要value，还有一些类型value存的是配置
      value: '',
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
    <pre v-if="mode === 'text'">{{ form?.[config.id] }}</pre>
    <hl-input v-else-if="mode === 'edit'" type="textarea" :rows="property?.rows" disabled :placeholder="property?.placeholder" />
    <hl-input v-else v-model="form[config.id]" :tip="property.guide" type="textarea" :disabled="property.disabled" :rows="property?.rows" show-word-limit :minlength="property?.min_length" :maxlength="property?.max_length" :placeholder="property?.placeholder" />
    <slot />
  </custom-editable-comp>
</template>
