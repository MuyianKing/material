// 附件格式
export const FILE_SUFFIX = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
// 视频格式
export const VIDEO_SUFFIX = ['mp4', 'm3u8']
// 图片格式
export const IMAGE_SUFFIX = ['jpg', 'jpeg', 'png']
// 音频格式
export const AUDIO_SUFFIX = ['mp3', 'wav', 'm4a']

/**
 * 获取后缀
 * @param {string} fileName 文件名
 * @returns 小写后缀
 */
export function getSuffix(fileName) {
  if (fileName === '') {
    return ''
  }

  fileName = fileName.split('.')
  if (fileName.length < 2) {
    return ''
  }
  return fileName[fileName.length - 1].toLowerCase()
}

/**
 * 获取指定文件类型的mime_type
 * @param {Array | string} types
 */
export function getMimeType(types) {
  if (!(Array.isArray(types))) {
    types = [types]
  }
  return mime_type.filter(item => types.includes(item.suffix)).map(item => item.mime_type)
}

/**
 * 根据文件名获取文件类型
 * @param {string} file_name 文件名
 * @returns type
 */
export function getType(file_name) {
  if (!file_name) {
    return
  }

  const suffix = getSuffix(file_name)
  if (IMAGE_SUFFIX.includes(suffix)) {
    return 'image'
  }

  if (VIDEO_SUFFIX.includes(suffix)) {
    return 'video'
  }

  if (AUDIO_SUFFIX.includes(suffix)) {
    return 'audio'
  }

  if (FILE_SUFFIX.includes(suffix)) {
    return 'file'
  }

  return ''
}

// 下载文件
export function download(url, name) {
  const link = document.createElement('a')
  name && (link.download = name)
  link.style.display = 'none'
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}

/**
 * 文件地址转Blob对象
 * @param {string} url
 * @returns Blob
 */
export async function getBlobFromUrl(url) {
  const response = await fetch(url)
  return await response.blob()
}

/**
 * File转blob
 * @param {File} file
 * @param {string} type 文件的mime_type
 * @returns Blob
 */
export function fileToBlob(file, type) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function (evt) {
      const blob = new Blob([evt.target.result], { type })
      resolve(blob)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * 将blob转为json
 * @param {Blob} blob blob数据
 */
export function readBlobAsJSON(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(blob)
    reader.onload = function () {
      const json = JSON.parse(reader.result)
      resolve(json)
    }
  })
}

export const mime_type = [{
  suffix: 'apk',
  mime_type: 'application/vnd.android.package-archive',
}, {
  suffix: 'asf',
  mime_type: 'video/x-ms-asf',
}, {
  suffix: 'avi',
  mime_type: 'video/x-msvideo',
}, {
  suffix: 'bin',
  mime_type: 'application/octet - stream',
}, {
  suffix: 'bmp',
  mime_type: 'image/bmp',
}, {
  suffix: 'c',
  mime_type: 'text/plain',
}, {
  suffix: 'class',
  mime_type: 'application/octet-stream',
}, {
  suffix: 'conf',
  mime_type: 'text/plain',
}, {
  suffix: 'cpp',
  mime_type: 'text/plain',
}, {
  suffix: 'doc',
  mime_type: 'application/msword',
}, {
  suffix: 'docx',
  mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}, {
  suffix: 'xls',
  mime_type: 'application/vnd.ms-excel',
}, {
  suffix: 'xlsx',
  mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}, {
  suffix: 'exe',
  mime_type: 'application/octet-stream',
}, {
  suffix: 'gif',
  mime_type: 'image/gif',
}, {
  suffix: 'gtar',
  mime_type: 'application/x-gtar',
}, {
  suffix: 'gz',
  mime_type: 'application/x-gzip',
}, {
  suffix: 'h',
  mime_type: 'text/plain',
}, {
  suffix: 'htm',
  mime_type: 'text/html',
}, {
  suffix: 'html',
  mime_type: 'text/html',
}, {
  suffix: 'jar',
  mime_type: 'application/java-archive',
}, {
  suffix: 'java',
  mime_type: 'text/plain',
}, {
  suffix: 'jpeg',
  mime_type: 'image/jpeg',
}, {
  suffix: 'jpg',
  mime_type: 'image/jpeg',
}, {
  suffix: 'js',
  mime_type: 'application/x-javascript',
}, {
  suffix: 'log',
  mime_type: 'text/plain',
}, {
  suffix: 'm3u8',
  mime_type: 'audio/x-mpegurl',
}, {
  suffix: 'm4a',
  mime_type: 'audio/mp4a-latm',
}, {
  suffix: 'm4b',
  mime_type: 'audio/mp4a-latm',
}, {
  suffix: 'm4p',
  mime_type: 'audio/mp4a-latm',
}, {
  suffix: 'm4u',
  mime_type: 'video/vnd.mpegurl',
}, {
  suffix: 'm4v',
  mime_type: 'video/x-m4v',
}, {
  suffix: 'mov',
  mime_type: 'video/quicktime',
}, {
  suffix: 'mp2',
  mime_type: 'audio/x-mpeg',
}, {
  suffix: 'mp3',
  mime_type: 'audio/x-mpeg',
}, {
  suffix: 'mp4',
  mime_type: 'video/mp4',
}, {
  suffix: 'mpc',
  mime_type: 'application/vnd.mpohun.certificate',
}, {
  suffix: 'mpe',
  mime_type: 'video/mpeg',
}, {
  suffix: 'mpeg',
  mime_type: 'video/mpeg',
}, {
  suffix: 'mpg',
  mime_type: 'video/mpeg',
}, {
  suffix: 'mpg4',
  mime_type: 'video/mp4',
}, {
  suffix: 'mpga',
  mime_type: 'audio/mpeg',
}, {
  suffix: 'msg',
  mime_type: 'application/vnd.ms-outlook',
}, {
  suffix: 'ogg',
  mime_type: 'audio/ogg',
}, {
  suffix: 'pdf',
  mime_type: 'application/pdf',
}, {
  suffix: 'png',
  mime_type: 'image/png',
}, {
  suffix: 'pps',
  mime_type: 'application/vnd.ms-powerpoint',
}, {
  suffix: 'ppt',
  mime_type: 'application/vnd.ms-powerpoint',
}, {
  suffix: 'pptx',
  mime_type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}, {
  suffix: 'prop',
  mime_type: 'text/plain',
}, {
  suffix: 'rc',
  mime_type: 'text/plain',
}, {
  suffix: 'rmvb',
  mime_type: 'audio/x-pn-realaudio',
}, {
  suffix: 'rtf',
  mime_type: 'application/rtf',
}, {
  suffix: 'sh',
  mime_type: 'text/plain',
}, {
  suffix: 'tar',
  mime_type: 'application/x-tar',
}, {
  suffix: 'tgz',
  mime_type: 'application/x-compressed',
}, {
  suffix: 'txt',
  mime_type: 'text/plain',
}, {
  suffix: 'wav',
  mime_type: 'audio/x-wav',
}, {
  suffix: 'wma',
  mime_type: 'audio/x-ms-wma',
}, {
  suffix: 'wmv',
  mime_type: 'audio/x-ms-wmv',
}, {
  suffix: 'wps',
  mime_type: 'application/vnd.ms-works',
}, {
  suffix: 'xml',
  mime_type: 'text/plain',
}, {
  suffix: 'z',
  mime_type: 'application/x-compress',
}, {
  suffix: 'zip',
  mime_type: 'application/x-zip-compressed',
}]
