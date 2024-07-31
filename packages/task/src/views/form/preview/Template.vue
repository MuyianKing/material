<script setup>
import { cloneDeep } from 'lodash-es'
import PreviewPanelItem from '../../../components/form-editor/PreviewPanelItem.vue'
import TextPanelItem from '../../../components/form-editor/TextPanelItem.vue'
import { getFormById } from '../../../server/form'
import { getDefault } from '../../../hooks/form.default.value'
import { getFlatFields } from '../../../hooks/form'

const props = defineProps({
  config: {
    type: Object,
    default: null,
  },
  formId: {
    type: [String, Number],
    default: '',
  },
  taskId: {
    type: [String, Number],
    default: '',
  },
  mode: {
    type: String,
    default: 'preview',
  },
  formData: {
    type: Object,
    default: null,
  },
})

const loading = ref(true)

/**
 * 根据表单配置生成表单的model
 * @param {object} config
 * @param {object} model 表单数据
 */
function setModelFromConfig(config, model = {}) {
  let new_form = {}
  config?.forEach((item) => {
    if (item._property.editable || item.key === 'FormOuterComp') {
      new_form[item.id] = model[item.id] || getDefault(item)
    }

    if (item.children) {
      item.children.forEach((child) => {
        new_form = {
          ...new_form,
          ...setModelFromConfig(child, model),
        }
      })
    }
  })

  return new_form
}

const _config = ref({
  form_field_list: [],
  form_config: [],
})

/**
 * 获取表单数据
 */
async function getData() {
  const data = await getFormById(props.formId)
  _config.value = {
    form_field_list: data.form_field_list,
    form_config: data.form_config,
  }
}

const form_data = ref({})

// 检验表单所有字段是否合法
const form_ref = ref()

function validate() {
  if (loading.value) {
    hl.message.warning('请稍等，正在加载表单数据')
    return new Promise(() => {
    })
  }
  return new Promise((resolve, reject) => {
    // 先校验自身的表单数据是否合法
    form_ref.value.validate(async (valid) => {
      if (valid) {
        if (valid) {
          const outer_comp = getFlatFields(_config.value.form_field_list)?.filter(item => item.key === 'FormOuterComp').map((item) => {
            return {
              id: item.id,
              v: item.validateForm(),
            }
          })

          try {
            // 给任务中心的数据
            const new_form = { ...form_data.value }

            // 给第三方的数据
            let outer_form = {}

            const result = await Promise.all(outer_comp.map(item => item.v))
            result.forEach((item, index) => {
              outer_form = {
                ...outer_form,
                ...item,
              }
              new_form[outer_comp[index].id] = item
            })

            resolve({
              form: new_form,
              outer_form,
              config: cloneDeep(_config.value),
            })
          } catch (e) {
            reject(e)
          }
        }
      } else {
        reject(new Error('表单数据不合法'))
      }
    })
  })
}

function setLoading(is_loading) {
  loading.value = is_loading
}

watchEffect(async () => {
  loading.value = true
  if (props.formId) {
    await getData()
  } else if (props.config) {
    _config.value = props.config
  }

  //  预览生成默认值，如果后续组件配置新增或者删除，这里的默认值不会体现出来
  if (props.mode === 'preview') {
    form_data.value = setModelFromConfig(_config.value.form_field_list, props.formData || {})
  } else {
    form_data.value = props.formData || {}
  }
  loading.value = false
})

defineExpose({
  validate,
  setLoading,
})
</script>

<template>
  <el-skeleton :loading="loading" animated style="width: 100%">
    <template #template>
      <el-skeleton-item v-for="item in new Array(10)" :key="item" class="h-[30px] mb-[15px]" variant="text" />
    </template>
    <template #default>
      <el-form v-bind="$attrs" ref="form_ref" class="task-edit-form" :class="{ 'text-wrapper': mode === 'text' }" :label-width="`${+_config.form_config?.label_width + 5}`" :model="form_data" scroll-to-error validate-on-rule-change>
        <slot :form="form_data" name="before" />
        <preview-panel-item v-if="mode === 'preview'" v-model:form-data="form_data" v-model="_config.form_field_list" />
        <text-panel-item v-else :form-data="form_data" :model-value="_config?.form_field_list" />
        <slot :form="form_data" name="after" />
      </el-form>
    </template>
  </el-skeleton>
</template>

<style lang="scss" scoped>
</style>
