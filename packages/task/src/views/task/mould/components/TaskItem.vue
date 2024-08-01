<script setup>
import { onMounted, ref, watch } from 'vue'

import { jump } from '@hl/utils/es/router'
import { HlIcon } from '@hl/ui'
import { delTaskConfig, startTaskConfig, stopTaskConfig } from '../../../../server/config'
import UploadTask from '../../../../components/task/upload/UploadTask.vue'
import { downloadTemplate } from '../../../../utils'
import TaskItemBottom from './TaskItemBottom.vue'

const props = defineProps({
  rootData: {
    type: Object,
    default: null,
  },
  data: {
    type: Object,
    default: null,
  },
})
const emits = defineEmits(['publish', 'refresh'])
const options = ref([])

function setOptions() {
  options.value = []
  if (props.data?.can_create) {
    options.value.push({
      label: '创建任务',
      value: 'publish',
      icon: 'grommet-icons:send',
      className: 'left-top',
    })
  }

  if (props.data?.can_modify) {
    options.value.push({
      label: '修改任务',
      value: 'edit',
      icon: 'mage:edit',
      className: 'right-top',
    })
    options.value.push({
      label: '删除任务',
      value: 'remove',
      icon: 'material-symbols:delete-rounded',
      className: 'left-bottom',
    })

    if (props.data?.is_stop) {
      options.value.push({
        label: '启用任务',
        value: 'change',
        icon: 'iconamoon:restart-bold',
        className: 'right-bottom',
      })
    } else {
      options.value.push({
        label: '停用任务',
        value: 'change',
        icon: 'ant-design:stop-outlined',
        className: 'right-bottom',
      })
    }
  }

  if (props.data?.can_create) {
    options.value.push({
      label: '模板下载',
      value: 'template_download',
      icon: 'uil:import',
      className: 'right-bottom',
    })
  }
}

// 启用或停用任务模板
async function handleChangeStatus(task) {
  try {
    if (task.is_stop) {
      await startTaskConfig(task?.config_id)
    } else {
      await stopTaskConfig(task?.config_id)
    }
    emits('refresh')
    hl.message.success('操作成功')
  } catch (e) {
    hl.message.error(e, '操作失败')
  }
}

// 编辑
function handleEdit(task) {
  jump({
    type: '_blank',
    target: task?.config_id,
    path: '/task/design/base-config',
    query: {
      id: task?.config_id,
    },
  })
}

// 模板下载
function handleExportTemplate(task) {
  downloadTemplate(task?.config_id)
}

// 删除
async function handleDel(task) {
  try {
    await hl.message.confirm('确定删除该任务模板？删除后不会影响根据改模板发布的任务，如果只是暂时停用建议您【停用】模板')
    await delTaskConfig(task?.config_id)
    hl.message.success('删除成功')
    emits('refresh')
  } catch (e) {
    hl.message.error(e, '删除失败')
  }
}

function handleClick(item) {
  if (item) {
    switch (item.value) {
      case 'edit':
        handleEdit(props.data)
        break
      case 'remove':
        handleDel(props.data)
        break
      case 'publish':
        emits('publish', props.data)
        break
      case 'change':
        handleChangeStatus(props.data)
        break
      case 'template_download':
        handleExportTemplate(props.data)
        break
    }
  }
}

watch(() => props.rootData, () => {
  setOptions()
})

onMounted(() => {
  setOptions()
})
</script>

<template>
  <div class="task-item">
    <task-item-bottom :data="data" />
    <div v-if="data.can_create || data.can_modify" class="mark">
      <div class="content">
        <div v-for="item in options" :key="item.className" :class="item.className" class="item" @click="handleClick(item)">
          <hl-icon :icon="item.icon" class="mr-1" />
          {{ item.label }}
        </div>
        <div v-if="data?.can_create" class="item">
          <upload-task v-if="data?.can_create" :config-uuid="data.config_uuid" @refresh="$emit('refresh')">
            <template #default="{ loading }">
              <hl-icon v-if="!loading" class="mr-1 icon" icon="material-symbols:downloading-rounded" />
              <hl-icon v-else class="mr-1" icon="line-md:uploading-loop" />
              <span class="upload-text">导入任务</span>
            </template>
          </upload-task>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.task-item {
  width: 380px;
  padding: 12px 14px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover .mark {
    opacity: 1;
    z-index: 10;
    transform: scale(1);
  }

  .mark {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    z-index: -10;
    transition: all 0.5s;
    transform: scale(1.5);

    .content {
      width: 80%;
      height: fit-content;
      min-height: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .item {
      margin: 5px;
      width: 45%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      font-size: 15px;
      transition: all 0.3s;
      user-select: none;
      min-height: 32px;

      &:hover {
        background-color: rgba(211, 227, 253);
      }
    }
  }

  .dropdown-item {
    color: white;
    border-left: 1px solid #e9e9e9;
    margin-left: 5px;
    padding-left: 2px;
    height: 12px;
    cursor: pointer;

    svg {
      position: relative;
      top: -2px;
    }
  }
}

.publish-item {
  background-color: var(--color-warning);
}

.stop-item {
  background-color: var(--color-info);
}

.icon {
  transform: rotateX(180deg);
}
</style>
