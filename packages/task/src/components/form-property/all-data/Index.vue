<script setup>
import { HlFormItem, HlQuestionIcon, HlRadio } from '@hl/ui'
import { true_false } from '../../../default/index'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/radio/Index.css'
import '@hl/ui/src/components/question-icon/Index.css'

const value = defineModel()
</script>

<template>
  <hl-form-item label="全量数据">
    <hl-radio v-model="value" :options="true_false" />
    <hl-question-icon class="ml-2">
      <div>否：获取当前用户所在部门及下属部门数据</div>
      <div>是：获取所有组织机构数据</div>
    </hl-question-icon>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
