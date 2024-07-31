<script setup>
import { HlQuestionIcon } from '@hl/ui'
import { true_false } from '../../../default/index'

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
