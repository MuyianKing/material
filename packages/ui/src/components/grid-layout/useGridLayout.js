import { isRef, watch } from 'vue'

export default function (el, config) {
  // 设置基本样式
  function initStyle() {
    el.style.display = 'grid'
    el.style['row-gap']
      = `${config.row_gap || config.gap || config.column_gap || 10}px`
    el.style['column-gap']
      = `${config.column_gap || config.gap || config.row_gap || 10}px`
  }

  // 设置列数
  function setColumnRow() {
    const width = el.clientWidth
    let column = width / config.width
    column = column - Math.floor(column) > 0.5 ? Math.ceil(column) : Math.floor(column)

    // 宽度小于最小宽度，列数减一
    if (config.min_width && width / column < config.min_width) {
      column -= 1
    }

    el.style['grid-template-columns'] = `repeat(${column}, 1fr)`
  }

  // 监听容器尺寸变化
  let resizeObserver = null
  function initObserver() {
    resizeObserver && resizeObserver.disconnect()
    resizeObserver = new ResizeObserver(() => {
      setColumnRow()
    })
    resizeObserver.observe(el)
  }

  function start() {
    initStyle()
    setColumnRow()
    initObserver()
  }

  function init() {
    if (isRef(el)) {
      // ref类型监听一次
      watch(
        el,
        () => {
          el = el.value
          start()
        },
        {
          once: true,
        },
      )
    } else {
      // 直接初始化
      start()
    }
  }

  init()
}
