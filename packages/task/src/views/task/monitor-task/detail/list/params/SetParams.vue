<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { HlButton, HlFormDialog } from '@hl/ui'
import { getWhere, setWhere } from '../../../../../../server/infoGroup'
import FieldTree from '../FieldTree.vue'
import '@hl/ui/src/components/button/Index.css'
import '@hl/ui/src/components/form-dialog/Index.css'

const emits = defineEmits(['refresh'])

const show = ref(false)

const route = useRoute()

const info_group_id = ref(route.params.id)
const default_checked_keys = ref([])

function getConfigParams() {
  getWhere(info_group_id.value).then((data) => {
    data = data.data || []

    default_checked_keys.value = data.map(item => item.item)
  }).catch((e) => {
    hl.message.error(e, '获取参数配置失败')
  })
}

// 提交
const tree_ref = ref()

function submit() {
  hl.message.loading('提交中...')
  const checked = tree_ref.value.getChecked()
  setWhere({
    info_group_id: info_group_id.value,
    where: checked.map(item => ({ ...item, value: '' })),
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
    <field-tree ref="tree_ref" :default-checked-keys="default_checked_keys" :info-group-id="info_group_id" />
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
