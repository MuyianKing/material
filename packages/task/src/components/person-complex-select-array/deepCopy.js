export function isObject(target) {
  return (typeof target === 'object' && target) || typeof target === 'function'
}

/**
 * data：需要克隆的数据
 * Cls：克隆的数据中是否是传入类的类对象(接受类本身)
 */
export function clone(data, Cls) {
  if (!isObject(data)) {
    return data
  }

  // 判断是时间格式还是正则表达式
  if ([Date, RegExp].includes(data.constructor)) {
    return new data.constructor(data)
  }

  // 判断是否是函数
  if (typeof data === 'function') {
    return new Function(`return${data.toString()}`)()
  }

  if (data instanceof Map) {
    const result = new Map()
    data.forEach((item, key) => {
      if (isObject(item)) {
        result.set(key, clone(item, Cls))
      } else {
        result.set(key, item)
      }
    })

    return result
  }

  if (data instanceof Set) {
    const result = new Set()
    data.forEach((item, key) => {
      if (isObject(item)) {
        result.add(key, clone(item, Cls))
      } else {
        result.add(key, item)
      }
    })

    return result
  }

  // 判断是不是指定的类型
  if (data instanceof Cls) {
    return new Cls(data)
  }

  if (Array.isArray(data)) {
    const result = []
    data.forEach((item) => {
      if (isObject(item)) {
        result.push(clone(item, Cls))
      } else {
        result.push(item)
      }
    })

    return result
  }

  const keys = Reflect.ownKeys(data)
  const allDesc = Object.getOwnPropertyDescriptors(data)
  const result = Object.create(Object.getPrototypeOf(data), allDesc)

  keys.forEach((key) => {
    const val = data[key]
    if (isObject(val)) {
      result[key] = clone(val, Cls)
    } else {
      result[key] = val
    }
  })

  return result
}
