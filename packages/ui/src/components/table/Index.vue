<script setup>
import { useDebounceFn, useEventListener } from '@vueuse/core'

import { computed, nextTick, onActivated, onMounted, onUnmounted, provide, ref, useSlots, watch } from 'vue'
import EditHeader from './EditHeader.vue'
import ScrollBar from './ScrollBar.vue'

import TableBody from './table-body'
import TableHead from './table-head'
import TableStore from './table-store'

defineOptions({
  name: 'HlTable',
})

const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
  // 开启选择
  select: {
    type: Boolean,
    default: false,
  },
  // 主键
  rowKey: {
    type: String,
    default: 'id',
  },
  // 跨页保留
  crossPage: {
    type: Boolean,
    default: true,
  },
  // 表格的最大高度：不包括表头
  maxHeight: {
    type: String,
    default: '',
  },
  // 显示和隐藏表头定制
  editHeader: {
    type: Boolean,
    default: false,
  },
  // 自定义表头的信息存储在storage，storageKey为对应的key值
  storageKey: {
    type: String,
    default: '',
  },
  // 内容不换行
  nowrap: {
    type: Boolean,
    default: false,
  },
  // 对齐方式
  align: {
    type: String,
    default: 'center',
  },
  // 鼠标放到行样式
  hover: {
    type: String,
    default: 'default',
  },
  // 是否高亮选中行
  hightLight: {
    type: Boolean,
    default: false,
  },
  // 默认高亮的行
  lightLine: {
    type: Number,
    default: 0,
  },
  // 是否根据高亮的行滚动表格让当前的高亮行始终可见
  scrollWhenLight: {
    type: Boolean,
    default: false,
  },
  // 没有数据时显示的文字
  emptyText: {
    type: String,
    default: '没有数据',
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: true,
  },
  rowClass: {
    type: Function,
    default() {
      return ''
    },
  },
  tooltipEffect: {
    type: String,
    default: 'light',
  },
  tooltopMaxWidth: {
    type: String,
    default: '50vw',
  },
  dataChangeToTop: {
    type: Boolean,
    default: true,
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:edit-header', 'row-click', 'span-click', 'update:lightLine'])

const tableId = Number.parseInt(Math.random() * 100000000, 10)

const slots = useSlots()

const store = ref(new TableStore())
provide('hlTableStore', store)

/**
 * 设置不换行后，内容会把td全部撑开，导致width、min-width失效，所以在执行doLayout之前应该取消不换行，
 * 在table自己适应宽度并且设置width、min-width后才设置不换行
 */
const refresh_layout = ref(false)
// doLayout应该在mounted并且nextTick后才执行
let ready = false
watch(() => props.data, () => {
  store.value.setData(props.data)
  store.value.setStorageKey(props.storageKey)
  // 取消不换行
  refresh_layout.value = true
  // 重新布局
  nextTick(() => {
    if (ready)
      doLayout()
  })
}, {
  immediate: true,
})

// 表头定制提交
function editSubmit() {
  // 取消不换行
  refresh_layout.value = true
  // 重新布局
  nextTick(() => {
    doLayout()
  })
}

// 根据tbody设置thead
function doLayout() {
  disconnectObserver()
  const table = document.getElementById(tableId)
  if (!table) {
    return
  }

  // 清除样式
  clearStyle()

  // 清除table的宽度
  const tbodyer = table.querySelector('.body-wrapper')
  tbodyer.style.width = ''

  // 没有数据只需要把表头和表体的宽度设为一致即可
  if (props.data.length === 0) {
    const theader = table.querySelector('.hl-table-header')
    if (theader) {
      nextTick(() => {
        tbodyer.style.width = `${theader.clientWidth}px`
        sortColumns()
      })
    }
    return
  }

  // 清除样式等待表格重新渲染
  nextTick(() => {
    // 获取第一行tr
    const tbody = table.getElementsByClassName('hl-table-body')
    if (!tbody || tbody.length === 0)
      return

    const trs = tbody[0].getElementsByClassName('hl-table-tr')

    if (trs && trs.length > 0) {
      // 获取thead的th
      const body_tds = trs[0].getElementsByClassName('hl-table-td')

      // 设置宽度
      const columns = [...store.value.columns]
      for (let i = 0, len = body_tds.length; i < len; i++) {
        // 根据uuid获取对应的配置项
        const uuid = body_tds[i].getAttribute('data-uuid')
        const column = columns.find(item => item.uuid === uuid)
        const width = `${body_tds[i].getBoundingClientRect().width}px`

        if (!column) {
          continue
        }

        // tbody 不设置maxWidth，数据会撑开td
        column.tdStyle.maxWidth = width
        column.tdStyle.width = width
        column.tdStyle.minWidth = width

        // thead
        column.thStyle.minWidth = width
        column.thStyle.width = width
        column.thStyle.maxWidth = width
      }

      store.value.setColumns(columns)

      sortColumns()

      nextTick(() => {
        startObserve()
      })
    }
    setTimeout(() => {
      scroll_bar.value && scroll_bar.value.setScroll()
    }, 0)
    refresh_layout.value = false
  })
}

// 清空doLayout方法中设置的样式，否则会影响计算
function clearStyle() {
  const table = document.getElementById(tableId)

  if (!table)
    return

  const tbody = table.getElementsByClassName('hl-table-body')
  if (!tbody || tbody.length === 0)
    return

  // 设置宽度
  const columns = [...store.value.columns]

  columns.forEach((col) => {
    // tbody
    col.tdStyle.maxWidth = ''
    col.tdStyle.width = col.tdStyle.orgWidth
    col.tdStyle.minWidth = col.tdStyle.orgMinWidth

    // thead
    col.thStyle.width = col.tdStyle.orgWidth
    col.thStyle.minWidth = col.tdStyle.minWidth
    col.thStyle.maxWidth = ''
  })
  store.value.setColumns(columns)
}

const activeIndex = ref()

// 行点击事件
function handleRowClick(row, index) {
  if (props.hightLight) {
    if (activeIndex.value === index) {
      activeIndex.value = -1
    } else {
      activeIndex.value = index
    }

    emits('update:lightLine', activeIndex.value)
  }

  emits('row-click', row, index)
}

// 监听高亮，设置滚动
watch(activeIndex, () => {
  if (!props.scrollWhenLight)
    return

  setBodyerScroll()
})

// 根据activeIndex设置滚动
function setBodyerScroll() {
  nextTick(() => {
    const table = document.getElementById(tableId)
    if (!table)
      return

    const tbody = table.getElementsByClassName('hl-table-body')
    if (!tbody || tbody.length === 0)
      return

    const trs = tbody[0].getElementsByClassName('hl-table-tr')

    const val = props.lightLine

    let height = 0
    for (let i = 0; i < val && i < trs.length; i++) {
      height += trs[i].clientHeight
    }

    const tbodyer = table.querySelector('.body-wrapper')
    tbodyer.scrollTop = height
  })
}

function handleSpanClick(column, index) {
  emits('span-click', column, index)
}

// 关闭表头定制
function closeEditHeader() {
  emits('update:edit-header', false)
}

// 显示滚动条
const scroll_bar_active = ref(false)
const scroll_bar = ref()

const hasEmptySlot = computed(() => !!slots.empty)

watch(
  () => props.lightLine,
  (val) => {
    if (props.hightLight)
      activeIndex.value = val
  },
  {
    immediate: true,
  },
)

// 对列按照hl-table-column的顺序排序
function sortColumns() {
  const table = document.getElementById(tableId)

  if (!table)
    return

  const trs = table.querySelector('.hidden-columns').querySelectorAll('div')
  if (trs && trs.length > 0) {
    const column_map = {}
    store.value.columns.forEach((item) => {
      column_map[item.uuid] = item
    })

    const new_columns = []
    trs.forEach((tr) => {
      const id = tr.getAttribute('id')
      if (column_map[id])
        new_columns.push(column_map[id])
    })

    store.value.setColumns(new_columns)
  }
}

// 监听表格容器变化，重新布局
const resize = useDebounceFn(() => {
  // 取消不换行
  refresh_layout.value = true
  doLayout()
}, 100)

let mutationObserver = null
let intersectionObserver = null
const resizeObserver = null
let last_intersection_observer_status = 0

function watchTableResize() {
  useEventListener(window, 'resize', resize)

  // 监听容器属性等变化
  mutationObserver = new MutationObserver(resize)

  // 监听页面的显示和隐藏
  intersectionObserver = new IntersectionObserver((entries) => {
    // 第一次进入视野resize
    if (entries[0].intersectionRatio > 0 && last_intersection_observer_status <= 0) {
      resize()
    }

    last_intersection_observer_status = entries[0].intersectionRatio
  })
}

// 开始监听容器变化
function startObserve() {
  disconnectObserver()

  let table = document.getElementById(tableId)
  if (table instanceof Element) {
    table = table.querySelector('.hl-table-body')

    if (!table) {
      return
    }
    mutationObserver && mutationObserver.observe(table, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    })

    intersectionObserver && intersectionObserver.observe(table)
    resizeObserver && resizeObserver.observe(table)
  }
}

// 全选后忽略选中的行
const excludeChecked = defineModel('excludeChecked', {
  type: Array,
  default: () => ([]),
})

// 是否全选
const checkAll = defineModel('checkAll', {
  type: Boolean,
  default: false,
})

const check = defineModel('check', {
  type: Array,
  default() {
    return []
  },
})

function changeCheckAll(value) {
  checkAll.value = value
}

function selectAll(value) {
  if (value) {
    props.data.forEach((item) => {
      item.checkbox = item[props.rowKey]
      check.value.push(item[props.rowKey])
    })

    check.value = Array.from(new Set(check.value))
    excludeChecked.value = []
  } else {
    props.data.forEach((item) => {
      item.checkbox = ''
      excludeChecked.value.push(item[props.rowKey])
    })
    check.value = []
  }
}

watch(checkAll, (value) => {
  selectAll(value)
})

// 监听数据变化，重新设置滚动条
watch(() => props.data, (new_data, old_data) => {
  // 是否开启选择
  if (props.select) {
    // 是否开启跨页选择：开启需要回填选择的
    if (props.crossPage) {
      // 跨页之后判断是否是全选，全选则选中
      new_data.forEach((item) => {
        if (checkAll.value) {
          if (excludeChecked.value.includes(item[props.rowKey])) {
            item.checkbox = ''
          } else {
            item.checkbox = item[props.rowKey]
          }

          return
        }

        if (check.value.includes(item[props.rowKey])) {
          item.checkbox = item[props.rowKey]
        }
      })
    } else {
      // 不需要将选择的置空
      check.value = []
      excludeChecked.value = []
    }
  }

  if (props.dataChangeToTop && new_data.length === old_data.length) {
    nextTick(() => {
      if (document.getElementById(tableId)) {
        document.getElementById(tableId).querySelector(`.body-wrapper`).scrollTop = 0
      }
    })
  }
})

function disconnectObserver() {
  mutationObserver && mutationObserver.disconnect()
  resizeObserver && resizeObserver.disconnect()
  intersectionObserver && intersectionObserver.disconnect()
}

function handleScroll() {
  scroll_bar.value && scroll_bar.value.scrollBar()
}

onActivated(() => {
  resize()
})

onMounted(() => {
  watchTableResize()
  nextTick(() => {
    doLayout()
    ready = true
  })
})

onUnmounted(() => {
  disconnectObserver()
})

defineExpose({
  doLayout,
  resize,
})
</script>

<template>
  <div :id="tableId" class="hl-table" :class="{ 'hl-table-border': border, 'hl-table-nowrap': nowrap && !refresh_layout }" :style="{ height: data.length === 0 ? '100%' : '' }">
    <!-- 隐藏列: slot里容纳table-column -->
    <div class="hidden-columns">
      <slot />
    </div>
    <table-head v-if="store.columns.filter((column) => column.label).length > 0" :exclude-checked="excludeChecked" :check-all="checkAll" :select @span-click="handleSpanClick" @change-check-all="changeCheckAll" />

    <div class="body-wrapper" :style="{ maxHeight }" @mouseenter="scroll_bar_active = data.length > 0 && true" @mouseleave="scroll_bar_active = fasle" @scroll="handleScroll">
      <table-body v-show="!(data.length === 0 && hasEmptySlot)" v-model:check="check" v-model:exclude-checked="excludeChecked" :hover :active-index :select :row-key :empty-text :row-class :tooltip-effect :tooltop-max-width @row-click="handleRowClick">
        <template v-if="slots.extend" #extend="{ row }">
          <slot name="extend" :row="row" />
        </template>
      </table-body>

      <!-- 自定义滚动条 -->
      <scroll-bar ref="scroll_bar" :table-id="tableId" :active="scrollbarAlwaysOn || scroll_bar_active" />

      <div v-show="data.length === 0 && hasEmptySlot" class="w-full h-full">
        <slot name="empty" />
      </div>
    </div>
    <edit-header v-if="storageKey" :show="editHeader" @submit="editSubmit" @close="closeEditHeader" />
  </div>
</template>
