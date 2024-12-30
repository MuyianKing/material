<script setup>
import { inject } from 'vue'
import useButton from '../../hooks/useButton'
import ButtonComp from '../button/Index.vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'icon-park-outline:find',
  },
  text: {
    type: [Boolean, String, undefined],
    default: undefined,
  },
})

const emits = defineEmits(['click'])

function handleClick() {
  emits('click')
}

const { tableIcon } = inject('GLOBAL_CUSTOM_CONFIG', { tableIcon: 'icon' })
const { _text, buttonType } = useButton(props, '查看', tableIcon)
</script>

<template>
  <button-comp :button-type type="primary" :icon :text="_text" @click="handleClick">
    <slot />
  </button-comp>
</template>
