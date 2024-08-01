<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { HlButton, HlDialog } from '@hl/ui'
import PreviewTemplate from '../../form/preview/Template.vue'

import { getPublishConfig } from '../../../server/config'
import { publishTask } from '../../../server'

const props = defineProps({
  configUuid: {
    type: [String],
    default: '',
  },
  width: {
    type: String,
    default: '800px',
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
    const { form } = await preview_ref.value.validate()

    hl.message.loading('正在保存...')
    await finallySubmit(form)
  } catch (e) {
    hl.message.error(e, '发布出错')
  } finally {
    hl.message.closeLoading()
  }
}

async function finallySubmit(form) {
  await publishTask({
    config_uuid: props.configUuid,
    ...form,
  })
  hl.message.success('发布成功')
  show.value = false
  emits('refresh')
}

const title = computed(() => {
  return `发布任务` + ` - ${config.value.config_name}`
})

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
  <hl-dialog v-model="show" :title top="50px" :width>
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
