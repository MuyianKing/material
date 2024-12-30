<script setup>
import { HlButton, HlDialog } from '@hl/ui'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <div>
    <hl-button @click="show = true">
      测试
    </hl-button>
    <hl-dialog v-model="show" top="10px" width="700px" style="--padding: 0;">
      <div style="height: 200vh;">
        test
      </div>

      <template #footer>
        <hl-button>提交</hl-button>
      </template>
    </hl-dialog>
  </div>
</template>

<style lang='scss' scoped>
</style>
