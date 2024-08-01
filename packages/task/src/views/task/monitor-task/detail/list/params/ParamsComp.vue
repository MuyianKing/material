<script setup>
import { HlDate, HlInput, HlSelect } from '@hl/ui'

import { Organization, PersonSelect } from '@hl/tyyh'
import TaskMould from '../../../../../../components/task/TreeSelect.vue'
import GroupSelect from '../../../../../../components/task/GroupSelect.vue'

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
    <hl-input v-if="config.type === 'FormInput'" v-model="query" style="width: 180px" @change="handleSearch" />
    <group-select v-else-if="config.type === 'group_name'" v-model="query" style="width: 177px" @change="handleSearch" />
    <hl-select v-else-if="config.type === 'FormSelect'" v-model="query" :max-collapse-tags="1" :options="config.options" collapse-tags multiple style="width: 177px;" @change="handleSearch" />
    <organization v-else-if="config.type === 'FormOrg'" v-model="query" :max-collapse-tags="1" check-strictly filterable multiple ollapse-tags style="width: 177px;" @change="handleSearch" />
    <hl-date v-else-if="['FormDate', 'FormDeadline'].includes(config.type)" v-model="query" date-type="datetime" format="YYYY-MM-DD HH:mm:ss" type="range" @change="handleSearch" />
    <person-select v-else-if="config.type === 'id_card'" v-model="query" style="width: 177px" type="range" />
    <task-mould v-else-if="config.type === 'config_uuid'" v-model="query" :max-collapse-tags="1" collapse-tags multiple style="width: 177px" />
    <hl-input v-else v-model="query" style="width: 180px" @change="handleSearch" />
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
