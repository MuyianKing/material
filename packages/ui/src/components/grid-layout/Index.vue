<script setup>
import { ref } from 'vue'
import useGridLayout from './useGridLayout'

const props = defineProps({
  // item的宽度：当剩余的宽度小于width/2，列数向下取整，否则向上取整
  width: {
    type: Number,
    required: true,
  },
  // 当确定的列数后，如果宽度小于min-width，列数加一
  minWidth: {
    type: Number,
    default: 0,
  },
  gap: {
    type: Number,
    default: 10,
  },
  rowGap: {
    type: Number,
    default: 10,
  },
  columnGap: {
    type: Number,
    default: 10,
  },
})

/**
 * 1、grid 布局
 * 2、参数  width-必传
 * 3、第一步计算容器可使用的宽度
 * 4、第二步通过width计算出列数和行数
 */
const container_ref = ref()
function initConfig() {
  useGridLayout(container_ref, {
    row_gap: props.rowGap || props.gap || props.columnGap || 10,
    column_gap: props.columnGap || props.gap || props.rowGap || 10,
    min_width: props.minWidth,
    width: props.width,
  })
}

initConfig()
</script>

<template>
  <div ref="container_ref" class="grid-layout">
    <slot />
  </div>
</template>
