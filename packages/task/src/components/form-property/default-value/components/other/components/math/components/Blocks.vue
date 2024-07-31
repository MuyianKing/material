<script setup>
defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
})

const emits = defineEmits(['click'])
</script>

<template>
  <div class="block-wrapper">
    <div v-for="item in data" :key="item" class="block-item" @click="emits('click', item)">
      {{ item }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
$color: #dcdfe6;

.block-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid $color;
  border-radius: 3px;
  user-select: none;

  .block-item {
    border-right: 1px solid $color;
    width: 38px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
  }

  .block-item:last-child {
    border-right: 0;
  }

  .block-item:hover {
    background-color: #c9dbfb;
    color: white;
  }
}
</style>
