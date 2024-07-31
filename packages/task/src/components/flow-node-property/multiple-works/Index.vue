<script setup>
import { is_multiple_handle } from '../../../default/flow'

const value = defineModel()
</script>

<template>
  <hl-form-item label="是否多次处置">
    <hl-radio v-model="value" :options="is_multiple_handle" />
  </hl-form-item>
</template>

<style scoped lang="scss"></style>
