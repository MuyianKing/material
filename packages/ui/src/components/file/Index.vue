<script setup>
import { computed, inject, nextTick, ref } from 'vue'
import { getSuffix, getType } from '@hl/utils'
import { closeLoading, error, loading } from '../../utils/message'
import WavesurferComp from '../wavesurfer/Index.vue'
import IconComp from '../icon/Index.vue'

const props = defineProps({
  file: {
    type: Object,
    default() {
      return null
    },
  },
  noDownload: {
    type: Boolean,
    default: false,
  },
  card: {
    type: Boolean,
    default: false,
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

const { previewFileUrl, downloadFile } = inject('GLOBAL_CUSTOM_CONFIG', {})

const wavesurfer_src = ref('')

function handleDownload() {
  if ((getType(props.file.name) || getType(props.file.path)) === 'audio') {
    nextTick(() => {
      wavesurfer_src.value = previewFileUrl ? previewFileUrl(props.file.path, props.file.prefix) : props.file.path
    })
    return
  }

  if (props.noDownload) {
    return
  }

  try {
    loading('正在打开文件...')
    downloadFile && downloadFile(props.file)
  } catch (e) {
    error(e, '打开文件失败')
  } finally {
    closeLoading()
  }
}

const _style = computed(() => {
  return {
    height: props.height || (props.card ? '100px' : ''),
    width: props.width || (props.card ? '100px' : ''),
  }
})

const icon_map = {
  audio: 'vscode-icons:folder-type-audio-opened',
  xls: 'vscode-icons:file-type-excel',
  xlsx: 'vscode-icons:file-type-excel',
  ppt: 'vscode-icons:file-type-powerpoint',
  pptx: 'vscode-icons:file-type-powerpoint',
  file: 'vscode-icons:file-type-word',
}

const icon_comp = computed(() => {
  return icon_map[getSuffix(props.file?.name)] || icon_map[getType(props.file?.name)]
})

const _name = computed(() => {
  return props.file.org_name || props.file.fileName || props.file.name
})
</script>

<template>
  <template v-if="file && file.name">
    <div v-if="card" class="hl-file-card-item" :style="_style" v-bind="$attrs" @click="handleDownload">
      <div class="flex-1-0 card-top">
        <icon-comp :icon="icon_comp" size="40" />
      </div>
      <div class="line-clamp-1 card-file-name" :title="_name">
        {{ _name }}
      </div>
    </div>

    <span v-else v-bind="$attrs" class="hl-file-item" @click="handleDownload">
      {{ _name }}
    </span>
    <wavesurfer-comp v-model="wavesurfer_src" v-bind="$attrs" />
  </template>
</template>
