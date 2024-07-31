<script setup>
import { OrgCascader, PersonSelect } from '@hl/tyyh'

import TaskMould from './TreeSelect.vue'
import GroupSelect from './GroupSelect.vue'

defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['search'])

const query = defineModel()

function handleSearch() {
  emits('search')
}
</script>

<template>
  <div class="query-comp">
    <hl-input v-if="config.type === 'string'" v-model="query[config.item]" :placeholder="`请输入${config.name}`" @change="handleSearch" />
    <group-select v-if="config.type === 'group_name'" v-model="query[config.item]" :placeholder="`请选择${config.name}`" style="width: 177px" @change="handleSearch" />
    <hl-select v-else-if="config.type === 'select' || config.type === 'radio'" v-model="query[config.item]" :placeholder="`请选择${config.name}`" :max-collapse-tags="1" :options="config.options" collapse-tags :multiple="config.type === 'select'" style="width: 177px;" @change="handleSearch" />
    <org-cascader v-else-if="config.type === 'organization'" v-model="query[config.item]" :placeholder="`请选择${config.name}`" :max-collapse-tags="1" check-strictly multiple ollapse-tags style="width: 177px;" />
    <hl-date v-else-if="config.type === 'date'" v-model="query[config.item]" :placeholder="`请输入${config.name}`" date-type="datetime" format="YYYY-MM-DD HH:mm:ss" type="range" />
    <person-select v-else-if="config.type === 'id_card'" v-model="query[config.item]" :placeholder="`请选择${config.name}`" style="width: 177px" type="range" />
    <task-mould v-else-if="config.type === 'config_uuid'" v-model="query[config.item]" :max-collapse-tags="1" collapse-tags multiple style="width: 177px" />
  </div>
</template>

<style lang="scss" scoped>
.query-comp {
  :deep(.el-select__selection) {
    height: 24px !important;
    flex-wrap: nowrap;
    align-items: center;
  }

  :deep(.el-cascader__tags) {
    height: 24px !important;
    flex-wrap: nowrap;
    align-items: center;

    .el-tag {
      max-width: calc(100% - 50px) !important;
    }
  }

  :deep(.el-input__inner) {
    height: 32px !important;
  }
}
</style>
