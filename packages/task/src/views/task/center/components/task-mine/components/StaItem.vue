<script setup>
import { HlIcon } from '@hl/ui'
import '@hl/ui/src/components/icon/Index.css'

defineProps({
  config: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div v-if="config" class="sta-item">
    <div class="flex items-center">
      <hl-icon :icon="config.icon" size="26" />
      <span class="ml-2">{{ config.label }}</span>
    </div>
    <div class="count-item">
      {{ config.count }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sta-item {
  width: calc(50% - 5px);
  flex-shrink: 0;
  min-width: 0;
  border: 1px solid #d7d7d7;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;
  border-radius: 4px;
  color: #555;
  user-select: none;
  cursor: pointer;
}

.sta-item:nth-child(even) {
  margin-left: 10px;
}

.count-item {
  font-size: 18px;
}
</style>
