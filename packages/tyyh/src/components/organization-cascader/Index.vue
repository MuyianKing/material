<script setup>
import { getList, getOrgInfo } from '../../server/organization'

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
  clearable: {
    type: Boolean,
    default: false,
  },
  organizationId: {
    type: String,
    default: '',
  },
  filterable: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])
const data_list = ref([])
const orgs = ref([])

function getData() {
  if (props.readonly) {
    let ids = [props.modelValue]
    if (Array.isArray(props.modelValue)) {
      ids = []
      props.modelValue.forEach((item) => {
        if (Array.isArray(item)) {
          ids.push(item[item.length - 1])
        } else {
          ids.push(item)
        }
      })
    }

    getOrgInfo(ids.join(',')).then((data) => {
      orgs.value = data
    }).catch((e) => {
      hl.message.error(e, '获取单位出错')
    })
  } else {
    getList({
      organization_id: props.organizationId,
    }).then((data) => {
      data_list.value = data.data[0]?.sub_organization || []
      appendSelfToChildren(data_list.value)
    }).catch((e) => {
      hl.message.error(e, '获取单位出错')
    })
  }
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
  <el-cascader v-if="!readonly" v-bind="$attrs" :model-value="modelValue" :options="data_list" :props="_props" :clearable="clearable" @change="handleChange" :filterable/>
  <div v-bind="$attrs">
    <span v-for="item in orgs" :key="item.id" class="m-2">{{ item.organization_nick }}</span>
  </div>
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
