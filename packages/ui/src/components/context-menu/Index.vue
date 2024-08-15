<script setup>
import { useEventListener, useMouse } from '@vueuse/core'
import { nextTick, provide, ref } from 'vue'
import RenderMenuItem from './RenderMenuItem.jsx'

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
