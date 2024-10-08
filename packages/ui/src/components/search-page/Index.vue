<script setup name="SearchPage">
import { ElForm, vLoading } from 'element-plus'

defineProps({
  formSize: {
    type: String,
    default: 'default',
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fixedButton: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="flex flex-col h-full hl-search-page">
    <!-- 列表页代码结构组件 -->
    <el-form :size="formSize" :label-width="labelWidth">
      <div class="search-area">
        <slot name="header" />
        <div v-if="fixedButton" class="fixed-button">
          <slot name="button" />
        </div>
        <slot v-else name="button" />
      </div>
    </el-form>
    <div class="flex-1 bottom">
      <div v-loading="loading" class="table-body">
        <slot name="table" />
      </div>
      <div class="flex-shrink-0">
        <slot />
      </div>
    </div>
  </div>
</template>
