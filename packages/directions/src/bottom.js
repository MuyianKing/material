import { useDebounceFn } from '@vueuse/core'

/**
 * 指令：v-bottom
 * 功能：监听DOM元素滚动到底部触发
 * @type {import('vue').Directive}
 * @example
 * <div v-bottom="handleBottom">
 * 内容
 * </div>
 */
const vBottom = {
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
}

export default vBottom
