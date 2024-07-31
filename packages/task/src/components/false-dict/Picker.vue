<script setup>
import { getList } from '../../server/false.dict'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  comp: {
    type: String,
    default: 'select',
  },
})

const model = defineModel()

const options = ref([])
async function getData() {
  try {
    options.value = await getList(props.type)
  } catch (e) {
    hl.message.error(e, '获取字典数据出错')
  }
}

getData()
</script>

<template>
  <hl-radio v-if="comp === 'radio'" v-model="model" v-bind="$attrs" :options="options" empty />
  <hl-select v-else-if="comp === 'select'" v-model="model" v-bind="$attrs" :options="options" />
  <hl-checkbox v-else-if="comp === 'checkbox'" v-model="model" v-bind="$attrs" :options="options" />
</template>

<style lang='scss' scoped></style>
