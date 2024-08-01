<script setup>
import { defineEmits, defineExpose, defineModel, defineProps, onMounted, ref } from 'vue'
import { HlFormItem } from '@hl/ui'

import { taskQueryGet } from '../../../../../server/common.task.page'
import ParamsComp from '../../../../../components/task/ParamsComp.vue'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['change'])
const query = defineModel({
  type: Object,
  default() {
    return {}
  },
})

const searchData = ref([])
async function getData() {
  try {
    searchData.value = await taskQueryGet(props.configUuid)
  } catch (e) {
    hl.message.error(e, '获取查询条件失败')
  }
}

function handleChange() {
  emits('change')
}

onMounted(() => {
  getData()
})

defineExpose({
  getData,
})
</script>

<template>
  <hl-form-item v-for="item in searchData" :key="item.item" :label="item.name">
    <params-comp v-model="query" :config="item" @search="handleChange" />
  </hl-form-item>
</template>

<style scoped lang="scss">

</style>
