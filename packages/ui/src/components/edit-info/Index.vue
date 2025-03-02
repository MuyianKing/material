<script setup>
import { useDebounceFn } from '@vueuse/core'
import { ElInput } from 'element-plus'
import { nextTick, reactive, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
  // 对齐方式
  align: {
    type: String,
    default: 'left',
  },
  // 是否可编辑
  editable: {
    type: Boolean,
    default: true,
  },
  // 没有值时的提示信息
  placeholder: {
    type: String,
    default: '请输入',
  },
  triggerInfo: {
    type: String,
    default: '双击编辑',
  },
  // 值为0时是否置为空字符串
  zeroToEmpty: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const input_val = ref('')
const rowValue = reactive({
  editing: false,
})

watch(() => props.modelValue, (val) => {
  input_val.value = val
}, {
  immediate: true,
})

// 双击
const input_ref = ref()
function handleDblclick() {
  if (!props.editable) {
    return
  }

  if (props.zeroToEmpty && +input_val.value === 0) {
    input_val.value = ''
  }
  rowValue.editing = true
  nextTick(() => {
    input_ref.value.focus()
  })
}

// 失焦
const handleBlur = useDebounceFn(() => {
  rowValue.editing = false
  input_val.value = input_val.value.trim()
  emits('update:modelValue', input_val.value)
  if (input_val.value !== props.modelValue) {
    emits('change', input_val.value)
  }
}, 200)
</script>

<template>
  <div class="hl-edit-info" :class="{ 'cursor-pointer': editable }" :style="{ width, textAlign: align }" @dblclick="handleDblclick">
    <el-input v-if="rowValue.editing" ref="input_ref" v-model="input_val" :placeholder="placeholder" @blur="handleBlur" @change="handleBlur" />
    <template v-else>
      <span v-if="modelValue !== ''" class="hl-value-item">{{ modelValue }}</span>
      <span v-else class="hl-trigger-item">{{ triggerInfo }}</span>
    </template>
  </div>
</template>
