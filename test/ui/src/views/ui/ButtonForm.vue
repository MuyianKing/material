<script setup>
import { HlButtonForm, HlEditButton, HlFormItem, HlInput } from '@hl/ui'
import { ref } from 'vue'

const form = ref(null)
function handleClick() {

}
</script>

<template>
  <div class="w-full h-full p-4">
    <hl-button-form title="新增" :model="form">
      <hl-edit-button @click="handleClick" />

      <template #form>
        <hl-form-item label="姓名">
          <hl-input />
        </hl-form-item>
      </template>
    </hl-button-form>
  </div>
</template>

<style lang='scss' scoped></style>
