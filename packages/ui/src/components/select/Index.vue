<script setup name="HlSelect">
import { ElOption, ElOptionGroup, ElSelect,vLoading } from 'element-plus'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/option-group/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/loading/style/css'

import { computed, getCurrentInstance } from "vue"

const props = defineProps({
  options: {
    type: Array,
    default() {
      return []
    },
  },
  apiUrl: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, Array],
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
})

const emits = defineEmits(['update:modelValue', 'blur', 'change', 'bottom'])

// 提示信息
const placeholder_comp = computed(() => {
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

function blur() {
  emits('blur')
}

function handleBottom() {
  emits('bottom')
}
</script>

<template>
  <el-select :model-value="modelValue" :placeholder="placeholder_comp" :clearable="clearable" filterable @change="change" @blur="blur">
    <div v-loadmore="handleBottom" class="relative">
      <el-option v-if="all" value="">
        全部
      </el-option>

      <!-- 分组 -->
      <template v-for="item in options" :key="item.value">
        <template v-if="item.children">
          <el-option-group :label="item.label">
            <el-option v-for="child in item.children" :key="child.value" :label="child.label" :value="child.value" />
          </el-option-group>
        </template>

        <el-option v-else :label="item.label" :value="item.value" />
      </template>
    </div>
    <div v-loading="loading" class="loading-item" />
  </el-select>
</template>

<style lang="scss" scoped>
.loading-item {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
