<script setup>
import FieldTree from '../FieldTree.vue'
import { getHeader, setHeader } from '../../../../../../server/infoGroup'

const props = defineProps({
  infoGroupId: {
    type: [Number, String],
    required: true,
  },
})

const emits = defineEmits(['refresh'])

// 获取可配置的表头参数
const default_checked_keys = ref([])

function getHeaderConfig() {
  getHeader(props.infoGroupId).then((data) => {
    data = data.data || []
    default_checked_keys.value = data.map(item => item.item)
  }).catch((e) => {
    hl.message.error(e, '获取表头配置出错')
  })
}

const show = ref(false)

// 保存
const tree_ref = ref()

function handleSubmit() {
  hl.message.loading('保存中...')
  setHeader({
    info_group_id: props.infoGroupId,
    items: tree_ref.value.getChecked(),
  }).then(() => {
    hl.message.success('设置成功')
    show.value = false
    emits('refresh')
  }).catch((e) => {
    hl.message.error(e, '配置失败')
  }).finally(() => {
    hl.message.closeLoading()
  })
}

watch(show, (val) => {
  if (val) {
    getHeaderConfig()
  }
})
</script>

<template>
  <hl-button type="warning" @click="show = true">
    自定义表头
  </hl-button>

  <hl-form-dialog v-model="show" :model="{}" title="自定义表头" @submit="handleSubmit">
    <field-tree ref="tree_ref" :default-checked-keys="default_checked_keys" :info-group-id="infoGroupId" />
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
