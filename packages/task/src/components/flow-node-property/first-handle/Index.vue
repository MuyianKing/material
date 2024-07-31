<script setup>
import AppendContent from '../../common/AppendContent.vue'
import NodeOuter from '../../flow/NodeOuter.vue'
import useFlowStore from '../../../../../../packages/task/src/pinia/modules/useFlowStore.js'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  handleType: {
    type: String,
    default: 'first',
  },
})

const getLf = inject('getLf')
const { node } = storeToRefs(useFlowStore())

const value = defineModel()

// 过滤出任务期限组件
function filter(list) {
  return list.filter(item => item.key === 'FormDeadline')
}

const config = {
  first: {
    value_key: 'first_value',
    unit_key: 'first_unit',
    label: '初次处置期限',
  },
  second: {
    value_key: 'second_value',
    unit_key: 'second_unit',
    label: '再次处置期限',
  },
}

const form_ids = ref(null)
watch(node, () => {
  const lf = getLf()
  if (lf) {
    // 获取发起节点的配置
    const cells = lf.getGraphData()
    form_ids.value = cells.nodes.map(item => ({
      form_id: item.properties?.form_id,
      node_name: item.properties?.base_config.title,
    })).filter(item => item.form_id)
  }
}, {
  immediate: true,
})

const _type_config = computed(() => config[props.handleType])
</script>

<template>
  <hl-form-item :label="label || node.base_config.first_handle_hour_label || _type_config.label">
    <append-content>
      <hl-input v-if="value[_type_config.unit_key] === 1 || value[_type_config.unit_key] === 2" v-model="value[_type_config.value_key]" type="number" />
      <node-outer v-show="value[_type_config.unit_key] === 3" v-model="value[_type_config.value_key]" :form-config="form_ids" :filter-fun="filter" />
      <hl-select v-if="value[_type_config.unit_key] === 4" />
      <template #append>
        <el-select v-model="value[_type_config.unit_key]" placeholder="请选择通知类型" style="width: 115px;" @change="value[_type_config.value_key] = ''">
          <el-option label="天" :value="1" />
          <el-option label="小时" :value="2" />
          <el-option label="表单内配置" :value="3" />
        </el-select>
      </template>
    </append-content>
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
