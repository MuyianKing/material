import { AUDIO_SUFFIX, FILE_SUFFIX, IMAGE_SUFFIX, VIDEO_SUFFIX, getMimeType } from '@hl/utils/es/file'

const type_map = {
  image: IMAGE_SUFFIX,
  video: VIDEO_SUFFIX,
  file: FILE_SUFFIX,
  audio: AUDIO_SUFFIX,
}

/**
 * 根据文件类型和后缀获取可选的文件的所有后缀
 * @param {Array | string} type 文件类型
 * @param {Array | string} suffix 文件后缀
 */
export function getAllType(type, suffix) {
  try {
    let _type_list = []

    // 根据类型设置所选文件后缀
    const _type = Array.isArray(type) ? type : (type ? [type] : [])

    _type.forEach((type) => {
      _type_list = _type_list.concat(type_map[type] || [])
    })

    if (suffix) {
      suffix = Array.isArray(suffix) ? suffix : [suffix]
      if (suffix && suffix.length > 0) {
        // 设置类型取两者的交集
        const new_mine_type = []
        suffix.forEach((type) => {
          if (_type_list.includes(type)) {
            new_mine_type.push(type)
          }
        })

        _type_list = new_mine_type

        if (_type_list.length === 0) {
          console.warn('type和suffix设置冲突')
        }
      }
    }

    return _type_list
  } catch (error) {
    console.log(error)
  }
}

/**
 * 根据新的文件生成新的需要渲染的文件
 * @param {*} files 新文件
 * @param {Ref} file_list_ref
 */
export function comp_file_list(files, file_list_ref,previewFileUrl) {
  files.forEach((file, index) => {
    const new_file = {
      uuid: file.uuid,
      name: file.name,
      config: file.config,
      hover: false,
    }
    if (file.file instanceof File) {
      new_file.src = URL.createObjectURL(file.file)
    } else {
      new_file.src = previewFileUrl(file.file)
    }

    // 简单做一个差量，否则会闪一下
    if (file_list_ref.value[index]) {
      // 只要索引和uuid不同就替换
      if (file_list_ref.value[index].uuid !== new_file.uuid) {
        file_list_ref.value[index] = new_file
      }
    } else {
      file_list_ref.value.push(new_file)
    }
  })

  // 删掉多余的
  file_list_ref.value.splice(files.length)
}

/**
 * 根据文件类型和后缀获取可选的文件的acceptT_type
 * @param {Array | string} type 文件类型
 * @param {Array | string} suffix 文件后缀
 */
export function getAcceptType(type, suffix) {
  const _type_list = getAllType(type, suffix)

  if (_type_list.length === 0) {
    return '*/*'
  }

  return getMimeType(_type_list)
}
