<script setup>
import { onMounted } from 'vue'
import { HlFormItem } from '@hl/ui'
import { getWhere } from '../../../../../../server/infoGroup'
import ParamsComp from './ParamsComp.vue'

const props = defineProps({
  infoGroupId: {
    type: [Number, String],
    required: true,
  },
})

const emits = defineEmits(['search'])

const query = defineModel({
  type: Object,
  default: () => [],
  required: true,
})

function getData() {
  getWhere(props.infoGroupId).then((data) => {
    data = data.data || []
    query.value = data
  }).catch((e) => {
    hl.message.error(e, '获取参数配置出错')
  })
}

function handleSearch() {
  emits('search')
}

onMounted(() => {
  getData()
})

defineExpose({
  getData,
})
</script>

<template>
  <hl-form-item v-for="item in query" :key="item.item" :label="item.name" label-width="fit">
    <params-comp v-model="item.value" :config="item" @search="handleSearch" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
