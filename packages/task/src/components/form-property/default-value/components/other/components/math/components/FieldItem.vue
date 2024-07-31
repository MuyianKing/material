<script setup>
defineProps({
  field: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="field-item">
    {{ field.label }}
  </div>
</template>

<style lang='scss' scoped>
.field-item {
  padding: 0 10px;
  background-color: var(--color-primary);
  border-radius: 5px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  height: 26px;
  line-height: 26px;
}
</style>
