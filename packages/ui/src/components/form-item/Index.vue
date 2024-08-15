<script setup name="HlFormItem">
import * as v from '@hl/utils/es/validator'
import { ElFormItem } from 'element-plus'
import 'element-plus/es/components/form-item/style/css'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

const props = defineProps({
  // 提示信息：组件会自动根据表单组件判断是“请选择”还是“请输入”，当无法正确判断时需要手动设置改属性
  info: {
    type: String,
    default: '',
  },
  // 必填
  required: {
    type: Boolean,
    default: false,
  },
  // 身份证号
  idCard: {
    type: Boolean,
    default: false,
  },
  email: {
    type: Boolean,
    default: false,
  },
  // 整型
  integer: {
    type: Boolean,
    default: false,
  },
  // 数字
  number: {
    type: Boolean,
    default: false,
  },
  // 手机号
  phone: {
    type: Boolean,
    default: false,
  },
  // 车牌号
  carNum: {
    type: Boolean,
    default: false,
  },
  // IP地址
  ip: {
    type: Boolean,
    default: false,
  },
  // 端口
  port: {
    type: Boolean,
    default: false,
  },
  // 最大长度
  maxLength: {
    type: [Number, String],
    default: '',
  },
  // 最小长度
  minLength: {
    type: [Number, String],
    default: 0,
  },
  // 是否校验正在上传图片，表单中有上传附件并且开启了自动上传则需要开启
  uploadLoading: {
    type: Boolean,
    default: false,
  },
  // 当字段类型是数组时，可能需要校验数组长度，具体场景比如上传文件的最小个数，下拉框需要限定选择的最少项
  minCount: {
    type: [String, Number],
    default: 0,
  },
  // 配合minCount，当不满足minCount时的提示信息
  minCountMsg: {
    type: String,
    default: '',
  },
  // 校验触发方式
  trigger: {
    type: String,
    default: 'change',
  },
  // 自定义校验规则
  rules: {
    type: [Object, Array],
    default() {
      return null
    },
  },
  label: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: [Number, String],
    default: '',
  },
})

const instance = getCurrentInstance()

// 验证最大长度
function vMaxLPass(rules, value, callback) {
  const maxLength = Number.parseFloat(props.maxLength)
  if (value?.toString().length > maxLength) {
    callback(new Error(`最大长度为${maxLength}`))
  }
  callback()
}

// 验证最小长度
function vMinLPass(rules, value, callback) {
  const minLength = Number.parseFloat(props.minLength)
  if (value?.toString().length < minLength) {
    callback(new Error(`最小长度为${minLength}`))
  }
  callback()
}

// 验证最小长度
function vNumber(rules, value, callback) {
  if (Number.isNaN(+value)) {
    callback(new Error(`请输入数字`))
  }
  callback()
}

// 是否有未完成的上传
function vUploadLoading(rules, value, callback) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].loading) {
        callback(new Error(`请等待文件上传`))
      }
    }
  } else if (value?.loading) {
    callback(new Error(`请等待文件上传`))
  }
  callback()
}

// 验证最少数量
function vMinCount(rules, value, callback) {
  if (Array.isArray(value) && value.length < +props.minCount) {
    callback(new Error(props.minCountMsg || `最少${props.minCount}个`))
  }
  callback()
}

const rules = computed(() => {
  let rules_list = []

  // 自定义的校验规则
  if (props.rules) {
    rules_list = Array.isArray(props.rules) ? [...props.rules] : [props.rules]
  }

  const message = `${props.info || info.value || '请输入'}${props.label?.replace('：', '').replace(':', '')}`

  const trigger = props.trigger

  // 必填
  if (props.required) {
    rules_list.push({ required: true, message, trigger })
  }

  // 身份证
  if (props.idCard) {
    rules_list.push({ validator: v.v_id_num, trigger })
  }

  // 手机号
  if (props.phone) {
    rules_list.push({ validator: v.v_phone, trigger })
  }

  // 车牌
  if (props.carNum) {
    rules_list.push({ validator: v.v_carnum, trigger })
  }

  // 整型
  if (props.integer) {
    rules_list.push({ validator: v.v_int, trigger })
  }

  // IP
  if (props.ip) {
    rules_list.push({ validator: v.v_ip, trigger })
  }

  // 端口
  if (props.port) {
    rules_list.push({ validator: v.v_port, trigger })
  }

  // 最小长度
  if (props.minLength) {
    rules_list.push({ validator: vMinLPass, trigger })
  }

  // 最大长度
  if (props.maxLength) {
    rules_list.push({ validator: vMaxLPass, trigger })
  }

  // 数字
  if (props.number) {
    rules_list.push({ validator: vNumber, trigger })
  }

  // 邮箱
  if (props.email) {
    rules_list.push({ validator: v.v_email, trigger })
  }

  // 文件上传
  if (props.uploadLoading) {
    rules_list.push({ validator: vUploadLoading, trigger })
  }

  // 最少个数
  if (props.minCount > 0) {
    rules_list.push({ validator: vMinCount, trigger })
  }

  return rules_list
})

const labelWidth_comp = computed(() => {
  if (props.labelWidth) {
    if (props.labelWidth === 'fit') {
      return `calc(${props.label.length}em + 15px)`
    }

    return props.labelWidth
  }

  return ''
})

const info = ref('')
onMounted(() => {
  const el_form_item = instance?.vnode?.el?.querySelector?.('.el-form-item__content')
  if (el_form_item.querySelector('.el-input') || el_form_item.querySelector('.el-textarea')) {
    info.value = '请输入'
  } else {
    info.value = '请选择'
  }
})
</script>

<template>
  <el-form-item :rules="rules" :label-width="labelWidth_comp" :label="label">
    {{ info }}
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>

    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>

    <slot />
  </el-form-item>
</template>
