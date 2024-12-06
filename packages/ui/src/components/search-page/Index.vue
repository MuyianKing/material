<script setup name="SearchPage">
import { ElForm, vLoading } from 'element-plus'
import { ref } from 'vue'
import { HlButton } from '../button'
import HlIcon from '../icon'

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
  advancedText: {
    type: String,
    default: '高级搜索',
  },
  // 不需要搜索区域
  noSearch: {
    type: Boolean,
    default: false,
  },
})

const show_advaced = ref(false)
const advance_ref = ref()
function toggleAdvanced() {
  show_advaced.value = !show_advaced.value
}
</script>

<template>
  <div class="flex flex-col h-full hl-search-page">
    <!-- 列表页代码结构组件 -->
    <el-form v-if="!noSearch" :size="formSize" :label-width="labelWidth">
      <div ref="advance_ref" class="search-area">
        <slot name="header" />
        <slot v-if="show_advaced" name="advanced" />
        <div v-if="fixedButton" class="fixed-button">
          <slot name="button" />
        </div>
        <slot v-else name="button" />
        <template v-if="$slots.advanced && advancedText">
          <hl-button button-type="text" class="advanced-btn" @click="toggleAdvanced">
            <hl-icon class="hl-search-page-arrow" icon="ep:arrow-down" :class="{ 'up-arrow': show_advaced }" />
            {{ advancedText }}
          </hl-button>
        </template>
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
