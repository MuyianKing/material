<script setup name="HlPreviewImg">
import { ElImage, vLoading } from 'element-plus'
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
  preview: {
    type: Array,
    default() {
      return []
    },
  },
  noPreview: {
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

const { previewFileUrl } = inject('GLOBAL_CUSTOM_CONFIG', null)

// 查看地址
const prev_src = computed(() => {
  if (props.src) {
    return previewFileUrl ? previewFileUrl(props.src, props.prefix) : props.src
  }
  return ''
})

// 预览地址
const previewList = computed(() => {
  if (props.noPreview) {
    return []
  }
  return props.preview && props.preview.length > 0 ? props.preview : [prev_src.value]
})

const _style = computed(() => {
  return {
    height: props.height,
    width: props.width,
  }
})
</script>

<template>
  <div class="hl-preview-img" :style="_style">
    <el-image v-if="prev_src" :fit="fit" :preview-src-list="previewList" :src="prev_src" class="w-full h-full" preview-teleported>
      <template #placeholder>
        <div v-loading="true" class="w-full h-full" element-loading-text="加载中..." />
      </template>
    </el-image>
    <slot />
  </div>
</template>
