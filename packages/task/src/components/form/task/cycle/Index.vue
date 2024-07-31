<script setup>
import CustomEditableComp from '../../basic/CustomEditableComp.vue'

import useComponent from '../../utils'
import { task_circle_type } from '../../../../default/form'

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
  // 属性配置
  _property_config: {
    // 表示该组件是否需要用户输入
    editable: true,
    label: '是否循环',
    // 标签宽度
    label_width: '',
    label_id: '',
    // 提示
    placeholder: '',
    required: {
      is_config: true,
      default: true,
      hide: true,
    },
    source_type: {
      is_config: true,
      default: '_self',
      hide: true,
    },
    options: {
      is_config: true,
      hide: true,
      default: task_circle_type,
    },
    show: [],
    onlyone: true,
    // 1-正常状态 2-只读
    status: 1,
    default_value: {
      type: 'select',
      value: '',
    },
  },

  // 样式暂时没用到
  _style: {},
}

const { property } = useComponent(props, emits, self_config, {
  id: 'cycle',
})

const form = defineModel({
  type: Object,
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <hl-radio v-if="mode === 'edit'" disabled :options="property.options || []" />
    <hl-radio v-else v-model="form[config.id]" :disabled="property.disabled" :options="property.options || []" />
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped></style>
