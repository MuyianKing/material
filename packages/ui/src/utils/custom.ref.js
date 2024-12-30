import { customRef } from 'vue'

/**
 * 创建一个带防抖的Ref
 * @param {any} value
 * @param {number} delay 延迟时间单位ms
 * @returns
 */
export function debounceRef(value, delay = 100) {
  let timer

  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(val) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        value = val
        trigger()
      }, delay)
    },
  }))
}
