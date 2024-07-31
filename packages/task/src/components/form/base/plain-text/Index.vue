<script setup>
import { getCanUseValue } from '@hl/utils/common'
import CustomComp from '../../basic/CustomComp.vue'

import { generatePropertyByConfig } from '../../utils'

const props = defineProps({
  config: {
    type: Object,
    default() {
      return null
    },
  },
  mode: {
    type: String,
    default: 'edit',
  },
})

const emits = defineEmits(['update:config', 'ready'])

const self_config = {
  deleteBottom: '0px',
  _property_config: {
    label: '纯文本',
    label_id: '',
    font_size: 14,
    text_indent: 0,
    align: 'left',
    font_weight: false,
    font_italic: false,
    text_color: '#333',
    bg_color: '',
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    show: [],
  },
  // 样式
  _style: {},
}

onMounted(() => {
  emits('update:config', generatePropertyByConfig(self_config, props.config))

  nextTick(() => {
    emits('ready')
  })
})

const _style = computed(() => {
  const _property = props.config._property || {}
  return {
    height: getCanUseValue(props.config._style?.height),
    minHeight: getCanUseValue(props.config._style?.minHeight),
    textAlign: _property.align,
    color: _property.text_color,
    backgroundColor: _property.bg_color,
    fontSize: `${_property.font_size}px`,
    fontWeight: _property.font_weight ? 'bold' : 'normal',
    fontStyle: _property.font_italic ? 'italic' : 'normal',
    textIndent: `${_property.text_indent}px`,
    padding: `${_property.padding?.top}px ${_property.padding?.right}px ${_property.padding?.bottom}px ${_property.padding?.left}px`,
  }
})
</script>

<template>
  <custom-comp :class="{ 'edit-panel': mode === 'edit' }" :mode="mode" class="flex-wrapper">
    <div :style="_style" class="w-full">
      {{ config._property?.label }}
    </div>
    <slot />
  </custom-comp>
</template>

<style lang="scss" scoped>
.flex-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;

  .column-item {
    flex: 1;
    min-width: 0;
    flex-basis: 0;
    overflow: auto;
    margin: 0 5px;
  }
}

.edit-panel {
  &.flex-wrapper {
    margin-bottom: 10px;
    padding: 10px;
  }

  .column-item {
    background-color: #f7f7f7;
    border: 1px dashed #c7c7c7;
    margin: 5px;
  }
}
</style>
