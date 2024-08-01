<script setup>
import { computed } from 'vue'
import { HlDate } from '@hl/ui'
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
    // // 表示该组件是否需要用户输入
    editable: true,
    label: '任务期限',
    // 标签宽度
    label_width: '',
    label_id: '',
    // 提示
    placeholder: '',
    outer_field: true,
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    required: {
      is_config: true,
      default: true,
      hide: true,
    },
    default_value: {
      is_config: true,
      hide: true,
      type: 'deadline',
    },
  },
  // 样式暂时没用到
  _style: {},
}

function handleChange() {
  if (!form.value) {
    return
  }
  const date = form.value[props.config.id].split(' ')
  if (date[1] === '00:00') {
    form.value[props.config.id] = `${date[0]} ` + `23:59`
  }
}

useComponent(props, emits, self_config)

const form = defineModel({
  type: Object,
})

const time_format = computed(() => {
  const time = form.value?.[props.config.id]
  return Number.isNaN(time) ? time : (`${time}`)
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <hl-date v-if="mode === 'edit'" disabled class="w-full" date-type="datetime" format="YYYY-MM-DD HH:mm" />
    <hl-date v-else-if="mode === 'preview'" v-model="form[props.config.id]" class="w-full" date-type="datetime" format="YYYY-MM-DD HH:mm" @change="handleChange" />
    <div v-else>
      {{ time_format }}
    </div>
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped></style>
