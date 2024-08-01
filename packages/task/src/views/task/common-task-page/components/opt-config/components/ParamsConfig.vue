<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import { HlButton, HlFormDialog } from '@hl/ui'

import FieldTree from '../../../../../../components/task/FieldTree.vue'
import { getQuery, setQuery } from '../../../../../../server/common.task.page'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['refresh'])

const show = ref(false)

const default_checked_keys = ref([])

function getConfigParams() {
  getQuery(props.configUuid).then((data) => {
    default_checked_keys.value = data
  }).catch((e) => {
    hl.message.error(e, '获取参数配置失败')
  })
}

// 提交
const tree_ref = ref()

function submit() {
  hl.message.loading('提交中...')
  setQuery({
    config_uuid: props.configUuid,
    items: tree_ref.value.getChecked(),
  }).then(() => {
    hl.message.success('设置成功')
    show.value = false
    emits('refresh')
  }).catch((e) => {
    hl.message.error(e, '设置失败')
  }).finally(() => {
    hl.message.closeLoading()
  })
}

watch(show, (val) => {
  if (val) {
    getConfigParams()
  }
})
</script>

<template>
  <hl-button type="success" v-bind="$attrs" @click="show = true">
    自定义条件
  </hl-button>

  <hl-form-dialog v-model="show" :model="{}" title="自定义条件" @submit="submit">
    <field-tree ref="tree_ref" :default-checked-keys="default_checked_keys" :config-uuid />
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
