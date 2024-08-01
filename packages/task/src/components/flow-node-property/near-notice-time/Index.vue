<script setup>
import { ref, watch } from 'vue'
import { HlFormItem, HlInput } from '@hl/ui'

const value = defineModel()

const start = ref(9)
const end = ref(18)

function handleChange(type, val) {
  value.value.near_notice_time = type === 'start' ? `${val}-${end.value}` : `${start.value}-${val}`
}

watch(() => value.value.near_notice_time, (val) => {
  console.log('near_notice_time', val)
  val = val.split('-')
  start.value = val[0] || ''
  end.value = val[1] || ''
})
</script>

<template>
  <hl-form-item v-if="value.near_type !== 0 && value.near_type.length > 0" label="通知时间">
    <div class="w-full flex">
      <hl-input :model-value="start" @input="val => handleChange('start', val)">
        <template #append>
          时
        </template>
      </hl-input>
      <span class="mx-2">~</span>
      <hl-input :model-value="end" @input="val => handleChange('end', val)">
        <template #append>
          时
        </template>
      </hl-input>
    </div>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
