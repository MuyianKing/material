import { useDebounceFn } from '@vueuse/core'

/**
 * 指令：v-top
 * 功能：监听DOM元素滚动到顶部触发
 * @type {import('vue').Directive}
 * @example
 * <div v-top="handleTop">
 * 内容
 * </div>
 */
const vTop = {
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
}

export default vTop
