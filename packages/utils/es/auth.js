// 证书主题
const VIIE_WEB_SIGNSUBJECT = ''
// 初始化参数可从网关系统：认证管理->Key类型管理中导出
const VITE_WEB_INITPARAMS = '<?xml version="1.0" encoding="utf-8"?><authinfo><liblist><lib type="PM" version="1.0" dllname="Q3J5cHRPY3guZGxs"><algid val="SHA1" sm2_hashalg="SM3" /></lib><lib type="CSP" version="1.0" dllname="TWljcm9zb2Z0IEVuaGFuY2VkIENyeXB0b2dyYXBoaWMgUHJvdmlkZXIgdjEuMA=="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="TWljcm9zb2Z0IFN0cm9uZyBDcnlwdG9ncmFwaGljIFByb3ZpZGVy"><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="RW50ZXJTYWZlIGVQYXNzMzAwMyBDU1AgdjEuMA=="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="SklUIFVTQiBLZXkgQ1NQIHYxLjA="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="RW50ZXJTYWZlIGVQYXNzMjAwMSBDU1AgdjEuMA=="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="SklUIFVTQiBLZXkzMDAzIENTUCB2MS4w"><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="TWljcm9zb2Z0IEJhc2UgQ3J5cHRvZ3JhcGhpYyBQcm92aWRlciB2MS4w"><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="RkVJVElBTiBlUGFzc05HIFJTQSBDcnlwdG9ncmFwaGljIFNlcnZpY2UgUHJvdmlkZXI="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="CSP" version="1.0" dllname="RkVJVElBTiBlUGFzc05HIENTUCBGb3IgSklUM0sgVjEuMA=="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="SKF" version="1.1" dllname="U2h1dHRsZUNzcDExXzMwMDBHTS5kbGw="><algid val="SHA1" sm2_hashalg="SM3" /></lib><lib type="CSP" version="1.0" dllname="ZVNhZmUgQ3J5cHRvZ3JhcGhpYyBTZXJ2aWNlIFByb3ZpZGVyIHYxLjA="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="SKF" version="1.0" dllname="R0FLRVlfU0tGLmRsbA=="><algid val="SHA1" sm2_hashalg="SM3" /></lib><lib type="CSP" version="1.0" dllname="R0FTUyBDcnlwdG9ncmFwaGljIFNlcnZpY2UgUHJvdmlkZXIgdjEuMA=="><algid val="SHA1" sm2_hashalg="SHA1" /></lib><lib type="SKF" version="1.0" dllname="L29wdC9HQVNTL2xpYlNLRi9saWJTS0ZfR0FfYXBpLnNv"><algid val="SHA1" sm2_hashalg="SM3" /></lib></liblist></authinfo>'

// 认证参数
export const authPatams = {
  // 认证方式
  authMode: 'cert',
  // pin认证是否取用,默认false
  pinCode: false,
  // pin码
  key_pin: '',
}

/**
 * 认证登录
 */
export async function authLogin(authServer) {
  // 判断是否安装证书
  const hasFixed = await hasPlugin().catch((e) => {
    throw e
  })

  if (hasFixed) {
    // 1. 获取认证原文
    const original = await authServer.getOriginal().catch((e) => {
      throw e
    })

    // 2. 生成认证数据包
    const signed_data = doDataProcess(original.original)
    if (!signed_data) {
      throw new Error('未选择证书')
    }

    // 3. 将认证原文和认证数据包发给后台校验
    const res = await authServer.authLogin({
      original: original.original,
      signed_data,
      login_type: 2,
      ...authPatams,
    }).catch((e) => {
      throw e
    })

    return res
  }
  throw new Error('未获取到数字证书，请刷新页面重试')
}

/**
 * 判断是否安装数字证书插件，未安装跳转安装
 */
export function hasPlugin() {
  return new Promise((resolve) => {
    try {
      const result = JIT_GW_ExtInterface.GetVersion()
      resolve(result)
    } catch (e) {
      console.log(e)
      downloadDrive()
      throw new Error('未安装数字证驱动')
    }
  })
}

/**
 * 下载驱动
 */
export function downloadDrive(plugin = './GWAuth/PNXClient.exe') {
  window.location.href = plugin
}

/**
 * 根据原文和证书产生认证数据包
 * @param {string} original 认证原文
 */
export function doDataProcess(original) {
  if (original === '') {
    return
  }
  return detachSignStr(VITE_WEB_INITPARAMS, original, VIIE_WEB_SIGNSUBJECT)
}
