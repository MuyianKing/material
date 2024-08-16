<script setup name="SearchPage">
import { ElForm, vLoading } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'

const props = defineProps({
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

const button_wrapper = ref()
const fixed_btn_style = ref({ width: 0, height: 0 })
onMounted(() => {
  nextTick(() => {
    if (props.fixedButton) {
      fixed_btn_style.value = {
        width: `${button_wrapper.value.clientWidth || 0}px`,
        height: `${button_wrapper.value.clientHeight || 0}px`,
      }
    }
  })
})
</script>

<template>
  <div class="flex flex-col h-full hl-search-page">
    <!-- 列表页代码结构组件 -->
    <el-form :size="formSize" :label-width="labelWidth">
      <div class="search-area">
        <slot name="header" />
        <div v-if="fixedButton" class="fixed-button">
          <div ref="button_wrapper" class="button-wrapper">
            <slot name="button" />
          </div>
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
