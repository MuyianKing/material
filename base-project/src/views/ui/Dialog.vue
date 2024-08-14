<script setup>
import { HlButton } from '@ui'
import { ref } from 'vue'

import HlFormDialog from '@hl/ui/src/components/form-dialog/Index.vue'

const show = ref(false)
</script>

<template>
  <div>
    <hl-button @click="show = true">
      测试
    </hl-button>
    <hl-form-dialog v-model="show" top="60px" width="700px">
      <div style="height: 200vh;">
        test
      </div>
    </hl-form-dialog>
  </div>
</template>

<style lang='scss' scoped>
</style>
