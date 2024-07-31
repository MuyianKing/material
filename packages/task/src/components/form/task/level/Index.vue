<script setup>
import { getLabelByVal } from '@hl/utils/common'
import CustomEditableComp from '../../basic/CustomEditableComp.vue'

import useComponent from '../../utils'
import { task_level } from '../../../../default/form'

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
    label: '任务等级',
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
    options: task_level,
    default_value: {
      type: 'select',
      value: '',
    },
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    onlyone: true,
    outer_field: true,
  },

  // 样式暂时没用到
  _style: {},
}

const { property } = useComponent(props, emits, self_config, {
  id: 'level',
})

const form = defineModel({
  type: Object,
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <span v-if="mode === 'text'">{{ getLabelByVal(property.options || [], form?.[config.id]) }}</span>
    <hl-select v-else-if="mode === 'edit'" disabled :placeholder="property.placeholder" />
    <hl-select v-else v-model="form[config.id]" :disabled="property.disabled" :placeholder="property.placeholder" :options="property.options || []" />
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped></style>
