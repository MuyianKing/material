<script setup name="HlChart">
import echartsUtil from '@hl/utils/es/echarts.util'
import { guid } from '@hl/utils/es/common'
import { nextTick, onActivated, watch } from 'vue'

const props = defineProps({
  option: {
    type: Object,
    default() {
      return null
    },
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
})

const emits = defineEmits(['ready'])

const id = guid

// echart实例对象
let echart_instance = null

function init() {
  nextTick(() => {
    if (!echart_instance) {
      echart_instance = echartsUtil.init(id)
      emits('ready', echart_instance)
    }
    if (props.option) {
      echart_instance.setOption(props.option)
      echart_instance.resize()
    }
  })
}

// 获取当前图标实例对象和echarts核心
function getInstance() {
  return echart_instance
}

function setOption(option) {
  echart_instance && echart_instance.setOption(option)
}

watch(() => props.option, () => {
  init()
}, {
  immediate: true,
})

function resize() {
  echart_instance && echart_instance.resize()
}

onActivated(() => {
  resize()
})

defineExpose({
  getInstance,
  setOption,
  resize,
})
</script>

<template>
  <div :id="id" :style="{ width, height }" />
</template>
