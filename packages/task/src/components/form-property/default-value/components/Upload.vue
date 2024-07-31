<script setup>
const props = defineProps({
  property: {
    type: Object,
    default: null,
  },
})

const model = defineModel()

const show = ref(true)

function reloadComp() {
  const property = props.property
  // 目的：让上传组件重新渲染更新配置
  if (property.upload_multiple) {
    model.value = []
  } else {
    model.value = null
  }

  show.value = false
  nextTick(() => {
    show.value = true
  })
}

watch(() => props.property.upload_type, () => {
  reloadComp()
})

watch(() => props.property.upload_suffix, () => {
  reloadComp()
})

watch(() => props.property.upload_multiple, () => {
  reloadComp()
})

watch(() => props.property.max_count, () => {
  reloadComp()
})
</script>

<template>
  <hl-upload v-if="show" v-model="model" :type="property.upload_type" :suffix="property.upload_suffix" :multiple="property.upload_multiple" :max-count="property.max_count" />
</template>

<style lang='scss' scoped></style>
