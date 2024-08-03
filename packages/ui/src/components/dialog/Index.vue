<script name="HlDialog" setup>
import { ElDialog } from 'element-plus'
import 'element-plus/es/components/dialog/style/css'
import { computed, nextTick, ref, useAttrs, useSlots, watch } from 'vue'

const props = defineProps({
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  top: {
    type: [String, Number],
    default: 150,
  },
  height: {
    type: String,
    default: '',
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
})

const slots = useSlots()

const dialog_ref = ref('')

// 内容区域的最大高度：默认内容超出，标题和底部不动，内容区域出现滚动条
function setMaxHeight() {
  nextTick(() => {
    const $el = dialog_ref.value.dialogContentRef.$el

    // 标题
    const header = $el.querySelector('.el-dialog__header').clientHeight

    // 底部
    const footer = slots.footer ? $el.querySelector('.el-dialog__footer')?.clientHeight || 72 : 0

    // 弹框距离可视区域顶部的距离
    const offsetTop = $el.offsetTop

    if (props.height) {
      console.log($el.querySelector('.el-dialog__body').style.height = `calc(${props.height} - ${header + footer}px)`)

      $el.querySelector('.el-dialog__body').style.height = `calc(${props.height} - ${header + footer}px)`
    } else {
      $el.querySelector('.el-dialog__body').style.maxHeight = `calc(100vh - ${header + 2 * offsetTop + footer}px)`
    }
  })
}

// 弹框距离顶部的距离
const top_comp = computed(() => {
  let top = '10px'

  if (props.top) {
    // 百分比等
    if (Number.isNaN(+props.top)) {
      top = props.top === 'auto' ? '' : props.top
    } else {
      // 数字
      top = `${props.top}px`
    }
  }

  return top
})

const $attrs = useAttrs()
watch(() => $attrs.modelValue, (val) => {
  if (val) {
    nextTick(() => {
      setMaxHeight()
    })
  }
}, {
  immediate: true,
})

// 当设置了top，需要设置margin-top为0，否则不生效
const dialog_style = computed(() => {
  return {
    marginTop: top_comp.value ? 0 : '',
    top: top_comp.value,
    height: props.height,
  }
})

defineExpose({
  setMaxHeight,
})
</script>

<template>
  <el-dialog ref="dialog_ref" :close-on-click-modal="closeOnClickModal" :destroy-on-close="destroyOnClose"
             :style="dialog_style" append-to-body class="hl-custome-dialog"
  >
    <slot />

    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.hl-custome-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: fit-content;
  padding: 0;

  .el-dialog__header {
    padding: 12px 25px !important;
    background-color: #e8f0ff;
    margin-right: 0 !important;
    min-height: 48px;

    .el-dialog__title {
      font-size: 16px !important;
      font-weight: bold;
    }

    .el-dialog__headerbtn {
      top: 2px;
      height: 48px;
      font-size: 24px;

      .el-dialog__close {
        color: gray;
      }
    }
  }

  .el-dialog__body {
    overflow-y: auto;
    padding: 10px 20px !important;
  }

  .el-dialog__footer {
    border-top: 1px solid #d2dff4;
    padding: 20px !important;
  }
}
</style>
