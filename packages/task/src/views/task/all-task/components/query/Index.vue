<script setup>
import { onMounted, ref } from 'vue'
import { HlFormItem } from '@hl/ui'
import { getTaskBenchesParams } from '../../../../../server'
import ParamsComp from '../../../../../components/task/ParamsComp.vue'

const emits = defineEmits(['search'])

const query = defineModel({
  type: Object,
  required: true,
})

const params_list = ref([])
function getData() {
  getTaskBenchesParams().then((data) => {
    params_list.value = data
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
  <hl-form-item v-for="item in params_list" :key="item.item" :label="item.name" label-width="fit">
    <params-comp v-model="query" :config="item" @search="handleSearch" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
