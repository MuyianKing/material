import { evalByFun } from '@hl/utils/common'

/**
 * 根据默认值配置生成一个监听器
 * @param {object} config 默认值配置
 * @param {Ref<object>} form  表单数据
 * @param {string} id 组件ID
 * @returns  watch
 */
export default function getDefaultWatcher(config, form, id) {
  // 配置和表单数据不合法
  if (!config || !form || !form.value) {
    return null
  }

  switch (config.type) {
    case 'time_diff':
      return _genTimeDiffWatcher(config, form, id)
    case 'math':
      return _genMathWatcher(config, form, id)
    default:
      break
  }
}

/**
 * 数学计算
 * @param {object} config 默认值配置
 * @param {Ref<object>} form  表单数据
 * @param {string} id 组件ID
 * @returns  watch
 */
function _genMathWatcher(config, form, id) {
  config = config.value.value
  // 找到所有需要监听的属性
  const watch_fields = config.filter(item => typeof item === 'object').map((item) => {
    return () => form.value[item.value]
  })

  if (watch_fields.length > 0) {
    //  生成监听器
    return watch(watch_fields, () => {
      // 生成表达式
      const statement = config.map((item) => {
        if (typeof item === 'object') {
          return `(+form['${item.value}'])`
        }
        return item
      }).join('')

      form.value[id] = evalByFun(statement, {
        form: form.value,
      })
    }, {
      immediate: true,
    })
  }

  return null
}

/**
 * 时间差值
 * @param {object} config 默认值配置
 * @param {Ref<object>} form  表单数据
 * @param {string} id 组件ID
 * @returns  watch
 */
function _genTimeDiffWatcher(config, form, id) {
  const { large, small, unit } = config.value

  // 没有对应的必须配置不生成监听器
  if (!large || !small) {
    return null
  }

  return watch([
    () => form.value[large],
    () => form.value[small],
  ], () => {
    const _form = form.value
    if (_form[large] && _form[small]) {
      let time = (dayjs(_form[large]) - dayjs(_form[small])) / 1000 / 60

      switch (unit) {
        case 'day':
          time /= (24 * 60)
          break
        case 'hour':
          time /= 60
          break
        default:
          break
      }

      // 配置了小数点后几位|没有配则整数取0位，小数取2位
      const tofix = config.tofix || (Number.isInteger(time) ? 0 : 2)
      form.value[id] = time.toFixed(tofix)
    }

    return ''
  }, {
    immediate: true,
  })
}
