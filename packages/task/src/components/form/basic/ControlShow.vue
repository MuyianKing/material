<script setup>
import { getLabelByVal, guid } from '@hl/utils/es/common'
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { HlDelButton, HlDropdown, HlIcon, HlInput, HlSelect } from '@hl/ui'
import { show_huo_qie, show_opt_type } from '../../../default/form'

const props = defineProps({
  // 所有字段
  formFieldList: {
    type: Array,
    default: null,
  },
  // 选中的字段：也就是排除的字段
  activeFormItem: {
    type: String,
    default: '',
  },
  extendConfig: {
    type: Array,
    default: null,
  },
})

const options = [{
  label: '自定义',
  value: 1,
}]

const config = defineModel({
  type: Array,
  default() {
    return []
  },
})

const field_list = ref([])
const select_map = ref({})
const deBounceGetAllField = useDebounceFn(() => {
  select_map.value = {}
  field_list.value = getAllField(props.formFieldList)

  if (props.extendConfig) {
    props.extendConfig.forEach((item) => {
      field_list.value.push(item)
      select_map.value[item.value] = item.config
    })
  }
}, 100)

// 获取所有的待选项
function getAllField(fields) {
  const all_field = []
  fields.forEach((field) => {
    if (field.children?.length > 0) {
      all_field.push({
        label: field.node_name,
        value: field.node_id,
        children: getAllField(field.children),
      })
    } else {
      const property = field._property
      if (property) {
        if (property.editable && field.id !== props.activeFormItem) {
          const config = {
            label: property.label,
            value: field.id,
          }
          const _config = {}

          if (['FormSelect', 'FormLevel'].includes(field.key)) {
            _config.options = property.options || []
            _config.type = 'select'
          } else if (field.key === 'FormTaskUser') {
            _config.type = 'TaskUser'
          } else {
            _config.type = field.key
          }

          if (Object.keys(_config).length > 0) {
            select_map.value[field.id] = _config
            all_field.push(config)
          }
        }
      }
    }
  })

  return all_field.filter(item => (item.children === undefined || item.children.length > 0) && item.is_range !== true)
}

// 添加
function handleAdd() {
  if (config.value.length !== 0) {
    config.value.push({
      id: guid(),
      type: 'options',
      value: 'qie',
    })
  }

  config.value.push({
    id: guid(),
    type: 'condition',
    field: '',
    opt: 'equal',
    value: '',
  })
}

// 删除
function handleDel(index) {
  // 最后一个往前删一个
  config.value.splice(index === config.value.length - 1 ? index - 1 : index, 2)
}

watch(() => props.activeFormItem, () => {
  if (props.activeFormItem || props.formFieldList) {
    deBounceGetAllField()
  }
}, {
  immediate: true,
})

watch(() => props.formFieldList, () => {
  if (props.formFieldList) {
    deBounceGetAllField()
  }
}, {
  deep: true,
  immediate: true,
})

const value_config = ref({})

function handleChange(val) {
  value_config.value = getLabelByVal(field_list.value, val, { obj: true })
}

function getPlaceholder(row) {
  if (!row.field) {
    return '请选择'
  }
  if (Array.isArray(row.field)) {
    return row.field?.join(',')
  }
  return row.field
}
</script>

<template>
  <div class="controll-wrapper">
    <div class="w-full flex justify-between">
      <div class="edit-title">
        条件设置
      </div>
      <div class="add-title" @click="handleAdd">
        <hl-icon icon="icon-park-outline:add-one" />
        <span class="ml-1">添加条件</span>
      </div>
    </div>

    <div class="w-full">
      <template v-for="(item, index) in config" :key="item.id">
        <div v-if="item.type === 'condition'" class="condition-item">
          <append-content class="bg-white" style="min-width:0;flex:3">
            <template #prepend>
              <hl-select v-model="item.source" :options="options" style="min-width:90px" placeholder="非必选" />
            </template>
            <el-cascader v-if="item.source !== 1" v-model="item.field" :options="field_list" :placeholder="getPlaceholder(item)" @change="handleChange" />
            <hl-input v-else v-model="item.field" />
          </append-content>
          <hl-dropdown v-model="item.opt" :options="show_opt_type" no-arrow label="auto" />

          <hl-select v-if="select_map[item.field[1] || item.field]?.type === 'select'" v-model="item.value" style="flex:2" :options="select_map[item.field[1] || item.field].options" />
          <hl-input v-else v-model="item.value" style="flex:2" />
          <hl-del-button text="" @click="handleDel(index)" />
        </div>
        <div v-else class="flex justify-center w-full">
          <div style="min-width:0;flex:3" />
          <hl-dropdown v-model="item.value" :options="show_huo_qie" no-arrow label="auto" />
          <div style="min-width:0;flex:2;margin-right: 24px;" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.controll-wrapper {
  width: 100%;
  color: var(--el-text-color-regular);
  user-select: none;

  .edit-title {
    flex: 1;
    font-size: 15px;
  }

  .add-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
  }

  .add-title:hover {
    color: lightgray;
  }

  .condition-item {
    background-color: rgb(247, 247, 247);
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0;
    display: flex;
    align-items: center;

    & > .el-input,
    & > .el-select {
      flex: 1;
      flex-shrink: 0;
    }
  }

  :deep(.label-item) {
    color: var(--color-primary);
    margin: 0 5px;
    font-size: 14px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
