import { ElMessageBox } from 'element-plus'

let lastScripts = []

/* 获取html中script标签的src属性值 */
async function extractNewScripts(html) {
  const scriptReg = /<script.*src=["'](?<src>[^"']+)/g
  const result = []
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups?.src ?? '')
  }
  return result
}

/* 判断浏览器是否需要更新数据 */
async function needUpdate() {
  const newScripts = await extractNewScripts(await fetch(`/?time=${Date.now()}`).then(resp => resp.text()))

  // 没有js：代码全删了还没上传
  if (!newScripts.length) {
    return false
  }

  // 第一次或者第一次没有加载到资源
  if (!lastScripts.length) {
    lastScripts = newScripts
    return false
  }

  // 长度不等直接更新
  if (newScripts.length !== lastScripts.length) {
    lastScripts = newScripts
    return true
  }

  // 相同索引不一致说明更新
  for (let i = 0; i < lastScripts.length; i++) {
    if (lastScripts[i] !== newScripts[i]) {
      lastScripts = newScripts
      return true
    }
  }
  return false
}

/* 延时时间20s */
const TIMEOUT_L0NG = 30 * 1000

/* 自动刷新 */
export function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      ElMessageBox.confirm('页面有更新，点击确定刷新页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        location.reload()
      }).catch(() => {
      })
    } else {
      autoRefresh()
    }
  }, TIMEOUT_L0NG)
}
