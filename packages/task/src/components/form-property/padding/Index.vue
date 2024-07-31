<script setup>
const value = defineModel()
</script>

<template>
  <hl-form-item label="内边距">
    <hl-form-item class="w-1/2 mb-2" label="上" label-width="2.5em">
      <hl-input v-model="value.top" :clearable="false" type="number">
        <template #append>
          px
        </template>
      </hl-input>
    </hl-form-item>
    <hl-form-item class="w-1/2 mb-2" label="右" label-width="2.5em">
      <hl-input v-model="value.right" :clearable="false" type="number">
        <template #append>
          px
        </template>
      </hl-input>
    </hl-form-item>
    <hl-form-item class="w-1/2" label="下" label-width="2.5em">
      <hl-input v-model="value.bottom" :clearable="false" type="number">
        <template #append>
          px
        </template>
      </hl-input>
    </hl-form-item>
    <hl-form-item class="w-1/2" label="左" label-width="2.5em">
      <hl-input v-model="value.left" :clearable="false" type="number">
        <template #append>
          px
        </template>
      </hl-input>
    </hl-form-item>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
