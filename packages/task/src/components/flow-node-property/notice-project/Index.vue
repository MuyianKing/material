<script setup>
import { ProjectSelect } from '@hl/tyyh'
import { HlFormItem } from '@hl/ui'

const value = defineModel()
</script>

<template>
  <hl-form-item label="项目管理">
    <project-select v-model="value" multiple />
  </hl-form-item>
</template>

<style scoped lang="scss">

</style>
