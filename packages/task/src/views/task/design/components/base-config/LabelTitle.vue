<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <fieldset class="pl-2">
    <legend class="label-title">
      {{ title }}
    </legend>
    <div class="pl-2">
      <slot />
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
fieldset {
  padding: 0 15px 0 20px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin-bottom: 10px;
}

.label-title {
  position: relative;
  font-size: 15px;
  font-weight: 900;
  color: #606266;
  padding: 10px;
}
</style>
