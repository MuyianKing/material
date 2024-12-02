<script setup>
import { ref } from 'vue'
import FormDialog from '../form-dialog/index'

const show_form_dialog = ref(false)
function handleClick() {
  console.log('click')
  show_form_dialog.value = true
}
</script>

<template>
  <span v-bind="$attrs" @click="handleClick">
    <slot />
  </span>

  <form-dialog v-if="show_form_dialog" v-model="show_form_dialog" v-bind="$attrs">
    <slot name="form" />
  </form-dialog>
</template>

<style lang="scss" scoped></style>
