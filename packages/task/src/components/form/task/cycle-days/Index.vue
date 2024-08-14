<script setup>
import useComponent from '../../utils'
import CustomComp from '../../basic/CustomComp.vue'
import useGenerateRelative from '../../basic/hooks/show'
import CycledatModel from '../../../../model/task/cycle.day'
import CycleComp from './components/CycleComp.vue'

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
    editable: true,
    label: '循环周期',
    // 标签宽度
    label_width: '',
    label_id: '',
    show: [],
    onlyone: true,
    // 1-正常状态 2-只读
    status: 1,
    default_value: {
      is_config: true,
      hide: true,
      type: 'circle_days',
      value: {
        ...new CycledatModel(),
        startDate: '',
        startTime: '',
      },
    },
  },
}

const { property } = useComponent(props, emits, self_config, {
  id: 'circle_days',
})

const form = defineModel({
  type: Object,
})

const { show } = useGenerateRelative(form, props.config)
</script>

<template>
  <custom-comp v-if="show" :mode="mode">
    <cycle-comp v-if="mode === 'edit'" disabled />
    <cycle-comp v-else-if="mode === 'preview'" v-model="form[config.id]" :disabled="property.disabled" />
    <cycle-comp v-else :model-value="form[config.id]" text />
    <slot />
  </custom-comp>
</template>

<style lang="scss" scoped></style>
