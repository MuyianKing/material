<script setup>
import { getFlatFields } from '../../../hooks/form'

const { form_field_list } = toRefs(inject('editor_store'))
const model = defineModel()

const _orgs = computed(() => {
  const list = getFlatFields(form_field_list.value || [])
  return list.filter(item => item.key === 'FormOrg' && item._property && item._property.multiple === false).map((item) => {
    return {
      value: item.id,
      label: item._property?.label,
    }
  })
})
</script>

<template>
  <hl-form-item label="关联单位">
    <hl-select v-model="model" :options="_orgs" />
  </hl-form-item>
</template>

<style scoped lang="scss">

</style>
