<script setup>
import FieldItem from './FieldItem.vue'

defineProps({
  data: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="content">
    <template v-for="(item, index) in data" :key="`${item}${index}`">
      <field-item v-if="item.label" :field="item" />
      <div v-else class="num-item">
        {{ item }}
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: fit-content;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;

  & > .num-item {
    height: 26px;
    line-height: 26px;
    margin: 0 2px;
  }
}
</style>
