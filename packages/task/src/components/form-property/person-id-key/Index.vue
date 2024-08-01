<script setup>
import { HlFormItem, HlSelect } from '@hl/ui'

const options = [{
  label: '身份证号',
  value: 'id_card',
}, {
  label: '单位/职务/身份证号',
  value: 'org_job_idcard',
}]

const value = defineModel()
</script>

<template>
  <hl-form-item label="主键">
    <hl-select v-model="value" :options="options" />
  </hl-form-item>
</template>

<style scoped lang="scss">

</style>
