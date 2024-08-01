<script setup>
import { computed } from 'vue'
import { useEventListener } from '@vueuse/core'
import { fh } from '../../../../../../../../default/form'
import ExpressionComp from './Expression.vue'

const model = defineModel({
  type: Array,
})

function handleBack() {
  model.value.splice(model.value.length - 1)
}

function handleClear() {
  model.value = []
}

// 生成展示文本
const model_format = computed(() => {
  if (!model.value) {
    return []
  }
  const arr = []

  let p = ''
  model.value.forEach((item) => {
    // 遇到非数字：因为要把连在一起的数字作为一个数字展示 比如[1,2,3]=>123
    if (fh.includes(item) || typeof item === 'object') {
      if (p) {
        arr.push(p)
      }
      arr.push(item)
      p = ''
    } else {
      p += item
    }
  })

  // 加入最后一个数字
  if (p) {
    arr.push(p)
  }

  return arr
})

useEventListener(document, 'keyup', (e) => {
  if (e.key === 'Backspace') {
    handleBack()
  }
})
</script>

<template>
  <div class="content-wrapper">
    <div style="height: 100px;overflow-y: auto;">
      <expression-comp :data="model_format" />
    </div>

    <div class="flex items-center justify-end">
      <el-text class="mr-4 opt-btn" type="danger" size="small" @click="handleClear">
        清空
      </el-text>
      <el-text class="opt-btn" type="primary" size="small" @click="handleBack">
        退格
      </el-text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 10px;
  padding-bottom: 5px;
}

.opt-btn {
  cursor: pointer;
  user-select: none;
}

.opt-btn:hover {
  text-decoration: underline;
}
</style>
