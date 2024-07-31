<script setup>
import { is_one_two } from '../../../default/index'

const value = defineModel()
</script>

<template>
  <hl-form-item label="跳过节假日">
    <hl-radio v-model="value" :options="is_one_two" />
  </hl-form-item>
</template>

<style scoped lang="scss"></style>
