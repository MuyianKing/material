<script setup>
import ControlShow from '../../form/basic/ControlShow.vue'
import { getFlatFields } from '../../../hooks/form'
import useFlowStore from '../../../pinia/modules/useFlowStore'

const { active_form_item, form_field_list } = toRefs(inject('editor_store'))
const { node } = storeToRefs(useFlowStore())

const value = defineModel({
  type: Object,
  default() {
    return []
  },
})

const extendConfig = computed(() => {
  const extend_config = [{
    label: '组件模式',
    value: 'task_comp_mode',
    config: {
      type: 'select',
      options: [{
        label: '预览模式',
        value: 'preview',
      }, {
        label: '文本模式',
        value: 'text',
      }],
    },
  }]

  if (node.value?.type === 'AuditNode') {
    extend_config.push({
      label: '审核状态',
      value: 'pass',
      config: {
        type: 'select',
        options: [{
          label: node.value.base_config?.pass_label,
          value: 1,
        }, {
          label: node.value.base_config?.reject_label,
          value: 0,
        }],
      },
    })
  }

  return extend_config
})
</script>

<template>
  <div>
    <control-show v-model="value" :form-field-list="getFlatFields(form_field_list)" :extend-config="extendConfig" :active-form-item="active_form_item" />
  </div>
</template>

<style lang='scss' scoped></style>
