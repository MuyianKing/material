const comp_map = {
  radio: {
    key: 'FormSelect',
    _config: {
      expand: true,
    },
  },
  checked: {
    key: 'FormSelect',
    _config: {
      expand: true,
      multiple: true,
    },
  },
  select: {
    key: 'FormSelect',
  },
  upload: {
    key: 'FormUpload',
  },
}

function getTrueOrFalse(val) {
  if (val === 'true') {
    return true
  }

  if (val === 'false') {
    return false
  }

  return val
}

export default function genFormConfig(config) {
  console.log('before config', config)

  return config.map((item) => {
    if (!comp_map[item.type]) {
      return null
    }
    const { key, _config } = comp_map[item.type]

    const new_config = {
      id: item.key,
      key,
      _property: {
        editable: true,
        label: item.name,
        label_width: '',
        placeholder: '',
        required: getTrueOrFalse(item.required),
        show: [],
        status: 1,
        ...(_config || {}),
      },
    }

    if (item.content) {
      new_config._property.options = item.content.map((it) => {
        return {
          label: it,
          value: it,
        }
      })
    }

    // 附件
    if (item.type === 'upload') {
      console.log(item)
      if (item.min >= 0 && item.max && item.max > 1) {
        new_config._property.upload_multiple = true
      }
      new_config._property.max_count = +(item.max || 1)
    }

    // TODO: 配置显示控制

    return new_config
  }).filter(item => item)
}
