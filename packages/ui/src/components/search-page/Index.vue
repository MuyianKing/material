<script setup name="SearchPage">
import { ElForm, vLoading } from 'element-plus'
import { nextTick, ref } from 'vue'
import { HlButton } from '../button'

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
})

const show_advaced = ref(false)
const advance_ref = ref()
function toggleAdvanced() {
  show_advaced.value = !show_advaced.value

  if (!show_advaced.value) {
    return
  }

  nextTick(() => {
    const clientHeight = advance_ref.value.clientHeight
    advance_ref.value.style.height = 0
    setTimeout(() => {
      advance_ref.value.style.height = `${clientHeight}px`
    }, 0)
  })
}
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
        <template v-if="$slots.advanced && advancedText">
          <hl-button button-type="text" class="advanced-btn" @click="toggleAdvanced">
            {{ advancedText }}
          </hl-button>
          <div ref="advance_ref" class="w-full advanced-area" :style="{ height: show_advaced ? 'auto' : '0px' }">
            <slot name="advanced" />
          </div>
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
