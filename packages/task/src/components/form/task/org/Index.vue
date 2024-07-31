<script setup>
import { Organization } from '@hl/tyyh'
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
    label: '组织选择',
    // 标签宽度
    label_width: '',
    label_id: '',
    // 提示
    placeholder: '',
    outer_field: true,
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    required: false,
    multiple: false,
    org_url: '',
    data_range: 1,
    keep_level: false,
    show_type: 'cascader',
    check_strictly: true,
    all_data: false,
    mult_task: 0,
  },
  // 样式暂时没用到
  _style: {},
}

const { property } = useComponent(props, emits, self_config)
const form = defineModel({
  type: Object,
})
</script>

<template>
  <custom-editable-comp :config="config" :form="form" :mode="mode">
    <organization v-if="mode === 'text'" only-one-level :model-value="form?.[config.id]" class="w-full" readonly :multiple="property.multiple" />
    <organization v-else-if="mode === 'edit'" :placeholder="property.placeholder" class="w-full" disabled />
    <organization v-else v-model="form[config.id]" :disabled="property.disabled" :need-top="property.all_data" :url="property.org_url" :data-range="property.data_range" :comp="property.show_type" :check-strictly="property.check_strictly" :multiple="property.multiple" :placeholder="property.placeholder" :title="property.label" :keep-level="property.keep_level" class="w-full" clearable />
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped></style>
