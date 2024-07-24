/**
 * select下拉框分页下拉到底部请求新数据
 */
export default {
  name: 'top',
  body: {
    mounted(el, binding) {
      if (typeof binding.value === 'function') {
        let last_top = 0
        // 防抖
        const fun = useDebounceFn(() => {
          binding.value()
        }, 300)

        el.addEventListener('scroll', function () {
          const top = this.scrollTop < 10

          // 小于10并且是往上滚
          if (top && this.scrollTop - last_top < 0) {
            fun()
          }

          last_top = this.scrollTop
        })
      }
    },
  },
}
