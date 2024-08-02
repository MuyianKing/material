<script setup>
import { PersonSelect } from '@hl/tyyh'
import { computed } from 'vue'
import CustomEditableComp from '../../basic/CustomEditableComp.vue'
import useComponent from '../../utils'
import { getPersonByAll } from '../../../../server'

const props = defineProps({
  config: {
    type: Object,
    default() {
      return {}
    },
  },
  mode: {
    type: String,
    default: 'edit',
  },
})

const emits = defineEmits(['update:config', 'ready'])

// 自定义属性
const self_config = {
  // 属性配置
  _property_config: {
    // 表示该组件是否需要用户输入
    editable: true,
    label: '人员选择',
    // 标签宽度
    label_width: '',
    label_id: '',
    // 提示
    placeholder: '请选择人员',
    // 是否可以清除
    clearable: true,
    required: false,
    // 是否包含下级部门
    person_has_next: true,
    // 主键
    person_id_key: 'id_card',
    person_data: {},
    // 关联单位
    person_link_org: '',
    multiple: false,
    expand: false,
    show: [],
    // 1-正常状态 2-只读
    status: 1,
    outer_field: true,
  },

  // 样式暂时没用到
  _style: {},
}

const { property } = useComponent(props, emits, self_config)

const form = defineModel({
  type: Object,
})

const org = computed(() => {
  if (form.value) {
    return form.value[property.value.person_link_org]
  }
  return ''
})

function getPerson() {
  return getPersonByAll(property.value.person_data, property.value.person_id_key === 'org_job_idcard')
}

const apiServer = computed(() => {
  if (personDataiIsEmpty(property.value.person_data)) {
    return null
  }
  return getPerson
})

// 判断是否配置了人员选择
function personDataiIsEmpty(handler) {
  if (!handler || Object.keys(handler).length === 0) {
    return true
  }
  return handler.id_cards.length === 0 && handler.jobs.length === 0 && handler.organizations.length === 0 && handler.roles.length === 0 && handler.urls.length === 0 && handler.form_user.length === 0
}
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <person-select v-if="mode === 'edit'" disabled :multiple="property.multiple" :expand="property.expand" :placeholder="property.placeholder || '请选择人员'" :organization-id="org" :server="apiServer" :has-next="property.person_has_next" :org-job-idcard="property.person_id_key === 'org_job_idcard'" :clearable="property.clearable" />
    <person-select v-else v-model="form[config.id]" :multiple="property.multiple" :expand="property.expand" :placeholder="property.placeholder || '请选择人员'" :organization-id="org" :server="apiServer" :has-next="property.person_has_next" :org-job-idcard="property.person_id_key === 'org_job_idcard'" :clearable="property.clearable" :disabled="property.status === 2 || mode === 'text'" />
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped></style>
