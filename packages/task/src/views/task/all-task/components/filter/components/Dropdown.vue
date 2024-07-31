<script setup>
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
  <hl-wj-dropdown v-model="model" all :options="config.options" :label="config.label" @change="(value) => handleSearch(value)" />
</template>

<style lang='scss' scoped>
</style>
