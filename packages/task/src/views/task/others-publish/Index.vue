<script setup>
import { defineEmits, defineModel, defineProps, nextTick, ref, watch } from 'vue'
import { HlButton, HlDialog } from '@hl/ui'

import PreviewTemplate from '../../form/preview/Template.vue'
import { getPublishConfig } from '../../../server/config'

const props = defineProps({
  configUuid: {
    type: [String],
    default: '',
  },
  server: {
    type: Function,
    required: true,
  },
  taskType: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['refresh'])

const show = defineModel({
  type: Boolean,
  default: false,
})

const config = ref({
  form_id: '',
})

function getData() {
  config.value.form_id = ''
  getPublishConfig(props.configUuid).then((data) => {
    config.value = data
  }).catch((e) => {
    hl.message.error(e, '获取任务信息出错')
  })
}

const preview_ref = ref()

async function handleSubmit() {
  try {
    hl.message.loading('正在保存...')
    const { outer_form } = await preview_ref.value.validate()
    await finallySubmit(outer_form)
  } catch (e) {
    hl.message.error(e, '发布出错')
  } finally {
    hl.message.closeLoading()
  }
}

async function finallySubmit(form) {
  await props.server(form)
  hl.message.success('发布成功')
  show.value = false
  emits('refresh')
}

watch(show, (val) => {
  if (val) {
    nextTick(() => {
      preview_ref.value.setLoading(true)
    })
    getData()
  }
}, {
  immediate: true,
})
</script>

<template>
  <hl-dialog v-model="show" top="50px" width="900px">
    <preview-template ref="preview_ref" :form-id="config.form_id" />
    <template #footer>
      <slot name="btn-before" />
      <hl-button @click="handleSubmit">
        发布
      </hl-button>
    </template>
  </hl-dialog>
</template>

<style lang='scss' scoped></style>
