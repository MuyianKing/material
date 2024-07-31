<script setup>
import storage from '@hl/utils/es/storage'
import { guid } from '@hl/utils/es/common'
import { getCurrentInstance, h, inject, onMounted, useSlots } from 'vue'
import TimeParser from '../time/Index.vue'
import IdCard from '../id-card/Index.vue'
import TelParser from '../tel/Index.vue'
import PreviewComp from '../preview/Index.vue'

defineOptions({
  name: 'HlTableColumn',
})

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  prop: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  index: {
    type: [String, Number, Function],
    default: '',
  },
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: '',
  },
  extraWidth: {
    type: Number,
    default: 0,
  },
  align: {
    type: String,
    default: '',
  },
  style: {
    type: [String, Object],
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  // 表头标签样式
  labelStyle: {
    type: [String, Object],
    default: '',
  },
  noTip: {
    type: Boolean,
    default: false,
  },
})

// 唯一id
const uuid = guid()

// 没有插槽的渲染函数
const DEFAULT_RENDER_CELL = function ({ row, index }) {
  switch (props.type) {
    // 索引
    case 'index':
      // 函数
      if (typeof props.index === 'function') {
        return props.index(index)
      }
      return props.index === '' ? (index + 1) : props.index
    case 'time':
      return h(TimeParser, { time: row[props.prop] })
    case 'id-card':
      return h(IdCard, { idCard: row[props.prop] })
    case 'tel':
      return h(TelParser, { tel: row[props.prop] })
    case 'image':
      return h(PreviewComp, { files: row[props.prop], width: '60px', height: '60px' })
    case 'file':
      return h(PreviewComp, { files: row[props.prop] })
    default:
      return (row[props.prop] === undefined || row[props.prop] === null) ? '' : row[props.prop]
  }
}

// 插槽
const slots = useSlots()
const store = inject('hlTableStore')
const instance = getCurrentInstance()

// 渲染函数
const renderCell = slots.default || DEFAULT_RENDER_CELL

// 渲染方法
function renderRow(data) {
  return renderCell(data)
}

function init() {
  let parent = instance.parent

  // 最小宽度
  let minWidth = props.minWidth
  if (minWidth && !Number.isNaN(+minWidth)) {
    minWidth += 'px'
  } else if (!minWidth) {
    const label = props.label || (props.type === 'index' ? '序号' : '')
    // 没有设置最小宽度默认设置为可以完全放下标签：仅非自定义表头有用
    minWidth = `calc(${label.length}em + ${20 + props.extraWidth}px)`
  }

  // 宽度
  let width = props.width
  if (width && !Number.isNaN(+width)) {
    width += 'px'
  }

  // 对其方式
  const textAlign = props.align || parent.props.align || 'left'
  const style = {
    textAlign,
    minWidth,
    width,
  }

  // 判断父组件是否是hl-table
  function isHlTable(parentVNode, parentNum = 1) {
    if (parentVNode.type.name !== 'HlTable') {
      if (parentNum > 3) {
        throw new Error('请将hl-table-column放在hl-table中')
      } else {
        isHlTable(parentVNode.parent, parentNum + 1)
      }
    }
    return parentVNode
  }

  parent = isHlTable(parent)

  const config = storage.get(store.value.storageKey) || []

  // 插入列
  parent.provides.hlTableStore.value.insertColumn({
    uuid,
    ...props,
    label: props.label || (props.type === 'index' ? '序号' : ''),
    className: props.className,
    noTip: props.noTip,
    style,
    tdStyle: {
      ...props.style,
      ...style,
      // 渲染过程中会把width覆盖掉，需要缓存
      orgWidth: width,
      orgMinWidth: minWidth,
    },
    thStyle: {},
    labelStyle: props.labelStyle,
    render: renderRow,
    renderHeader: slots.header || null,
    show: !props.prop || config.length === 0 || config.includes(props.prop),
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div :id="uuid" />
</template>

<style lang="scss" scoped>
.hl-ui-zw {
  color: red;
}
</style>
