<script setup>
import { getJzzlType } from '../../../../../server/instruct'

const props = defineProps({
  typeList: {
    type: [String, Number],
    default: 0,
  },
})

const options = ref([])

function getOptions() {
  getJzzlType({
    type_list: props.typeList,
  }).then((res) => {
    options.value = res
  })
}

watch(() => props.typeList, () => {
  getOptions()
})

onMounted(() => {
  getOptions()
})
</script>

<template>
  <hl-select :options="options" />
</template>

<style lang="scss" scoped>

</style>
