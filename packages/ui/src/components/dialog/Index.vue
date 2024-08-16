<script name="HlDialog" setup>
import { ElDialog } from 'element-plus'
import { computed, defineModel, nextTick, ref, useSlots, watch } from 'vue'

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

const model = defineModel({
  type: Boolean,
  default: false,
})
watch(model, (val) => {
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
  <el-dialog ref="dialog_ref" v-model="model" :close-on-click-modal="closeOnClickModal" :destroy-on-close="destroyOnClose"
             :style="dialog_style" append-to-body class="hl-custome-dialog"
  >
    <slot />

    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
