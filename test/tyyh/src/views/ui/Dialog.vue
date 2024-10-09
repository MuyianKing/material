<script setup>
import HlButton from '@ui/button/Index.vue'
import { ref } from 'vue'

import HlFormDialog from '@ui/form-dialog/Index.vue'

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
