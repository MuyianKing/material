<script setup>
import { getSuffix, getType } from '@hl/utils/es/file'
import { closeLoading, error, loading } from '@hl/utils/es/message'
import { computed, inject, nextTick, ref } from 'vue'
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
    default: 'auto',
  },
  width: {
    type: String,
    default: '300px',
  },
})

const { previewFileUrl, downloadFile } = inject('GLOBAL_CUSTOM_CONFIG')

const wavesurfer_src = ref('')

function handleDownload() {
  if ((getType(props.file.name) || getType(props.file.path)) === 'audio') {
    nextTick(() => {
      wavesurfer_src.value = previewFileUrl(props.file.path, props.file.prefix)
    })
    return
  }

  if (props.noDownload) {
    return
  }

  try {
    loading('正在打开文件...')
    downloadFile(props.file)
  } catch (e) {
    error(e, '打开文件失败')
  } finally {
    closeLoading()
  }
}

const _style = computed(() => {
  return {
    height: props.height,
    width: props.width,
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
    <div v-if="card" class="card-item" :style="_style" v-bind="$attrs" @click="handleDownload">
      <div class="flex-1-0 card-top">
        <icon-comp :icon="icon_comp" size="40" />
      </div>
      <div class="line-clamp-1 card-file-name" :title="_name">
        {{ _name }}
      </div>
    </div>

    <span v-else v-bind="$attrs" class="file-item" @click="handleDownload">
      {{ _name }}
    </span>
    <wavesurfer-comp v-model="wavesurfer_src" v-bind="$attrs" />
  </template>
</template>

<style lang="scss" scoped>
@use './Index.scss';
</style>
