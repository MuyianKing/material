<script name="HlPagination" setup>
import { ElPagination } from 'element-plus'
import { pageSize } from '@hl/utils'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  // 总条数
  count: {
    type: Number,
    default: 0,
  },
  // 每页个数
  size: {
    type: Number,
    default: pageSize,
  },
  sizes: {
    type: Boolean,
    default: false,
  },
  pagerCount: {
    type: Number,
    default: 7,
  },
})

// 当前页
const emits = defineEmits(['update:modelValue', 'update:size', 'change'])

function handlePageChange(val) {
  emits('update:modelValue', val)
  emits('change')
}

function handleSizeChange(val) {
  emits('update:size', val)
  emits('change')
}

const first_num = computed(() => props.size * (props.modelValue - 1) + 1)
const last_num = computed(() => (props.count > props.size * props.modelValue ? props.modelValue * props.size : props.count))

const layout = computed(() => {
  let l = 'prev, pager, next'

  if (props.sizes) {
    l = `sizes,${l}`
  }
  return l
})
</script>

<template>
  <div v-if="count" class="hl-pagination-wrapper">
    <div v-if="last_num" class="info">
      <span>共</span>
      <span class="num">{{ count }}</span>
      <span>条，当前第</span>
      <span class="num">
        {{ first_num }}
        <template v-if="first_num !== last_num">~{{ last_num }}</template>
      </span>
      <span>条</span>
    </div>
    <el-pagination :current-page="modelValue" :pager-count :layout :page-size="size" :total="count" background hide-on-single-page @update:current-page="handlePageChange" @update:page-size="handleSizeChange" />
  </div>
</template>
