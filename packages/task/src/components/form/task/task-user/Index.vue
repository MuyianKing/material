<script setup>
import { computed } from 'vue'
import ComplexUser from '../../../../model/ComplexUser'
import ComplexControlSelect from '../../../person-complex-select/Index.vue'

import CustomEditableComp from '../../basic/CustomEditableComp.vue'
import useComponent from '../../utils'
import { hanlderIsEmpty } from '../../../../hooks/flow'

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
    label: '人员筛选',
    // 标签宽度
    label_width: '',
    label_id: '',
    // 提示
    placeholder: '',
    required: false,
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    default_value: {
      // 默认值类型
      type: 'task_user',
      // 默认值：自定义类型value就是默认值，一些类型不要value，还有一些类型value存的是配置
      value: new ComplexUser(),
    },
    outer_field: true,
  },

  // 样式暂时没用到
  _style: {},
}

const { property } = useComponent(props, emits, self_config)

const form = defineModel({
  type: Object,
})

const rules = computed(() => {
  let rule = []
  if (props.config?._property?.required) {
    rule = [{
      validator(rules, value, callback) {
        if (hanlderIsEmpty(value)) {
          callback(new Error(`请选择人员`))
        }
        callback()
      },
      trigger: 'change',
    }]
  }
  return rule
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form" :rules="rules">
    <complex-control-select v-if="mode === 'text'" :model-value="form?.[config.id]" readonly />
    <complex-control-select v-else-if="mode === 'edit'" disabled :placeholder="property.placeholder" />
    <complex-control-select v-else v-model="form[config.id]" :disabled="property.disabled" :title="property.label" :placeholder="property.placeholder" />
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped></style>
