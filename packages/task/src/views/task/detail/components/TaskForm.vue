<script setup>
import { defineProps } from 'vue'
import FormDetail from '../../../form/preview/Template.vue'

defineProps({
  config: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<template>
  <div class="task-form-wrapper">
    <form-detail :config="config" :form-data="modelValue" mode="text" class="h-full" />
  </div>
</template>

<style lang='scss' scoped>
.task-form-wrapper {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
