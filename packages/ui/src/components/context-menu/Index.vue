<script setup>
import RenderMenuItem from './RenderMenuItem.jsx'
import { useMouse,useEventListener } from "@vueuse/core"

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const emits = defineEmits(['click'])

const context_item_renders = ref([])
provide('context_item_renders', context_item_renders)

const { x, y } = useMouse()
const _style = ref({
  top: 0,
  left: 0,
})

const render_ref = ref()
const show = ref(false)
let _data = null
function toggle(data) {
  if (typeof data === 'boolean') {
    show.value = data
  } else {
    _data = data
    show.value = true
  }

  if (!show.value) {
    return
  }

  nextTick(() => {
    _style.value = {
      top: `${y.value}px`,
      left: `${x.value}px`,
      width: `${render_ref.value.$el.clientWidth}px`,
      height: `${render_ref.value.$el.clientHeight}px`,
    }
  })
}

function handleSelected(index) {
  emits('click', {
    index,
    option: props.options[index],
    data: _data,
  })
  show.value = false
}

useEventListener(document, 'click', () => {
  show.value = false
})

defineExpose({
  toggle,
})
</script>

<template>
  <div v-show="show" class="context-menu" :style="_style" @click.stop>
    <div class="arrow" />

    <render-menu-item ref="render_ref" :options="options" @selected="handleSelected" />
    <slot />
  </div>
</template>

<style lang='scss' scoped>
$arrow_width: 10px;

.context-menu {
  width: fit-content;
  height: 64px;
  position: fixed;
  border-radius: 5px;
  top: 20%;
  left: 20%;
  transform: translate(-50%, calc($arrow_width / 2));
  z-index: 999999;
}

.arrow {
  width: $arrow_width;
  height: $arrow_width;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 8;
}

.arrow::before {
  content: ' ';
  position: absolute;
  width: $arrow_width;
  height: $arrow_width;
  border: 1px solid var(--el-border-color-light);
  border-bottom-color: transparent !important;
  border-right-color: transparent !important;
  background-color: #fff;
  transform: rotate(45deg);
}
</style>
