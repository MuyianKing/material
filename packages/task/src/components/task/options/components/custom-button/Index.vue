<script setup>
import ThreeForm from '../../../three-form/Index.vue'

defineProps({
  customConfig: {
    type: Object,
    default: null,
  },
})

const show_form = ref(false)

function handleClick() {
  show_form.value = true
}
</script>

<template>
  <hl-button @click="handleClick">
    {{ customConfig.name }}
  </hl-button>

  <hl-dialog v-model="show_form" title="表单提交">
    <three-form :config="customConfig.format" />

    <template #footer>
      <hl-button>提交</hl-button>
    </template>
  </hl-dialog>
</template>

<style scoped lang="scss">

</style>
