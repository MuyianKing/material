<script setup>
import { HlContextMenu } from '@hl/ui'
import { ref } from 'vue'

const options = [
  {
    label: '测试1',
  },
  {
    label: '测试2',
  },
]

const context_menu_ref = ref()
function handleClick() {
  context_menu_ref.value.toggle()
}
</script>

<template>
  <div class="wrapper">
    <div class="w-[50%] h-[50%]" />
    <div class="w-[100%] h-[400px] bg-gray-200 flex items-center justify-center text-gray-500" @click.stop="handleClick">
      右击区域
    </div>
    <div class="w-[100%] h-[100%]" />
    <hl-context-menu ref="context_menu_ref" :options />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .context-menu-btn {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
