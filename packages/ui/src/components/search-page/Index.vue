<script setup name="SearchPage">
import { ElForm, vLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/form/style/css'
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
  <div class="flex flex-col h-full search-page">
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

<style lang="scss" scoped>
.search-page {
  padding: 10px;
  padding-top: 10px;
  height: 100%;
  overflow-y: auto;

  .search-area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 5px;
    position: relative;

    & > :deep(*) {
      margin: 5px;
    }
  }

  .bottom {
    width: 100%;
    margin-top: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 0;

    .table-body {
      width: 100%;
      flex: 1;
      overflow: auto;
      padding: 10px;
      background-color: white;
    }
  }

  .fixed-button {
    height: 32px;
    overflow: hidden;

    & > .button-wrapper {
      position: absolute;
      bottom: 10px;
      right: 0;
      display: flex;
      align-items: center;
    }
  }

  .fixed-button::before {
    content: ' ';
    width: v-bind('fixed_btn_style.width');
    height: v-bind('fixed_btn_style.height');
    display: block;
    z-index: -1;
  }
}
</style>
