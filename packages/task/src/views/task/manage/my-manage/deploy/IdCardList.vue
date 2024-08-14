<script setup>
import { ref, watch } from 'vue'
import { HlButton, HlFormItem, HlIcon, HlInput } from '@hl/ui'
import { guid } from '@hl/utils/es/common'
import '@hl/ui/src/components/button/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/icon/Index.css'
import '@hl/ui/src/components/input/Index.css'

const value = defineModel()

const data = ref([])

function handleClickAdd() {
  data.value.push({ value: '', key: guid() })
}

function checkIdCard() {
  const obj = {}

  data.value.forEach((item) => {
    item.isRepeate = false

    if (typeof obj[item.value] === 'undefined') {
      obj[item.value] = 1
    } else {
      obj[item.value]++
    }
  })

  for (const i in obj) {
    if (obj[i] > 1) {
      data.value.forEach((item) => {
        if (item.value === i) {
          item.isRepeate = true
        }
      })
      return false
    }
  }

  console.log(obj)
  return true
}

const idCardRules = [
  { required: true, message: '请至少输入一个身份证号码', trigger: 'blur' },
  {
    validator: (rule, value, callback) => {
      if (!checkIdCard()) {
        return callback(new Error('身份证号码重复'))
      }
      return callback()
    },
  },
]

function handleInput() {
  if (checkIdCard()) {
    value.value = data.value.map(item => item.value).join(',')
  }
}

watch(value, (val) => {
  const _value = val || []
  const _data = Array.isArray(_value) ? _value : _value.split(',')
  data.value = _data.map(item => ({
    value: item,
    key: guid(),
  }))
}, { deep: true, immediate: true })
</script>

<template>
  <hl-form-item :rules="idCardRules">
    <div v-for="item in data" :key="item.key" class="mb-2 w-full flex">
      <hl-input v-model="item.value" @blur="handleInput" />
      <span v-if="item.isRepeate" class="text-orange-400"> *</span>
    </div>
    <hl-button type="default" @click="handleClickAdd">
      <hl-icon icon="ant-design:plus-outlined" />
    </hl-button>
  </hl-form-item>
</template>

<style lang="scss" scoped></style>
