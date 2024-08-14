<script setup>
import useButton from '../../hooks/useButton'
import ButtonComp from '../button/Index.vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'icon-park-outline:find',
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

const { _text } = useButton(props, '查看')
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
