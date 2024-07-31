<script setup>
import { getTaskTree } from '../../../../../../../server/config'
import TaskPublish from '../../../../../publish/Index.vue'

const task_temp_list = ref([])
async function getTaskTemplate() {
  try {
    const tree_data = await getTaskTree()
    tree_data.forEach((item) => {
      item.children = item._task_config_list.filter(item => item.can_create === 1).map((item) => {
        return {
          label: item.config_name,
          value: item.config_uuid,
          type: 'model',
        }
      })
    })

    task_temp_list.value = tree_data.filter(item => item._task_config_list?.length > 0).map((item) => {
      return {
        label: item.group_name,
        value: item.group_id,
        children: item.children,
      }
    })
    console.log(task_temp_list.value)
  } catch (e) {
    hl.message.error(e, '获取任务模板数据出错')
  }
}

const show_publish = ref(false)
const puiblish_id = ref('')
const dropdown_ref = ref()
function handleNodeClick({ value, type }) {
  if (type === 'model') {
    puiblish_id.value = value
    show_publish.value = true
    dropdown_ref.value?.handleClose()
  }
}

onMounted(() => {
  getTaskTemplate()
})
</script>

<template>
  <el-dropdown ref="dropdown_ref" placement="bottom-end" max-height="600" popper-class="task-center-create-task-dropdown">
    <el-link v-if="task_temp_list" type="primary" class="cursor-pointer ml-4 select-none" v-bind="$attrs">
      <span>创建任务</span>
      <hl-icon icon="iconamoon:arrow-down-2-thin" />
    </el-link>
    <template #dropdown>
      <el-tree :data="task_temp_list" default-expand-all @node-click="handleNodeClick" />
    </template>
  </el-dropdown>

  <task-publish v-model="show_publish" :config-id="puiblish_id" />
</template>

<style  lang="scss">
.task-center-create-task-dropdown {
  width: 150px;
  padding: 10px !important;
  user-select: none;
}
</style>
