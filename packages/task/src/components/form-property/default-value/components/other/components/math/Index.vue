<script setup>
import { ref } from 'vue'
import FixedComp from '../../../FixedComp.vue'
import EditorDialog from './components/EditorDialog.vue'
import ExpressionComp from './components/Expression.vue'

const model = defineModel({
  default() {
    return {
      value: [],
      tofix: 2,
    }
  },
})

if (!model.value?.value) {
  model.value = {
    value: [],
    tofix: 2,
  }
}

const show_editor = ref(false)
function handleClick() {
  show_editor.value = true
}
</script>

<template>
  <div class="w-full">
    <div class="default-wrapper" @click="handleClick">
      <expression-comp v-if="model.value && model.value.length > 0" :data="model.value" class="p-1" />
      <span v-else class="placeholdet-item">点击编辑公式</span>
    </div>
    <fixed-comp v-model="model.tofix" class="mt-2" />
    <editor-dialog v-model="show_editor" v-model:exp="model.value" />
  </div>
</template>

<style lang='scss' scoped>
@import '../../../common.scss';

.default-wrapper {
  cursor: pointer;
}

.placeholdet-item {
  color: lightgray;
  min-height: 32px;
}
</style>
