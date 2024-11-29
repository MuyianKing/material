<script setup name="HlFormDialog">
import { ElButton, ElForm } from 'element-plus'
import { ref } from 'vue'
import { error, success, warning } from '../../utils/message'
import DialogComp from '../dialog/Index.vue'

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 校验规则
  rules: {
    type: Object,
    default() {
      return {}
    },
  },
  // el-form的model
  model: {
    type: Object,
    default() {
      return null
    },
  },
  // 弹框宽度
  width: {
    type: [Number, String],
    default: '500px',
  },
  // 弹框距离顶部的距离
  top: {
    type: [String, Number],
    default: '150px',
  },
  // 保存按钮文本
  submitText: {
    type: String,
    default: '提交',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  // 提交调用的server方法
  server: {
    type: Function,
    default: null,
  },
  labelWidth: {
    type: [String, Number],
    default: '80px',
  },
})

const emits = defineEmits(['error', 'success', 'refresh', 'submit'])

// 保存
const _loading = ref(false)
const form_ref = ref()
function submit() {
  if (!props.model) {
    warning('hl-form-dialog组件未设置model属性')
    return
  }

  form_ref.value.validate(async (valid) => {
    if (valid) {
      const fun = props.server
      if (fun && typeof fun === 'function') {
        _loading.value = true
        fun(props.model).then((data) => {
          success('保存成功')
          emits('success', data)
          emits('refresh', props.model)
          close()
        }).catch((e) => {
          error(e, '保存失败')
          emits('error')
        }).finally(() => {
          _loading.value = false
        })
      } else {
        emits('submit')
      }
    }
  })
}

const show = defineModel({
  type: Boolean,
  default: false,
})

function close() {
  form_ref.value.clearValidate()
  show.value = false
}

defineExpose({
  getFormRef: () => form_ref.value,
})
</script>

<template>
  <dialog-comp v-model="show" :title :width :top v-bind="$attrs" @close="close">
    <el-form ref="form_ref" :class="{ 'hl-form-dialog-inline-form': inline }" :model="model" :rules="rules" :label-width="labelWidth" v-bind="$attrs" scroll-to-error>
      <slot />
    </el-form>
    <template #footer>
      <slot name="footer" :submit="submit">
        <el-button type="primary" :loading="_loading" @click="submit">
          {{ submitText }}
        </el-button>
      </slot>
    </template>
  </dialog-comp>
</template>
