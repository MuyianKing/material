<script setup>
import TaskTabs from '../../../components/task/task-tabs/Index.vue'
import TaskTable from './components/Table.vue'

const route = useRoute()
const CONFIG_UUID = route.meta.params.config_uuid

const tabs_ref = ref()

function getTabs() {
  tabs_ref.value?.getTabs()
}
</script>

<template>
  <task-tabs ref="tabs_ref" :config-uuid="CONFIG_UUID">
    <template #default="{ data }">
      <task-table :params="data.params" :config-uuid="CONFIG_UUID" @refresh="getTabs" />
    </template>
  </task-tabs>
</template>

<style scoped lang="scss">

</style>
