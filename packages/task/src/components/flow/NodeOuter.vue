<script setup>
import { arrayUnion, getLabelByVal } from '@hl/utils/common'
import { getFormById } from '../../server/form'
import { getFlatFields } from '../../hooks/form'

const props = defineProps({
  /**
   * {
   *  form_id:"表单ID"
   * }
   */
  formConfig: {
    type: Array,
    default() {
      return []
    },
  },
  // 自定义字段过滤
  filterFun: {
    type: Function,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
  },
})

const model_value = defineModel({
  type: [Array, String, Number],
  default() {
    return []
  },
})

const _model_value = computed(() => {
  if (!props.multiple) {
    return Array.isArray(model_value.value) ? model_value.value[0] || '' : model_value.value || ''
  }

  return model_value.value.map(item => `${item.form_id}__${item.field_id}`)
})

const options = ref([])

async function getData() {
  const form_ids = arrayUnion(props.formConfig.map(item => item.form_id))
  const result = await Promise.all(form_ids.map(form_id => getFormById(form_id)))

  options.value = []
  result.forEach((item, index) => {
    // 过滤字段
    if (props.filterFun && typeof props.filterFun === 'function') {
      item.form_field_list = props.filterFun(getFlatFields(item.form_field_list)) || getFlatFields(item.form_field_list)
    } else {
      item.form_field_list = getFlatFields(item.form_field_list)
    }

    item.form_field_list.forEach((field) => {
      // props.type 判断是否是表单内人员选择
      if (props.type === 'form_user') {
        if (!['FormTaskUser', 'FormOrg', 'FormPersonSelect'].includes(field.key)) {
          return
        }
      }

      options.value.push({
        label: `${props.formConfig[index].node_name} - ${field._property.label}`,
        value: `${item.form_id}__${field.id}`,
        field_id: field.id,
        form_id: item.form_id,
        node_id: field.key,
      })
    })
  })
}

function handleChange(val) {
  console.log('handleChange', val)
  if (Array.isArray(val)) {
    model_value.value = val.map((item) => {
      const obj = {
        ...getLabelByVal(options.value, item, {
          obj: true,
        }),
      }

      delete obj.value
      return obj
    })

    console.log(model_value.value)
  } else {
    model_value.value = val
  }
}

watch(() => props.formConfig, (val) => {
  options.value = []
  if (val) {
    getData()
  }
}, {
  immediate: true,
})
</script>

<template>
  <hl-select :model-value="_model_value" :multiple :options @change="handleChange" />
</template>

<style lang='scss' scoped></style>
