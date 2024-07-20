<script setup name="HlNoData">
import img from '../assets/img/no-data.png'

const props = defineProps({
  img: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: 'auto',
  },
  width: {
    type: String,
    default: '100%',
  },
  text: {
    type: String,
    default: '没有数据',
  },
})

const src = computed(() => props.img || img)
</script>

<template>
  <div class="no-data">
    <img class="no-data-img" :src="src">
    <div class="no-data-text">
      {{ text }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.no-data {
  text-align: center;

  .no-data-img {
    width: v-bind(width);
    height: v-bind(height);
    display: inline-table;
  }

  .no-data-text {
    color: #aaa;
  }
}
</style>
