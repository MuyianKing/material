<script setup>
import { HlButton, HlDialog } from '@ui'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <div>
    <hl-button @click="show = true">
      测试
    </hl-button>
    <hl-dialog v-model="show" top="10px" width="700px">
      <div style="height: 200vh;">
        test
      </div>
    </hl-dialog>
  </div>
</template>

<style lang='scss' scoped>
</style>
