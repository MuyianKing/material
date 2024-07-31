<script setup>
import { jsonparse } from '@hl/utils/common'
import CustomEditableComp from '../../basic/CustomEditableComp.vue'

import useComponent from '../../utils'
import TextComp from './components/TextComp.vue'

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
    label: '补充数据',
    label_id: '',
    label_width: '',
    placeholder: '',
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    required: false,
    rows: 2,
  },
  _style: {},
}

const { property } = useComponent(props, emits, self_config)
const form = defineModel({
  type: Object,
})

const format_data = computed(() => {
  return jsonparse(form?.value?.[props.config.id], null)
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <text-comp v-if="mode === 'text'" :data="format_data" />
    <hl-input v-else-if="mode === 'edit'" type="textarea" :rows="property.rows" disabled :placeholder="property.placeholder" />
    <hl-input v-else v-model="form[config.id]" :disabled="property.disabled" type="textarea" :rows="property.rows" show-word-limit :placeholder="property.placeholder" />
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped>
.title {
  color: #939597;
  font-size: 15px;
}

.list {
  padding-left: 10px;
  font-size: 13px;
  color: #5a85d3;
  cursor: pointer;

  .item {
    height: 28px;
  }
}
</style>
