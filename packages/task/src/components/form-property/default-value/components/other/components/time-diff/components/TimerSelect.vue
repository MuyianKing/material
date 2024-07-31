<script setup>
import { getFlatFields } from '../../../../../../../../hooks/form'

const { form_field_list, active_form_item } = toRefs(inject('editor_store'))

const model = defineModel()

const fields = computed(() => {
  return getFlatFields(form_field_list.value, {
    exclude: [active_form_item.value],
  }).map((item) => {
    return {
      value: item.id,
      label: item._property?.label,
    }
  })
})
</script>

<template>
  <hl-select v-model="model" class="w-full" :options="fields" />
</template>

<style lang='scss' scoped></style>
