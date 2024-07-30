import { isTruth } from './common'

export default class Socket {
  constructor(config = {}) {
    config = config || {}

    // 请求地址
    this.url = config.url || ''

    // 是否使用单例模式
    this.single = config.single || false

    // 指令超时时间
    this.timeout = config.timeout || 5000

    // 重连的最大次数
    this.max_connect_count = config.max_connect_count || 10

    // 当前重连次数
    this.content_count = 0

    // 是否需要重新连接：客户端或者服务端主动关闭连接时不需要重新连接
    this.reconnect = true

    // 保存所有指令的回调
    this.callbacks = {}
  }

  /**
   * 获取实例对象
   * @param {*} config 配置
   * @param {*} callback 连接建立回调:回调参数就是当前实例对象
   */
  static getInstance(config, callback) {
    let isnatnce = null

    // 是否使用单例模式
    if (config.single) {
      isnatnce = Socket._instance || new Socket(config)
    } else {
      isnatnce = new Socket(config)
    }

    isnatnce.open(callback)
  }

  // 开启连接
  open(callback) {
    if ('WebSocket' in window && this.url !== '') {
      this.reconnect = true
      this.content_count = 0
      this.callbacks = {}
      this.connect(callback)
    } else {
      throw new Error('浏览器不支持websocket')
    }
  }

  /**
   * 连接
   */
  connect(callback) {
    this.socket = new WebSocket(this.url)

    // 连接打开
    this.socket.onopen = () => {
      this.content_count = 0

      if (callback) {
        callback(this)
      }

      // 连接关闭
      this.socket.onclose = () => {
        if (this.reconnect) {
          this.reconnectFun()
          this.state = 0
        }
      }
    }

    this.socket.onmessage = (message) => {
      let res = message.data

      try {
        res = JSON.parse(res)
        const key = `${res.opt}_${res.timestamp}`

        // 是否有回调信息
        if (this.callbacks[key]) {
          // 清除超时的定时器
          clearTimeout(this.callbacks[key].timeout)
          // 这里是成功还是失败根据具体的业务来定
          this.callbacks[key].resolve(res)
          // 删除配置
          delete this.callbacks[key]
        }
      } catch (error) {
        // 普通的消息
        console.log('res', res)
      }
    }
  }

  /**
   * 发送指令消息
   * @param {string} opt 指令名称
   * @param {*} params 指令参数
   */
  sendCommand(opt, params = {}) {
    const timestamp = dayjs().valueOf()
    return new Promise((resolve, reject) => {
      // 生成回调对象的key
      const key = `${opt}_${timestamp}`
      this.callbacks[key] = {
        // 成功回调
        resolve,
        // 失败回调
        reject,
        //  请求超时
        timeout: setTimeout(() => {
          reject(new Error('Network Timeout'))
          delete this.callbacks[key]
        }, this.timeout),
      }

      this.send({
        opt,
        params,
        timestamp,
      })
    })
  }

  /**
   * 发送消息
   * @param {*} msg
   */
  send(msg) {
    if (this.socket.readyState === 1) {
      if (isTruth(msg)) {
        this.socket.send(typeof msg === 'object' ? JSON.stringify(msg) : msg)
      } else {
        throw new Error('please do not send invalid messages')
      }
    }
  }

  /**
   *  重连
   */
  reconnectFun() {
    if (this.content_count > this.max_connect_count) {
      return
    }

    if (this.reconnect_timeout_flg) {
      return
    }

    this.destroy()

    this.content_count++
    this.connect()

    this.reconnect_timeout_flg = setTimeout(() => {
      this.reconnect_timeout_flg = 0
    }, 3000)
  }

  /**
   * 手动关闭连接
   */
  close() {
    this.reconnect = false

    if (this.socket.readyState === 1) {
      this.socket.close()
    }

    this.destroy()
  }

  /**
   * 销毁
   */
  destroy() {
    this.aliveTime && clearTimeout(this.aliveTime)
    this.aliveTime = 0

    for (const key in this.callbacks) {
      const item = this.callbacks[key]
      clearTimeout(item.timeout)
    }
    this.callbacks = {}

    if (this.single) {
      Socket._insatnce = null
    }
  }
}
