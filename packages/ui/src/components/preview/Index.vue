<script setup>
import { getType } from '@hl/utils/es/file'
import { ref, watch } from 'vue'
import ImageComp from '../image/Index.vue'
import VideoComp from '../video/Index.vue'
import FileComp from '../file/Index.vue'

const props = defineProps({
  files: {
    type: [Array, Object],
    default: null,
  },
  height: {
    type: String,
    default: '100px',
  },
  width: {
    type: String,
    default: '100px',
  },
  noPreview: {
    type: Boolean,
    default: false,
  },
  // 是否已卡片形式展示
  card: {
    type: Boolean,
    default: false,
  },
  noDownload: {
    type: Boolean,
    default: false,
  },
})

const _image_video = ref([])
const _not_image_video = ref([])
watch(() => props.files, (val) => {
  _image_video.value = []
  _not_image_video.value = []

  if (!val) {
    return
  }

  const file_list = Array.isArray(props.files) ? props.files : typeof props.files === 'object' ? [props.files] : [{ path: props.files }]

  file_list.forEach((item) => {
    const new_item = {
      ...item,
      type: getType(item.path) || getType(item.name),
    }

    if (new_item.type === 'image' || new_item.type === 'video') {
      _image_video.value.push(new_item)
    } else {
      _not_image_video.value.push(new_item)
    }
  })
}, {
  immediate: true,
})
</script>

<template>
  <div class="hl-preview-wrapper">
    <template v-for="item in _image_video" :key="item.id">
      <image-comp v-if="item.type === 'image'" :height :width :prefix="item.prefix" :src="item.path || item.fileName" fit="cover" class="preview-item" />
      <video-comp v-else :src="item.path" :prefix="item.prefix" :height :width controls :no-preview class="preview-item" />
    </template>
    <template v-for="item in _not_image_video" :key="item.id">
      <file-comp :file="item" class="preview-item" :card :height :width :no-download />
    </template>
  </div>
</template>
