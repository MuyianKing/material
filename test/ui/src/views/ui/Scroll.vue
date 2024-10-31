<script setup>
import { HlScroll } from '@hl/ui'
</script>

<template>
  <div>
    <hl-scroll direction="vertical" class="h-[300px]">
      <div v-for="item in 30" :key="item">
        hello world{{ item }}
      </div>
    </hl-scroll>
  </div>
</template>

<style lang='scss' scoped></style>
