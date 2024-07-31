<script setup>
import { getLabelByVal } from '@hl/utils/common'
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

const self_config = {
  // 属性配置
  _property_config: {
    // 表示该组件是否需要用户输入
    editable: true,
    label: '下拉框',
    // 标签宽度
    label_width: '',
    label_id: '',
    // 提示
    placeholder: '',
    required: true,
    expand_multiple: '',
    // 是否一行显示
    one_line: false,
    source_type: '_self',
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    default_value: {
      type: 'select',
      value: '',
    },
    options: {
      is_config: true,
      default: [{
        label: '选项1',
        value: '选项1',
      }, {
        label: '选项2',
        value: '选项2',
      }],
      hide: true,
    },
  },
  _style: {},
}

const { property } = useComponent(props, emits, self_config)

const type_comp = ref('select')
watch(() => props.config, () => {
  type_comp.value = getType(property)
}, {
  deep: true,
  immediate: true,
})

// 类型
function getType() {
  const _property = property.value
  if (_property) {
    if (_property.expand && _property.multiple) {
      return 'checkbox'
    } else if (_property.expand) {
      return 'radio'
    } else {
      return 'select'
    }
  }

  return 'select'
}

const form = defineModel({
  type: Object,
})

const options = computed(() => property.value?.options || [])
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <span v-if="mode === 'text'">{{ getLabelByVal(options, form?.[config.id]) }}</span>
    <template v-else-if="mode === 'edit'">
      <hl-select v-if="type_comp === 'select'" disabled :placeholder="property.placeholder" />
      <hl-checkbox v-else-if="type_comp === 'checkbox'" disabled :options="options" :line="property.one_line" />
      <hl-radio v-else disabled :options="options" :line="property.one_line" />
    </template>
    <template v-else>
      <hl-select v-if="type_comp === 'select'" v-model="form[config.id]" :disabled="property.disabled" :placeholder="property.placeholder" :options="options" :multiple="property.multiple" />
      <hl-checkbox v-else-if="type_comp === 'checkbox'" v-model="form[config.id]" :disabled="property.disabled" :options="options" :multiple="property.multiple" :line="property.one_line" />
      <hl-radio v-else v-model="form[config.id]" :disabled="property.disabled" :options="options" />
    </template>
    <slot />
  </custom-editable-comp>
</template>
