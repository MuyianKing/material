<script setup name="HlTableScrollBar">
import { ref } from 'vue'

const props = defineProps({
  tableId: {
    type: [String, Number],
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
})

// 设置滚动条
const show_scroll = ref(false)
// 滚动内容的高度 - 容器的高度：也就是可滚动的最大高度
let scroll_range = 0
// 滚动条
let scroll_bar_el = null
// 滚动条自身的高度
let scroll_bar_el_height = 0

let real_scroll_el = null

// 设置滚动的基本参数
function setScroll() {
  const table_el = document.getElementById(props.tableId)

  if (!table_el) {
    return
  }

  if (!real_scroll_el) {
    real_scroll_el = table_el.querySelector(`.body-wrapper`)
  }

  const body_wrapper_height = real_scroll_el.clientHeight
  const body_height = table_el.querySelector('.hl-table-body').clientHeight
  show_scroll.value = body_height > body_wrapper_height

  scroll_range = body_height - body_wrapper_height
  scroll_bar_el = null
  scroll_bar_el_height = 0
}

// 滚动事件
function scrollBar() {
  const table_el = document.getElementById(props.tableId)

  if (!table_el) {
    return
  }

  if (show_scroll.value) {
    if (!scroll_bar_el) {
      real_scroll_el = table_el.querySelector(`.body-wrapper`)
      scroll_bar_el = table_el.querySelector('.scroll-bar')
      scroll_bar_el_height = scroll_bar_el.clientHeight
    }

    const percent = real_scroll_el.scrollTop / scroll_range
    if (percent <= 1) {
      scroll_bar_el.style.top = `calc(${percent * 100}% + ${(scroll_range - scroll_bar_el_height) * percent}px)`
    }
  }
}

defineExpose({
  setScroll,
  scrollBar,
})
</script>

<template>
  <div v-if="show_scroll" class="hl-table-scroll-bar" :class="{ active }" />
</template>
