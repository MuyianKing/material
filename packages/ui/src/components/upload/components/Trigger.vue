<script setup>
import { confirm, getMimeType, getSuffix } from '@hl/utils'
import { computed, ref, useSlots } from 'vue'
import { getAcceptType } from '../hooks/index'
import IconComp from '../../icon/Index.vue'

const props = defineProps({
  config: {
    type: Object,
    default() {
      return {}
    },
  },
  triggerType: {
    type: String,
    default: 'card',
  },
})

const emits = defineEmits(['select-file'])

const slots = useSlots()

// 已选文件数组
const files_comp = computed(() => {
  const files = props.config.files
  if (files)
    return Array.isArray(files) ? files : [files]

  return []
})

// 是否显示添加按钮
const show_add = computed(() => {
  const config = props.config

  if (config.noPreview) {
    return true
  }

  // 单选已选
  if ((!config.multiple && files_comp.value.length > 0)) {
    return false
  }

  // 多选超过范围
  return files_comp.value.length < config.maxCount
})

// 触发上传
const file_input_ref = ref()

function triggerAdd() {
  if (props.config.disabled)
    return

  file_input_ref.value.click()
}

// 选择文件
function selectMedia(e) {
  const file = e.target.files[0]
  file_input_ref.value.value = null

  if (accept_type.value !== '*/*' && !accept_type.value.includes(getMimeType(getSuffix(file.name))?.[0] || '')) {
    confirm('请不要自行选择【所有文件】，上传指定类型外的文件', {
      type: 'warning',
      buttonSize: 'large',
      confirmButtonText: '我已知晓',
      center: true,
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
    })
    return
  }

  emits('select-file', file)
}

// 文件类型
const accept_type = computed(() => getAcceptType(props.config.type, props.config.suffix))

defineExpose({
  triggerAdd,
})
</script>

<template>
  <div v-if="show_add" v-bind="$attrs" class="cursor-pointer normal-trigger hl-upload-trigger-comp" :class="{ 'trigger-item': triggerType === 'card' && !slots.trigger, 'w-full': triggerType === 'line' }" @click="triggerAdd">
    <slot name="trigger" />

    <template v-if="!slots.trigger">
      <div v-if="triggerType === 'card'">
        <icon-comp icon="bitcoin-icons:plus-outline" style="font-size: 28px;" />
      </div>
      <div v-else class="upload-icon">
        <icon-comp icon="ic:round-cloud-upload" style="font-size: 20px;" />
        <span class="ml-1 ">点击上传附件</span>
      </div>
    </template>
  </div>
  <input ref="file_input_ref" type="file" :accept="accept_type" style="display:none" @change="selectMedia">
</template>
