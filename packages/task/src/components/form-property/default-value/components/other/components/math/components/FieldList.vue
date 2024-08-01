<script setup>
import { computed, inject } from 'vue'
import { getFlatFields } from '../../../../../../../../hooks/form'
import FieldItem from './FieldItem.vue'

const emits = defineEmits(['click'])

const { form_field_list, active_form_item } = toRefs(inject('editor_store'))

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
  <div class="form-fields">
    <field-item v-for="field in fields" :key="field.value" :field="field" @click="emits('click', field)" />
  </div>
</template>

<style lang='scss' scoped>
.form-fields {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 0.25em;
  }
}
</style>
