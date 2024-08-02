<script setup>
import { watch } from 'vue'
import { HlFormItem, HlInput } from '@hl/ui'

import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'

const property = defineModel()

watch(() => property.value.upload_multiple, () => {
  property.value.min_count = ''
  property.value.max_count = 9999
})
</script>

<template>
  <hl-form-item v-if="property.upload_multiple" label="附件个数">
    <div class="flex">
      <hl-input v-model="property.min_count" class="flex-1" type="number" placeholder="最少上传" />
      <span class="mx-2">~</span>
      <hl-input v-model="property.max_count" class="flex-1" type="number" placeholder="最多上传" />
    </div>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
