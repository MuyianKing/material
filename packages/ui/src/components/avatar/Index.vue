<script setup>
import multiavatar from '@multiavatar/multiavatar/esm'
import { ElAvatar } from "element-plus"

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
})

const user = useUserStore()
const error = ref(false)
function handleError() {
  error.value = true
}

const svgCode = multiavatar(user.name || '用户')

// 没有图片或图片报错显示
const show_svg = computed(() => {
  return !props.src || error
})
</script>

<template>
  <el-avatar :src @error="handleError">
    <slot v-if="show_svg" name="error">
      <div class="svg-avatar" v-html="svgCode" />
    </slot>
  </el-avatar>
</template>

<style lang="scss" scoped>
.svg-avatar {
  width: 100%;
  height: 100%;
}
</style>
