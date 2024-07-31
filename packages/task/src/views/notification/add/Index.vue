<script setup>
import Notice from '../../../model/Notice'
import { createNotice } from '../../../server/notice'

const emits = defineEmits(['refresh'])

const addShow = ref(false)

const formData = ref(new Notice())

watch(addShow, (val) => {
  if (val) {
    formData.value = new Notice()
  }
})
</script>

<template>
  <hl-add-button text="添加" @click="addShow = true" />
  <hl-form-dialog v-model="addShow" :model="formData" :server="createNotice" title="添加通知通报"
                  @success="emits('refresh')"
  >
    <hl-form-item label="通知内容" required>
      <hl-input v-model="formData.title" />
    </hl-form-item>
    <hl-form-item label="附件">
      <hl-upload v-model="formData.file" type="file" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang="scss" scoped>

</style>
