<script setup>
import isURL from 'validator/es/lib/isURL'
import CustomComp from '../../basic/CustomComp.vue'
import useComponent, { generatePropertyByConfig } from '../../utils'

const props = defineProps({
  config: {
    type: Object,
    default() {
      return null
    },
  },
  mode: {
    type: String,
    default: 'edit',
  },
})

const emits = defineEmits(['update:config', 'ready'])

const self_config = {
  deleteBottom: '0px',
  _property_config: {
    label: '外部组件',
    label_id: '',
    iframe_url: '',
    show: [],
  },
}

const { property } = useComponent(props, emits, self_config)

const form = defineModel()
const _ref = ref()

// 透传过来的组件参数
const attrs = inject('task-outer-comp-attrs', null)

const _iframe_url = computed(() => {
  const url = property.value.iframe_url

  // 配置的地址和填写的地址都为空
  if (!url) {
    return ''
  }

  return isURL(url) ? `${url}${url.indexOf('?') > 0 ? '&' : '?'}${property.value.token}=${hl.getUserInfo().token}&time=${Date.now()}` : url
})

async function validateForm() {
  if (!_ref.value) {
    return {}
  }

  const params = await _ref.value.transformParams()
  if (params === null) {
    throw new Error('参数不合法')
  }

  return params
}

onMounted(() => {
  const config = generatePropertyByConfig(self_config, props.config)
  config.validateForm = validateForm
  emits('update:config', config)
  nextTick(() => {
    emits('ready')
  })
})

const _form = computed(() => {
  const _data = form.value?.[props.config.id]
  if (_data && Object.keys(_data).length > 0) {
    return _data
  }
  return form.value || null
})

// 组件样式
const _style = computed(() => {
  return {
    'pointer-events': props.mode === 'edit' ? 'none' : '',
  }
})

// 容器样式
const _custom_style = computed(() => {
  return {
    'min-height': props.mode === 'edit' ? '100px' : '',
  }
})
</script>

<template>
  <custom-comp :mode :config :form :style="_custom_style">
    <component :is="_iframe_url" v-if="_iframe_url" v-bind="attrs" ref="_ref" :data="_form" :mode :style="_style" />
    <slot />
  </custom-comp>
</template>

<style lang="scss" scoped>
.iframe-body {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
