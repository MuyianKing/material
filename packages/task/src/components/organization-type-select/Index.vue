<script setup>
// 单位层级
import { getDwcjList } from '../../server/organization'

const value = defineModel({
  type: Array,
  default() {
    return []
  },
})

const options = ref([])

function getData() {
  getDwcjList().then((data) => {
    options.value = data
    options.value.push({
      label: '用户单位',
      value: 9,
    })
  }).catch((e) => {
    hl.message.error(e, '获取单位层级出错')
  })
}

getData()
</script>

<template>
  <hl-checkbox v-model="value" :options="options" />
</template>

<style lang='scss' scoped></style>
