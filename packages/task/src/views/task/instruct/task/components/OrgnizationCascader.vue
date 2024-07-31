<script setup>
import { getJzzlOrg } from '../../../../../server/instruct'

const props = defineProps({
  modelValue: {
    type: [Array, String, Number],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])
const data_list = ref([])

function getData() {
  getJzzlOrg().then((data) => {
    data_list.value = (data.data || []).filter(item => item)
    appendSelfToChildren(data_list.value)
  }).catch((e) => {
    hl.message.error(e, '获取职务出错')
  })
}

function appendSelfToChildren(data) {
  data.forEach((item) => {
    if (item && item.sub_organization && item.sub_organization.length > 0) {
      appendSelfToChildren(item.sub_organization)
      item.sub_organization.unshift({
        organization_id: item.organization_id,
        organization_name: item.organization_name,
      })
    }
  })
}

function handleChange(val) {
  emits('update:modelValue', val)
}

const _props = computed(() => ({
  value: 'organization_id',
  label: 'organization_name',
  children: 'sub_organization',
  multiple: props.multiple,
  emitPath: false,
  checkStrictly: props.checkStrictly,
}))

onMounted(() => {
  getData()
})
</script>

<template>
  <el-cascader :class="{ isReadonly: props.readonly }" :model-value="modelValue" :options="data_list" :props="_props"
               clearable @change="handleChange"
  />
</template>

<style lang="scss">
.el-cascader.isReadonly {
  pointer-events: none;

  .el-input__wrapper {
    box-shadow: none !important;
    padding-left: 0;

    .el-input__suffix {
      display: none !important;
    }
  }

  .el-cascader__tags {
    .el-tag__close {
      display: none !important;
    }
  }
}
</style>
