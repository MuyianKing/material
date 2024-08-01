<script setup>
import { ref } from 'vue'
import { HlButton, HlDate } from '@hl/ui'

defineProps({

})

const emits = defineEmits(['search'])

function handleSearch() {
  emits('search', {
    start: start.value,
    end: end.value,
  })
}

const start = ref('')
const end = ref('')
</script>

<template>
  <div class="flex">
    <hl-date v-model:start="start" v-model:end="end" type="range" :teleported="false" />
    <hl-button class="ml-2" @click="handleSearch">
      查询
    </hl-button>
  </div>
</template>

<style lang='scss' scoped>
</style>
