<script setup>
const formData = defineModel('formData', {
  type: Object,
})

const list = defineModel({
  type: Array,
  default() {
    return []
  },
})
</script>

<template>
  <div>
    <component :is="item.key" v-for="(item, index) in list" :key="item.id" v-model="formData" v-model:config="list[index]" mode="preview" />
  </div>
</template>

<style lang="scss" scoped>
.editor-wrapper {
  height: 100%;
  width: 100%;
  padding: 10px;
}
</style>
