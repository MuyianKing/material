<script setup>
import { HlDate, HlResetButton } from '@hl/ui'
import { reactive, ref } from 'vue'

const date_obj = reactive({
  start: '2024-10-01',
  end: '',
})

const value = ref('')

function handleClick() {
  date_obj.start = ''
}
</script>

<template>
  <div class="p-4">
    <hl-reset-button class="mb-4" no-confirm @click="handleClick" />

    <div>
      {{ value }}
      <hl-date v-model="value" v-model:start="date_obj.start" v-model:end="date_obj.end" type="range" />
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
