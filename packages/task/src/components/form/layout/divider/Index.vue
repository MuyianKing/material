<script setup>
import { getCanUseValue } from '@hl/utils/es/common'
import { computed, nextTick, onMounted } from 'vue'
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
    label: '标题',
    align: 'left',
    divider_style: 'solid',
    show: {
      default: [],
      hide: true,
    },
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

const _style = computed(() => ({
  height: getCanUseValue(props.config._style?.height),
  minHeight: getCanUseValue(props.config._style?.minHeight),
}))
</script>

<template>
  <custom-comp :mode="mode" class="flex-wrapper" :class="{ 'edit-panel': mode === 'edit' }">
    <el-divider :style="_style" :content-position="config._property?.align" :border-style="config._property?.divider_style">
      {{ config._property?.label }}
    </el-divider>
    <slot />
  </custom-comp>
</template>

<style lang="scss" scoped>
.flex-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}

.edit-panel {
  &.flex-wrapper {
    margin-bottom: 10px;
    padding: 10px;
  }
}
</style>
