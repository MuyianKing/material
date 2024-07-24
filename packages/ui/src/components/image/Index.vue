<script setup name="HlPreviewImg">
// import { previewFileUrl } from '@hl/utils/file'
import { ElImage } from 'element-plus'
import 'element-plus/es/components/image/style/css'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  },
  preview: {
    type: Array,
    default() {
      return []
    },
  },
  notPreview: {
    type: Boolean,
    default: false,
  },
  fit: {
    type: String,
    default: 'contain',
  },
  height: {
    type: String,
    default: '100px',
  },
  width: {
    type: String,
    default: '100px',
  },
})

function previewFileUrl() { }

// 查看地址
const prev_src = computed(() => {
  if (props.src) {
    return previewFileUrl(props.src, props.prefix)
  }
  return ''
})

// 预览地址
const previewList = computed(() => {
  if (props.notPreview) {
    return []
  }
  return props.preview && props.preview.length > 0 ? props.preview : [prev_src.value]
})
</script>

<template>
  <div class="hl-preview-img">
    <el-image v-if="prev_src" :fit="fit" :preview-src-list="previewList" :src="prev_src" class="w-full h-full" preview-teleported>
      <template #placeholder>
        <div v-loading="true" class="w-full h-full" element-loading-text="加载中..." />
      </template>
    </el-image>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.hl-preview-img {
  height: v-bind(height);
  width: v-bind(width);
  position: relative;
}
</style>
