<script setup>
import { computed, toRefs, watch } from 'vue'
import { HlFormItem } from '@hl/ui'
import getDefaultWatcher from '../../../hooks/form.default.watcher'
import { getDefault } from '../../../hooks/form.default.value'
import CustomComp from './CustomComp.vue'
import '@hl/ui/src/components/form-item/Index.css'

const props = defineProps({
  config: {
    type: Object,
    default() {
      return {}
    },
  },
  form: {
    type: Object,
    default() {
      return null
    },
  },
  // 自定义校验规则
  rules: {
    type: [Object, Array],
    default() {
      return []
    },
  },
  mode: {
    type: String,
    default: 'preview',
  },
})

const { form } = toRefs(props)

// 验证最大长度
function vDateRange(rules, value, callback) {
  if (value) {
    value = value.split('_')
    if (!value[0]) {
      callback(new Error('请输入开始时间'))
    }
    if (!value[1]) {
      callback(new Error('请输入结束时间'))
    }
  }

  callback()
}

// 自定义的校验规则
const _rules = computed(() => {
  const rules_arr = [...((Array.isArray(props.rules) ? props.rules : [props.rules]) || [])]

  // 时间范围组件必填校验
  if (props.config._property?.is_range && props.config._property?.required) {
    rules_arr.push({ validator: vDateRange, trigger: 'blur' })
  }

  return rules_arr
})

const label_comp = computed(() => {
  return props.config._property?.label ? `${props.config._property?.label}` : ''
})

// 监听表单变化，生成默认值
let watch_stop = null

function initWatch(default_value) {
  deastroyWatcher()
  watch_stop = getDefaultWatcher(default_value, form, props.config.id)
}

// 销毁监听器
function deastroyWatcher() {
  watch_stop && watch_stop()
  watch_stop = null
}

// 监听默认值配置
watch(() => props.config._property?.default_value, (val) => {
  if (['time_diff', 'math'].includes(val?.type)) {
    initWatch(val)
  } else {
    deastroyWatcher()
  }
}, {
  immediate: true,
})

// 监听配置生成初始值
watch(() => props.config._property, () => {
  if (form.value && props.mode === 'preview') {
    form.value[props.config.id] = getDefault(props.config)
  }
}, { once: true })
</script>

<template>
  <!-- 可编辑组件 -->
  <custom-comp v-bind="$attrs" :mode="mode" :form="form" :config>
    <hl-form-item :prop="config.id" :label="label_comp" :max-length="config._property?.max_length" :min-length="config._property?.min_length" :required="mode === 'text' ? false : config._property?.required" :phone="config._property?.format === 'phone'" :id-card="config._property?.format === 'idCard'" :integer="config._property?.format === 'integer'" :car-num="config._property?.format === 'carNum'" :port="config._property?.format === 'port'" :ip="config._property?.format === 'ip'" :number="config._property?.format === 'number'" :email="config._property?.format === 'email'" :label-width="config._property?.label_width" :rules="_rules" :min-count="config._property?.min_count || 0" :upload-loading="config.key === 'FormUpload'">
      <slot />
    </hl-form-item>
  </custom-comp>
</template>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0 !important;
}
</style>
