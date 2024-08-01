<script setup>
import { inject } from 'vue'
import { HlFormItem, HlSelect } from '@hl/ui'
import { input_type_list } from '../../../default/form'

const value = defineModel()

const { form_field_list, active_form_item } = toRefs(inject('editor_store'))

function handleChange(val) {
  for (let i = 0; i < form_field_list.value.length; i++) {
    const item = form_field_list.value[i]

    if (item.id === active_form_item.value) {
      item.id = `${item.id.replace('__i', '')}`

      // 判断是否是数字
      if (['number', 'integer'].includes(val)) {
        item.id = `${item.id}__i`
      }

      break
    }
  }
}
</script>

<template>
  <hl-form-item label="文本格式">
    <hl-select v-model="value" :options="input_type_list" @change="handleChange" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
