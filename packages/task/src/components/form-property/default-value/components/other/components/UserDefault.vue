<script setup>
import { getUserValueByType } from '../../../../../../hooks/user'

defineProps({
  type: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="default-wrapper">
    {{ getUserValueByType(type) }}
  </div>
</template>

<style lang='scss' scoped>
@import '../../common.scss';
</style>
