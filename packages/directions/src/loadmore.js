/**
 * 指令：v-loadmore
 * 功能：el-select滚动到底部触发
 * @type {import('vue').Directive}
 * @example
 * <div v-loadmore="handleBottom">
 * 内容
 * </div>
 */
const vLoadmore = {
  mounted(el, binding) {
    el.time_id = 0
    el.parentNode.parentNode.addEventListener('scroll', function () {
      this.time_id && clearTimeout(this.time_id)
      this.time_id = setTimeout(() => {
        if (this.scrollHeight - (this.clientHeight + this.scrollTop) < 20) {
          binding.value()
        }
        this.time_id = 0
      }, 200)
    })
  },
}

export default vLoadmore
