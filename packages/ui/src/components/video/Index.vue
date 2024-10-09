<script setup>
import { openFullScreen } from '@hl/utils'
import { computed, inject } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: 'auto',
  },
  width: {
    type: String,
    default: '300px',
  },
  // 是否显示控制条
  controls: {
    type: Boolean,
    default: false,
  },
  // 设置视频缩放模式
  fit: {
    type: String,
    default: 'contain',
  },
  noPreview: {
    type: Boolean,
    default: false,
  },
})

const { previewFileUrl } = inject('GLOBAL_CUSTOM_CONFIG')

// 查看地址
const prev_src = computed(() => {
  if (props.src) {
    return previewFileUrl(props.src, props.prefix)
  }
  return ''
})

// 播放或暂停
function handlePlay(e) {
  if (e.target.paused) {
    e.target.play()
  } else {
    e.target.pause()
  }
}

// 全屏播放
function handleFull(e) {
  openFullScreen(e.target)
  if (e.target.paused) {
    handlePlay(e)
  }
}

const _style = computed(() => {
  return {
    height: props.height,
    width: props.width,
  }
})
</script>

<template>
  <div class="hl-video" :style="_style">
    <video v-if="prev_src" class="w-full h-full" :controls="controls && !noPreview" :src="prev_src"
           :style="{ objectFit: fit }" title="单击播放暂停，双击全屏播放" @click="handlePlay" @dblclick="handleFull"
    />
    <slot />
  </div>
</template>
