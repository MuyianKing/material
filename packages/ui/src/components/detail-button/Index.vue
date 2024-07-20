<script setup>
import ButtonComp from '../button/Index.vue'

defineProps({
  icon: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '查看',
  },
})
</script>

<template>
  <button-comp icon="icon-park-outline:find" :text="text" :show-icon="icon" button-type="icon" />
</template>

<style lang="scss" scoped></style>
