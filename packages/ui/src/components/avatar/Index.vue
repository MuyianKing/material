<script setup>
import multiavatar from '@multiavatar/multiavatar/esm'
import { ElAvatar } from 'element-plus'
import 'element-plus/es/components/avatar/style/css'
import { computed, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 60,
  },
})

const error = ref(false)

function handleError() {
  error.value = true
}

const svgCode = computed(() => multiavatar(props.name || '用户'))

// 没有图片或图片报错显示
const show_svg = computed(() => {
  return !props.src || error
})

const _style = computed(() => {
  return {
    height: `${props.size}px`,
    width: `${props.size}px`,
  }
})
</script>

<template>
  <el-avatar :size :src @error="handleError">
    <slot v-if="show_svg" name="error">
      <div :style="_style" v-html="svgCode" />
    </slot>
  </el-avatar>
</template>
