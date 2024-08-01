<script setup>
import { computed, ref, watch } from 'vue'
import { HlIcon } from '@hl/ui'
import { ElEmpty, ElTimeline } from 'element-plus'

import { cloneDeep } from 'lodash-es'
import genFormConfig from '../../../../../hooks/genFormConfig'
import ResultItem from './components/ResultItem.vue'

const props = defineProps({
  result: {
    type: Array,
    required: true,
    default() {
      return []
    },
  },
})

const emits = defineEmits(['refresh'])

const result = ref([])
const reverse = ref(false)
const result_comp = computed(() => {
  return reverse.value ? result.value.toReversed() : result.value
})

function handleRemove(id) {
  result.value = result.value.filter(item => item.id !== id)
}

function handleRefresh() {
  emits('refresh')
}

watch(() => props.result, () => {
  result.value = cloneDeep(props.result)
  result.value.forEach((item) => {
    if (item.a_node_form && item.a_node_form.json_list) {
      item.a_node_form.form_field_list = genFormConfig(item.a_node_form.json_list)
    }
  })
}, {
  immediate: true,
})
</script>

<template>
  <div class="result-wrapper">
    <div class="result-title">
      <span class="flex-1">处置流程</span>
      <hl-icon :icon="reverse ? 'bx:sort-up' : 'bx:sort-down'" size="20px" class="cursor-pointer"
        @click="reverse = !reverse" />
    </div>
    <div class="result-content pr-1">
      <el-timeline v-if="result.length > 0" style="max-width: 600px">
        <result-item v-for="item in result_comp" :key="item.id" :data="item" :reverse="reverse" @remove="handleRemove"
          @refresh="handleRefresh" />
      </el-timeline>
      <el-empty v-else description="未提交任务内容" class="relative-center" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.result-wrapper {
  display: flex;
  flex-direction: column;
}

.result-title {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  user-select: none;
}

.result-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.el-timeline {
  padding-left: 15px;
}
</style>
