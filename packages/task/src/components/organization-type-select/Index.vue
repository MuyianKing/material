<script setup>
import { HlCheckbox } from '@hl/ui'

// 单位层级
import { ref } from 'vue'
import { getDwcjList } from '../../server/organization'
import '@hl/ui/src/components/checkbox/Index.css'

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
