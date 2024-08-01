<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    },
  },
})

const emits = defineEmits(['update:modelValue'])

const formData = defineModel('formData', {
  type: Object,
})

const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})
</script>

<template>
  <component :is="item.key" v-for="(item, index) in list" :key="item.id" :model-value="formData" :config="list[index]" mode="text" />
</template>

<style lang="scss" scoped>
.editor-wrapper {
  height: 100%;
  width: 100%;
  padding: 10px;
}
</style>
