<script setup>
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['search'])

const model = ref('')

function handleSearch() {
  emits('search', {
    value: model.value,
  })
}
</script>

<template>
  <div class="flex">
    <hl-input v-model="model" :placeholder="placeholder" />
    <hl-button class="ml-2" @click="handleSearch">
      查询
    </hl-button>
  </div>
</template>

<style lang='scss' scoped>
</style>
