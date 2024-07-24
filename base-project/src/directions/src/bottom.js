export default {
  name: 'bottom',
  body: {
    mounted(el, binding) {
      if (typeof binding.value === 'function') {
        // 防抖
        const fun = useDebounceFn(() => {
          binding.value()
        }, 300)

        el.lastScrollTop = 0

        el.addEventListener('scroll', function () {
          // 往上滚不触发
          if (el.lastScrollTop - this.scrollTop > 0) {
            el.lastScrollTop = this.scrollTop
            return
          }

          el.lastScrollTop = this.scrollTop

          if (this.scrollHeight - (this.clientHeight + this.scrollTop) < 20) {
            fun()
          }
        })
      }
    },
  },
}
