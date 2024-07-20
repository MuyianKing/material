<script setup>
import { getSuffix, getType } from '@hl/utils/es/file'
import IconComp from '../../icon/Index.vue'

const props = defineProps({
  file: {
    type: Object,
    default: null,
  },
})

const emits = defineEmits(['delete', 're-upload'])

const icon_map = {
  image: 'twemoji:framed-picture',
  video: 'vscode-icons:folder-type-video',
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

// 删除
function handleDel() {
  emits('delete')
}

// 重新上传
function handleReupload() {
  emits('re-upload')
}
</script>

<template>
  <div v-if="file" class="file-item">
    <div class="flex items-center flex-1" @click="handleReupload">
      <icon-comp :icon="icon_comp" />
      <span class="ml-1">{{ file.name }}</span>
    </div>

    <div class="flex items-center px-2 text-green-500">
      <icon-comp v-if="file.loading" class="icon-loading" icon="line-md:uploading-loop" />
      <icon-comp class="icon-success" icon="icon-park-outline:folder-success-one" style="font-size: 18px !important;" />
      <icon-comp class="icon-close" :class="{ hidden: file.loading }" icon="material-symbols-light:close" @click="handleDel" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.file-item {
  display: flex;
  align-items: center;
  padding: 0 5px;
  background-color: rgb(238, 239, 255);

  svg {
    font-size: 22px !important;
  }

  .icon-close {
    display: none;
    color: gray;
  }

  .icon-loading {
    color: var(--color-warning);
  }
}

.file-item:hover {
  color: var(--color-primary);
  cursor: pointer;

  .icon-success {
    display: none;
  }

  .icon-close {
    display: inherit;
  }
}

.hidden {
  display: none !important;
}
</style>
