import { cloneDeep } from 'lodash-es'
import { computed, nextTick, onMounted } from 'vue'

/**
 * 根据属性配置获取属性默认值
 */
function getPropertyValue(value) {
  if (typeof value === 'object' && !Array.isArray(value) && value.is_config) {
    return value.default !== undefined ? value.default : value
  }

  return value
}

/**
 * 将自定义的配置和通用配置合并
 * @param {object} config 自定义的配置
 * @param {object} prop_config 组件类型
 * @return Config
 */
export function generatePropertyByConfig(config, prop_config) {
  const _property = {}

  for (const key in config._property_config) {
    const property = config._property_config[key]
    _property[key] = getPropertyValue(property)
  }

  const _config = cloneDeep(config)

  _config._property = _property

  return {
    ..._config,
    ...prop_config,
  }
}

/**
 *
 * @param {object} props 组件的所有属性
 * @param {Array} emits 组件的事件
 * @param {*} self_config 组件自身配置
 * @param {*} extend_config 额外配置
 * @return {
 *  default_placeholder:"默认提示信息",
 *  config:组件配置
 * }
 */
export default function useComponent(props, emits, self_config, extend_config = {}) {
  const config = generatePropertyByConfig(self_config, {
    ...props.config,
    ...extend_config,
  })

  onMounted(() => {
    emits('update:config', config)

    // 每个组件需要抛出一个ready事件，告诉编辑器准备完成可以进行其他操作
    nextTick(() => {
      emits('ready')
    })
  })

  const property = computed(() => {
    const _property = props.config._property || {}

    return {
      ..._property,
      placeholder: _property.placeholder || '',
      disabled: _property.status === 2,
    }
  })

  return {
    property,
  }
}
