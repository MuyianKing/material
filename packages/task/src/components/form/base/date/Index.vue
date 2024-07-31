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
    label: '日期',
    label_width: '',
    label_id: '',
    date_type: 'date',
    required: true,
    date_format: '',
    is_range: false,
    editable: true,
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    default_value: {
      // 默认值类型
      type: 'datetime',
      // 默认值：自定义类型value就是默认值，一些类型不要value，还有一些类型value存的是配置
      value: 'cur_time',
    },
  },
  _style: {},
}

const { property } = useComponent(props, emits, self_config)

const _property = computed(() => {
  const _property = property.value
  return {
    type: _property?.is_range ? 'range' : 'date',
    date_type: _property?.date_type,
  }
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <span v-if="mode === 'text'">{{ form?.[config.id].replace("_", " ~ ") }}</span>
    <hl-date v-else-if="mode === 'edit'" width="auto" class="w-full" disabled :type="_property.type" :date-type="_property.date_type" :placeholder="property.placeholder" />
    <hl-date v-else v-model="form[config.id]" :disabled="property.disabled" width="auto" class="w-full" :type="_property.type" :date-type="_property.date_type" :placeholder="property.placeholder" :format="property.date_format" />
    <slot />
  </custom-editable-comp>
</template>
