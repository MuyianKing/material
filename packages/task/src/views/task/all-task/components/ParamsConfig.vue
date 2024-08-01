<script setup>
import { ref, watch } from 'vue'
import { HlButton, HlFormDialog } from '@hl/ui'
import { getTaskBenchesParams, setBenchesParams } from '../../../../server'
import FieldTree from './FieldTree.vue'

const emits = defineEmits(['refresh'])

const show = ref(false)

const default_checked_keys = ref([])
function getConfigParams() {
  getTaskBenchesParams().then((data) => {
    default_checked_keys.value = data.map(item => item.item)
  }).catch((e) => {
    hl.message.error(e, '获取参数配置失败')
  })
}

// 提交
const tree_ref = ref()
function submit() {
  hl.message.loading('提交中...')
  setBenchesParams(tree_ref.value.getChecked()).then(() => {
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
    <field-tree ref="tree_ref" :default-checked-keys="default_checked_keys" />
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
