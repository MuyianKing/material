<script setup>
import { ref } from 'vue'
import { HlDropdown } from '@hl/ui'
import '@hl/ui/src/components/dropdown/Index.css'

defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['search'])

const model = ref('')

function handleSearch(value) {
  emits('search', {
    value,
  })
}
</script>

<template>
  <hl-dropdown v-model="model" all :options="config.options" :label="config.label"
    @change="(value) => handleSearch(value)" />
</template>

<style lang='scss' scoped></style>
