<script name="HlPagination" setup>
import { ElPagination } from 'element-plus'
import { pageSize } from '@hl/utils/es/common'
import 'element-plus/es/components/pagination/style/css'
import { computed } from 'vue'

const props = defineProps({
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
  modelValue: {
    type: Number,
    default: 1,
  },
  page: {
    type: Number,
    default: 1,
  },
  pagerCount: {
    type: Number,
    default: 7,
  },
})

// 当前页
const emits = defineEmits(['update:modelValue', 'update:size', 'change', 'update:page'])

function handlePageChange(val) {
  emits('update:modelValue', val)
  emits('update:page', val)
  emits('change')
}

function handleSizeChange(val) {
  emits('update:size', val)
  emits('change')
}

const _page = computed(() => {
  return (props.page - 1) === 0 ? props.modelValue : props.page
})

const first_num = computed(() => props.size * (_page.value - 1) + 1)
const last_num = computed(() => (props.count > props.size * _page.value ? _page.value * props.size : props.count))

const layout = computed(() => {
  let l = 'prev, pager, next'

  if (props.sizes) {
    l = `sizes,${l}`
  }
  return l
})
</script>

<template>
  <div v-if="count" class="pagination-wrapper">
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
    <el-pagination :current-page="_page" :pager-count :layout :page-size="size" :total="count" background hide-on-single-page @update:current-page="handlePageChange" @update:page-size="handleSizeChange" />
  </div>
</template>

<style lang="scss" scoped>
.pagination-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .info {
    font-size: 14px;
    color: #666;

    .num {
      margin: 0 3px;
    }
  }
}
</style>
