<script setup name="HlSelect">
import { ElOption, ElOptionGroup, ElSelect, vLoading } from 'element-plus'
import { vLoadmore } from '@hl/directions'
import { computed, getCurrentInstance } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default() {
      return []
    },
  },
  // 请求方法：可以不配置options，待选项从方法中获取，配置了该项options将失效
  apiServer: {
    type: Function,
    default: null,
  },
  modelValue: {
    type: [String, Number, Array, Boolean],
    default() {
      return ''
    },
  },
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  // 显示全部
  all: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // 禁用的选项：选项值组成的数组
  disabledOptions: {
    type: [String, Array, Number, Boolean],
    default() {
      return []
    },
  },
  // 只读
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'blur', 'change', 'bottom'])

// 提示信息
const placeholder_comp = computed(() => {
  // 只读没有提示
  if (props.readonly) {
    return ''
  }

  if (props.placeholder) {
    return props.placeholder
  }

  const instance = getCurrentInstance()
  if (instance?.parent?.props?.label) {
    return `请选择${instance.parent.props.label.replace('：', '').replace(':', '')}`
  }

  return '请选择'
})

function change(val) {
  emits('update:modelValue', val)
  emits('change', val)
}

// 失焦
function blur() {
  emits('blur')
}

// 触底触发
function handleBottom() {
  emits('bottom')
}

// 禁用选项
const _d_p = computed(() => {
  if (!props.disabledOptions) {
    return []
  }
  return Array.isArray(props.disabledOptions) ? props.disabledOptions : [props.disabledOptions]
})
</script>

<template>
  <el-select :model-value="modelValue" :disabled="readonly || disabled" :placeholder="placeholder_comp" :clearable="clearable" filterable :class="{ 'hl-select-readonly-item': readonly }" @change="change" @blur="blur">
    <div v-loadmore="handleBottom" class="relative">
      <el-option v-if="all" value="">
        全部
      </el-option>

      <!-- 分组 -->
      <template v-for="item in options" :key="item.value">
        <template v-if="item.children">
          <el-option-group :label="item.label">
            <el-option v-for="child in item.children" :key="child.value" :label="child.label" :value="child.value" :disabled="_d_p.includes(item.value)" />
          </el-option-group>
        </template>

        <el-option v-else :label="item.label" :value="item.value" :disabled="_d_p.includes(item.value)" />
      </template>
    </div>
    <div v-loading="loading" class="hl-select-loading-item" />
  </el-select>
</template>
