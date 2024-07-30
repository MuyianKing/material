import Cookies from 'js-cookie'
import { jsonparse } from './common'

export default {
  setKey(key) {
    key = `${hl.PROJECT_PREFIX}_${key}`
    return key
  },

  /**
   * 设置缓存
   * @param {string} key
   * @param {string | object} value
   * @param {object} options
   * @param {number} options.expire 有效期 单位天
   * @param {string} options.type 存储方式 storage-localstorage cookie-Cookie
   */
  set(key, value, { expire, type } = { expire: 7, type: 'storage' }) {
    key = this.setKey(key)
    if (type === 'cookie') {
      cookie.set(key, value, expire)
    } else {
      store.set(key, value, expire)
    }
  },

  /**
   * 获取缓存
   * @param {string} key
   * @param {object} param
   * @param {string} param.def 取不到时的默认值
   * @param {string} param.type 取的类型 cookie-从cookie中取  storage-从localStorage中取
   */
  get(key, { def, type } = { def: '', type: '' }) {
    key = this.setKey(key)

    switch (type) {
      case 'cookie':
        return cookie.get(key, def)
      case 'storage':
        return store.get(key, def)
      default:
        return cookie.get(key, def) || store.get(key, def)
    }
  },

  /**
   * 删除缓存
   * @param {string} key
   * @param {string} type 删除的缓存类型，默认cookie和localStorage都会清空
   */
  remove(key, type = '') {
    key = this.setKey(key)
    switch (type) {
      case 'cookie':
        cookie.remove(key)
        break
      case 'storage':
        store.remove(key)
        break
      default:
        cookie.remove(key)
        store.remove(key)
        break
    }
  },
}

// Cookie
const cookie = {
  /**
   * 设置缓存
   * @param {string} key
   * @param {string | object} value
   * @param {number} expire 有效期
   */
  set(key, value, expire = 7) {
    if (!key || value === undefined) {
      return
    }
    Cookies.set(key, value instanceof Object ? JSON.stringify(value) : value, { expires: expire })
  },

  /**
   * 获取缓存
   * @param {string} key
   */
  get(key, def) {
    let v = Cookies.get(key)
    if (!v) {
      return def || ''
    }

    try {
      v = JSON.parse(v)
      return v
    } catch (error) {
      return v
    }
  },

  /**
   * 删除缓存
   * @param {string} key
   */
  remove(key) {
    Cookies.remove(key)
  },
}

// localStorage
const store = {
  /**
   * 设置缓存
   * @param {string} key
   * @param {string | object} value
   * @param {number} expire 有效期
   */
  set(key, value, expire = 7) {
    if (!key || value === undefined) {
      return
    }

    try {
      this.setItem(key, value, expire)

      const keys = jsonparse(localStorage.getItem('keys'), []) || []
      if (!keys.includes(key)) {
        keys.push(key)
      }
      localStorage.setItem('keys', JSON.stringify(keys))
    } catch (e) {
      if (e.message.includes('exceeded the quota')) {
        console.log('超出')
        this.clearInvalid(() => this.setItem(key, value, expire))
      }
    }
  },

  // 存入
  setItem(key, value, expire) {
    const item = {
      value,
      time: dayjs().add(expire, 'day').valueOf(),
    }
    localStorage.setItem(key, JSON.stringify(item))
  },

  /**
   * 清除已过期的缓存、
   * @param {Function} callback 清除成功回调
   */
  clearInvalid(callback) {
    const keys = jsonparse(localStorage.getItem('keys'), []) || []
    let objs = []

    keys.forEach((key) => {
      objs.push({
        key,
        value: jsonparse(localStorage.getItem(key), null),
      })
    })

    if (!callback && typeof callback !== 'function') {
      return
    }

    try {
      callback()
    } catch (e) {
      // 依旧空间不够
      if (e.message.includes('exceeded the quota')) {
        // 按照存入时间删掉一半
        objs = objs.filter(item => item.value).sort((a, b) => a.value.time - b.value.time)
        objs.splice(0, Math.ceil(objs.length / 2)).forEach((item) => {
          this.remove(item.key)
          callback()
        })
      }
    }
  },

  /**
   * 获取缓存
   * @param {string} key
   * @param {any} def
   */
  get(key, def) {
    let v = localStorage.getItem(key)
    if (!v) {
      return def || ''
    }

    try {
      v = JSON.parse(v)
      if (v.time) {
        if (dayjs().valueOf() - v.time > 0) {
          this.remove(key)
          return def
        }
      }
      return jsonparse(v.value, v.value)
    } catch (error) {
      return v
    }
  },

  /**
   * 删除缓存
   * @param {string} key
   */
  remove(key) {
    localStorage.removeItem(key)
  },
}
