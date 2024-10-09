// 进入全屏
export function openFullScreen(el) {
  const docElm = el || document.body
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  }
}

// 退出全屏
export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

/**
 * 获取元素到body的left和top
 * @param {*} el
 */
export function getOffsetToBody(el) {
  let top = 0
  let left = 0

  while (el && el.tagName !== 'BODY') {
    top += el.offsetTop
    left += el.offsetLeft
    el = el.offsetParent
  }
  return { top, left }
}

/**
 * 判断内容是否溢出
 * @param {Dom} el
 */
export function isOverflow(el) {
  return el.clientWidth < el.scrollWidth
    || el.clientHeight < el.scrollHeight
}

// 获取图片宽高
export function getImgSize(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src

    // 获取宽高，并以传入的宽高为主
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      })
    }

    img.onerror = () => {
      reject(new Error('图片加载失败'))
    }
  })
}

// 获取dpi
export function getDpi() {
  for (let i = 56; i < 2000; i++) {
    if (matchMedia(`(max-resolution: ${i}dpi)`).matches === true) {
      return i
    }
  }
}

/**
 * 将指定的长度转换为对应的像素值
 * @param {number} num 宽度单位mm
 * @returns 像素
 */
export function getPxBymm(num) {
  const dpi = getDpi()
  return dpi / 25.4 * num
}

/**
 * mm=>pt
 * @param {number} num
 */
export function getPtBymm(num) {
  return getPtByPx(getPxBymm(num))
}

/**
 * px=>pt
 * @param {number} num
 */
export function getPtByPx(num) {
  return num / (getDpi() / 72)
}

/**
 * px=>mm
 * @param {number} num
 */
export function getMmByPx(num) {
  return num / (getDpi() / 25.4)
}

/**
 * 单位转换
 * @param {number} num 转换的值
 * @param {string} from px pt mm
 * @param {string} to px pt mm
 */
export function translateUnit(num, from, to) {
  const translator = `${from}_${to}`

  switch (translator) {
    case 'mm_px':
      return getPxBymm(num)
    case 'mm_pt':
      return getPtBymm(num)
    case 'px_pt':
      return getPtByPx(num)
    case 'px_mm':
      return getMmByPx(num)
    default:
      break
  }
}
