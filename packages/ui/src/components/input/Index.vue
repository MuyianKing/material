<script setup>
import { ElInput, ElPopover } from 'element-plus'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/popover/style/css'
import { computed, getCurrentInstance, ref } from 'vue'

const props = defineProps({
  // 提示信息,不填取 请输入+父组件的label属性值
  placeholder: {
    type: String,
    default: '',
  },
  // 指引内容
  tip: {
    type: String,
    default: '',
  },
  // 指引标题，不填取父组件的label属性值
  tipLabel: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const width = ref('')
const show_tips = ref(false)
const triggerRef = ref({
  getBoundingClientRect() {
    return position.value
  },
})

// 弹框的位置
const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})

// 鼠标进入事件，如果设置了执行信息展示
function handleEnter(e) {
  const dom = e.target.parentNode
  if (props.tip) {
    const { top, left } = dom.getBoundingClientRect()

    // 计算弹框的位置
    position.value = DOMRect.fromRect({
      width: 0,
      height: 0,
      x: left + dom.clientWidth / 2,
      y: top,
    })

    // 计算提示框的宽度
    const el = instance.parent.vnode.el

    if (el) {
      width.value = dom.clientWidth
    }
    show_tips.value = true
  }
}

// 离开关闭提示信息
function handleLeave() {
  show_tips.value = false
}

const instance = getCurrentInstance()

// 提示信息
const placeholder_comp = computed(() => {
  if (props.placeholder) {
    return props.placeholder
  }

  if (instance.parent?.props?.label) {
    const label = instance.parent.props.label.replace('：', '').replace(':', '')
    return `请输入${label || ''}`
  }

  return '请输入'
})

// 指引信息
const tips_comp = computed(() => {
  const tips = []
  const label = props.tipLabel || '提示'
  if (label) {
    tips.push(`<div style="color:#feb059;width:100%;font-size:15px;font-weight:bold;"><span style="width:16px;height:16px;font-weight:600;line-height:16px;font-size:14px;border-radius:50%;background-color:#feb059;margin-right:5px;display:inline-block;text-align:center;color:white">?</span>${label}</div>`)
  }

  tips.push(`<div style="width:100%;font-size:14px;">${props.tip}</div>`)
  return tips.join('<br/>')
})

const model = defineModel()

function handleInput(val) {
  // el-input：即使type===number，modelValue类型也是string，所以这里做了一个转换
  if (props.type === 'number') {
    model.value = val === '' ? '' : +val
  } else {
    model.value = val
  }
}
</script>

<template>
  <el-input :model-value="model" :placeholder="placeholder_comp" :type="type" clearable show-word-limit v-bind="$attrs" @blur="handleLeave" @focus="handleEnter" @input="handleInput">
    <!-- 前缀 -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <!-- 后缀 -->
    <template v-if="$slots.append" #suffix>
      <slot name="append" />
    </template>
  </el-input>

  <!-- 指引信息 -->
  <el-popover :virtual-ref="triggerRef" :visible="show_tips" :width="width" placement="top" virtual-triggering>
    <div v-html="tips_comp" />
  </el-popover>
</template>

<style lang="scss" scoped>
.hl-ui-zw {
  color: red;
}
</style>
