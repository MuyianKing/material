<script setup>
import { HlDropdownCascader } from '@hl/ui'
import { getList } from '../../server/organization'

const props = defineProps({
  filterable: {
    type: Boolean,
    default: false,
  },
  dictValue: {
    type: String,
  },
  type: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  queryParams: {
    type: Object,
    default: () => ({}),
  },
  checkStrictly: {
    type: Boolean,
    default: false,
  },
})

const data_list = ref([])

function getData() {
  getList(props.queryParams).then((data) => {
    data_list.value = data.data[0]?.sub_organization || []
    appendSelfToChildren(data_list.value)
  }).catch((e) => {
    hl.message.error(e, '获取单位出错')
  })
}

function appendSelfToChildren(data) {
  data.forEach((item) => {
    if (item.sub_organization && item.sub_organization.length > 0) {
      appendSelfToChildren(item.sub_organization)
      item.sub_organization.unshift({
        organization_id: item.organization_id,
        organization_name: item.organization_name,
      })
    }
  })
}

const _props = computed(() => ({
  value: 'organization_id',
  label: 'organization_name',
  children: 'sub_organization',
  emitPath: false,
  multiple: props.multiple,
  checkStrictly: props.checkStrictly,
}))

onMounted(() => {
  getData()
})
</script>

<template>
  <hl-dropdown-cascader :cascader-props="_props" :has-search="filterable" :options="data_list" />
</template>

<style scoped></style>
