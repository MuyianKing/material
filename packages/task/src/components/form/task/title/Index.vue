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

// 自定义属性
const self_config = {
  // 属性配置
  _property_config: {
    // 表示该组件是否需要用户输入
    editable: true,
    label: '任务标题',
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
    onlyone: true,
    show: [],
    // 1-正常状态 2-只读
    status: 1,
  },

  // 样式暂时没用到
  _style: {},
}

const { property } = useComponent(props, emits, self_config, {
  id: 'title',
})

const form = defineModel({
  type: Object,
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <span v-if="mode === 'text'">{{ form?.[config.id] }}</span>
    <hl-input v-else-if="mode === 'edit'" disabled :placeholder="property.placeholder" />
    <hl-input v-else v-model="form[config.id]" :disabled="property.disabled" :placeholder="property.placeholder" />
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped></style>
