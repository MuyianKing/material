<script setup>
import { HlGridLayout, useGridLayout } from '@hl/ui'
import { ref } from 'vue'

const container_ref = ref()
useGridLayout(container_ref, {
  min_width: 300,
  width: 300,
})
</script>

<template>
  <div class="grid-wrapper">
    <div ref="container_ref" class="flex-1 overflow-auto">
      <div v-for="index in 30" :key="index" class="grid-item">
        {{ index }}
      </div>
    </div>

    <hl-grid-layout :width="300" :min-width="300" class="flex-1 overflow-auto mt-4">
      <div v-for="index in 30" :key="index" class="grid-item">
        {{ index }}
      </div>
    </hl-grid-layout>
  </div>
</template>

<style lang='scss' scoped>
.grid-wrapper {
  height: calc(100% - 20px);
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.grid-item {
  height: 250px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
