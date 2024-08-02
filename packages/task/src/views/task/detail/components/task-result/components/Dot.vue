<script setup>
import { computed } from 'vue'
import { HlIcon } from '@hl/ui'

import '@hl/ui/src/components/icon/Index.css'

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const variables = hl.variables

const type_map = {
  unstart: {
    color: variables['color-info'],
    icon: 'mdi:restart-off',
  },
  start: {
    color: variables['color-warning'],
    icon: 'icon-park-solid:stopwatch-start',
  },
  doing: {
    color: variables['color-warning'],
    icon: 'fa6-solid:book-open-reader',
  },
  sign: {
    icon: 'ph:pen-nib-straight-fill',
    color: variables['color-success'],
  },
  audit: {
    color: variables['color-success'],
    color2: variables['color-danger'],
    icon: 'icon-park-solid:audit',
    icon2: 'healthicons:refused',
  },
  work: {
    color: variables['color-primary'],
    icon: 'material-symbols-light:folder-open-sharp',
  },
  done: {
    color: variables['color-success'],
    icon: 'ep:success-filled',
  },
  notice: {
    color: variables['color-success'],
    icon: 'ant-design:bell-filled',
  },
  yijiao_applyfor: {
    color: variables['color-warning'],
    icon: 'mdi:hand-extended-outline',
  },
  period_applyfor: {
    color: variables['color-warning'],
    icon: 'ic:baseline-more-time',
  },
  pizhu: {
    color: variables['color-warning'],
    icon: 'heroicons-outline:annotation',
  },
  error: {
    color: variables['color-danger'],
    icon: 'material-symbols:error',
  },
  deploy: {
    color: variables['color-warning'],
    icon: 'mdi:transfer',
  },
  transfer: {
    color: variables['color-warning'],
    icon: 'solar:round-transfer-horizontal-bold',
  },
  cooperate: {
    color: variables['color-success'],
    icon: 'icon-park-outline:add-user',
  },
  circle: {
    color: variables['color-warning'],
    icon: 'fluent-emoji-high-contrast:curly-loop',
  },
  zhuanpai: {
    color: variables['color-warning'],
    icon: 'carbon:send-alt-filled',
  },
  yijiao: {
    color: variables['color-success'],
    icon: 'icon-park-outline:hand-drag',
  },
  remarknode: {
    color: variables['color-success'],
    icon: 'solar:file-text-bold',
  },
}

const dot_config = computed(() => {
  const type = { ...type_map[props.data?.type] }

  if (type) {
    if (props.data?.type === 'audit') {
      if (props.data?.data?.content?.pass === 0) {
        type.color = type.color2
        type.icon = type.icon2
      }
    }
    return type
  }

  return {
    color: '',
  }
})
</script>

<template>
  <hl-icon :icon="dot_config.icon" class="dot-item" :style="{ 'background-color': dot_config.color }" />
</template>

<style lang='scss' scoped>
.dot-item {
  background-color: var(--color-warning);
  color: white;
  border-radius: 50%;
  padding: 2px;
  width: 20px;
  height: 20px;
  position: relative;
  left: -5px;
}
</style>
