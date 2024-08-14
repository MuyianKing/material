<script setup>
import ButtonComp from '../button/Index.vue'

import useButton from '../../hooks/useButton'

const props = defineProps({
  icon: {
    type: String,
    default: 'uil:edit',
  },
  text: {
    type: [Boolean, String],
    default: false,
  },
})

const emits = defineEmits(['click'])

function handleClick() {
  emits('click')
}

const { _text } = useButton(props, '编辑')
</script>

<template>
  <button-comp :button-type="text ? 'text' : 'icon'" type="primary" :icon :text="_text" @click="handleClick">
    <slot />
  </button-comp>
</template>

<style lang="scss" scoped>
.hl-ui-zw {
  color: red;
}
</style>
