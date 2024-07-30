<script setup>
import { useEventListener } from "@vueuse/core"

const props = defineProps({
  // 是否开启自动滚动
  auto: {
    type: Boolean,
    default: false,
  },
  // 自动滚动每次只滚动一个元素，间隔interval后再次滚动，单位毫秒，0一直滚动
  interval: {
    type: Number,
    default: 0,
  },
  // 滚动一个元素所需事件单位秒
  speed: {
    type: Number,
    default: 1,
  },
  hoverStop: {
    type: Boolean,
    default: true,
  },
  // 滚动方向：vertical：垂直  horizontal-水平
  direction: {
    type: String,
    default: 'horizontal',
  },
})

const outer_ref = ref()
const inner_ref = ref()

let max_translate = 0
onMounted(() => {
  // 计算可滚动最大值
  if (props.direction === 'vertical') {
    max_translate = -(outer_ref.value.scrollHeight - outer_ref.value.clientHeight)
  } else {
    max_translate = -(outer_ref.value.scrollWidth - outer_ref.value.clientWidth)
  }
})

// 最近一次鼠标移动的client值
let last_move_client = 0
let translate = 0
function handleMove(e) {
  // 计算出当前的偏移量：往左负数，往右正数
  const client_offset = props.direction === 'vertical' ? e.clientY : e.clientX
  const move_offset = last_move_client === 0 ? 1 : client_offset - last_move_client
  last_move_client = client_offset

  translate = translate + move_offset

  // 往左移超过最大值
  if (translate < max_translate) {
    translate = max_translate
  } else if (translate > 0) {
    // 往右移到开始位置了
    translate = 0
  }

  const _transtion = props.direction === 'vertical' ? 'translateY' : 'translateX'

  inner_ref.value.style.transform = `${_transtion}(${translate}px)`
}

// 绑定鼠标移动事件
function bindMousemove() {
  last_move_client = 0
  inner_ref.value.style['user-select'] = 'none'
  outer_ref.value.addEventListener('mousemove', handleMove)
}

// 取消鼠标移动事件
function unbindMousemove() {
  inner_ref.value.style['user-select'] = ''
  outer_ref.value.removeEventListener('mousemove', handleMove)
}

let scroll_translate_x = 0
let timeout_flg = 0
let current_index = 0
let direct = 1
let start_time = 0
function scrollFun() {
  timeout_flg = setTimeout(() => {
    if (!inner_ref.value) {
      scrollFun()
      return
    }
    setTransform()
    scrollFun()
  }, props.interval || props.speed * 1000)
}

function setTransform() {
  if (!inner_ref.value) {
    return
  }
  // 计算移动的值：元素width+margin
  const children = inner_ref.value.children
  scroll_translate_x -= getTranstionOffset(children[current_index]) * direct

  const _transtion = props.direction === 'vertical' ? 'translateY' : 'translateX'
  start_time = Date.now()
  inner_ref.value.style.transform = `${_transtion}(${scroll_translate_x}px)`

  current_index += direct
  // 向左滚动到头了
  if (direct === 1 && scroll_translate_x <= max_translate) {
    direct = -1
  } else if (direct === -1 && scroll_translate_x >= 0) {
    direct = 1
  }
}

function getTranstionOffset(dom) {
  if (props.direction === 'vertical') {
    return (dom.clientHeight + getMargin(dom, props.direction))
  } else {
    return (dom.clientWidth + getMargin(dom, props.direction))
  }
}

/**
 * 获取dom两侧的margin和
 * @param {Node} dom 元素
 * @param {string} dir 方向 vertical：垂直  horizontal-水平
 */
function getMargin(dom, dir) {
  const style = getComputedStyle(dom)

  if (dir === 'vertical') {
    return Number.parseFloat(style['margin-top'].replace('px', '')) + Number.parseFloat(style['margin-bottom'].replace('px', ''))
  }
  return Number.parseFloat(style['margin-left'].replace('px', '')) + Number.parseFloat(style['margin-right'].replace('px', ''))
}

// 开启手动
function initNotAuto() {
  // 鼠标进入开启mousemove事件
  useEventListener(outer_ref.value, 'mousedown', bindMousemove)

  // 鼠标离开或者mouseup取消mousemove事件
  useEventListener(outer_ref.value, 'mouseleave', unbindMousemove)
  useEventListener(outer_ref.value, 'mouseup', unbindMousemove)
}

// 自动滚动事件
function initAutoEvent() {
  if (props.hoverStop) {
    // 鼠标进入停止动画
    useEventListener(outer_ref.value, 'mouseenter', () => switchAnimation(false))
    // 鼠标离开停止动画
    useEventListener(outer_ref.value, 'mouseleave', () => switchAnimation(true))
  }
}

/**
 * 初始化
 */
function init() {
  nextTick(() => {
    if (props.auto) {
      // 开启过渡
      inner_ref.value.style.transition = `all linear ${props.speed}s`
      initAutoEvent()
    } else {
      initNotAuto()
    }

    // tab不可见时将动画暂停，下次进来再开启
    let last_visible = 'visible'
    setInterval(() => {
      const visible = document.visibilityState
      if (last_visible !== visible) {
        switchAnimation(visible === 'visible')
        last_visible = visible
      }
    }, 1000)
  })
}

/**
 * 当页面不可见时应该将动画暂停，下次进来再开启
 */
function handleVisible({ visible }) {
  nextTick(() => {
    switchAnimation(visible)
  })
}

/**
 * 切换状态
 * @param {boolean} visible 显示还是隐藏
 */
function switchAnimation(visible) {
  if (!visible) {
    timeout_flg && clearTimeout(timeout_flg)

    // 如果是连续滚动直接打断当前动画
    if (!props.interval && inner_ref.value && inner_ref.value.children[current_index]) {
      // 去掉过渡
      inner_ref.value.style.transition = ''

      // ----------下面代码是解决抖动问题-------------//
      // 当前元素高度
      const height = props.direction === 'vertical' ? inner_ref.value.children[current_index].clientHeight : inner_ref.value.children[current_index].clientWidth
      // 还没有滚动的高度 = height - 理论上从开始动画到现在应该滚动的高度
      const remind_height = height - height * (Date.now() - start_time) / props.speed / 1000
      if (inner_ref.value.style.transform) {
        const _transtion = props.direction === 'vertical' ? 'translateY' : 'translateX'
        // 重新设置transform
        inner_ref.value.style.transform = `${_transtion}(${(+inner_ref.value.style.transform.split('(')[1].split('px)')[0]) + remind_height}px)`
        // 减去还没滚动的距离
        scroll_translate_x += remind_height
      }
      // ----------------------------------------//
    }
  } else {
    if (inner_ref.value) {
      inner_ref.value.style.transition = `all linear ${props.speed}s`
    }
    setTransform()
    scrollFun()
  }
}

const _style = computed(() => ({
  'flex-direction': props.direction === 'vertical' ? 'column' : '',
}))

onMounted(() => {
  init()
})
</script>

<template>
  <div ref="outer_ref" v-visible="handleVisible" class="mouse-move">
    <div ref="inner_ref" class="move-container" :style="_style">
      <slot />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.mouse-move {
  overflow: hidden;

  .move-container {
    width: 100%;
    height: 100%;
    display: flex;
    cursor: move;
  }

  :deep(.move-container > div) {
    flex-shrink: 0;
  }
}
</style>
