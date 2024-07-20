<script setup>
import { getType } from '@hl/utils/es/file'
import IconComp from '../../icon/Index.vue'
import PreviewComp from '../../preview/Index.vue'

const props = defineProps({
  file: {
    type: [String, Array, Object],
    default: '',
  },
  // 展示方式 auto-自动 card-卡片形式
  listType: {
    type: String,
    default: 'auto',
  },
})

const emits = defineEmits(['delete', 're-upload'])

// 删除
function handleDel(row) {
  emits('delete', row)
}

// 重新上传
function handleChange(row) {
  emits('re-upload', row)
}

const _files = computed(() => {
  if (!props.file)
    return []

  const files = Array.isArray(props.file) ? props.file : typeof props.file === 'object' ? [props.file] : [{ path: props.file }]

  return files.map((item) => {
    return {
      ...item,
      type: getType(item.path) || getType(item.name),
    }
  })
})
</script>

<template>
  <div v-for="_file in _files" :key="_file.id" v-loading="_file.loading" class="preview-wrapper" :class="{ 'my-2': listType === 'auto', 'file-list-wrapper': listType === 'auto' && !['video', 'image'].includes(_file.type) }">
    <preview-comp :files="_file" height="100px" width="100px" no-preview :list-type />
    <div class="delete-wrapper">
      <icon-comp class="icon-close" icon="pixelarticons:trash" size="24px" @click="handleDel(_file)" />
      <icon-comp class="ml-2" icon="ri:folder-upload-line" size="24px" @click="handleChange(_file)" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.preview-wrapper {
  position: relative;
  border-radius: 5px;
  width: fit-content;
}

.file-list-wrapper {
  padding: 10px 0;
}

.file-list-wrapper:hover {
  padding: 10px;
}

.delete-wrapper {
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  color: white;
  user-select: none;
  border-radius: 5px;

  & > svg:hover {
    cursor: pointer;
    color: var(--color-primary);
  }
}

.preview-wrapper:hover {
  .delete-wrapper {
    display: flex;
  }
}

:deep(img) {
  border-radius: 5px;
}

:deep(.hl-preview-video) {
  border-radius: 5px;
}
</style>
