<script setup>
import { computed, defineEmits, defineExpose, ref } from 'vue'
import { HlContextMenu } from '@hl/ui'

import { jump } from '@hl/utils/es/router'
import variables from '@style/theme.module.scss'
import { delTaskConfig, startTaskConfig, stopTaskConfig } from '../../../../server/config'

const emits = defineEmits(['refresh'])

const context_menu_ref = ref()

// 编辑
function handleEdit(data) {
  jump({
    type: '_blank',
    target: data?.config_id,
    path: '/task/design/base-config',
    query: {
      id: data?.config_id,
    },
  })
}

// 删除
async function handleDel(data) {
  try {
    await hl.message.confirm('确定删除该任务模板？删除后不会影响根据改模板发布的任务，如果只是暂时停用建议您【停用】模板')
    await delTaskConfig(data?.config_id)
    hl.message.success('删除成功')
    emits('refresh')
  } catch (e) {
    hl.message.error(e, '删除失败')
  }
}

// 启用或停用任务模板
async function handleChangeStatus(data) {
  try {
    if (data.is_stop) {
      await startTaskConfig(data?.config_id)
    } else {
      await stopTaskConfig(data?.config_id)
    }
    emits('refresh')
  } catch (e) {
    hl.message.error(e, '操作失败')
  }
}

function handleSelected({ option, data }) {
  if (option) {
    switch (option.value) {
      case 'edit':
        handleEdit(data)
        break
      case 'del':
        handleDel(data)
        break
      default:
        handleChangeStatus(data)
        break
    }

    emits('refresh')
  }
}

const cur_data = ref(null)
// 待选项
const options = computed(() => {
  const _opts = [{
    label: '创建任务',
    value: 'edit',
    icon: 'bx:edit',
    color: variables['color-primary'],
  }]

  if (cur_data.value?.is_stop) {
    _opts.push({
      label: '启用任务',
      value: 'start',
      icon: 'iconamoon:restart-bold',
      color: variables['color-success'],
    })
  } else {
    _opts.push({
      label: '停用任务',
      value: 'stop',
      icon: 'lets-icons:remove',
      color: variables['color-warning'],
    })
  }

  _opts.push({
    label: '删除任务',
    value: 'del',
    icon: 'mi:delete',
    color: variables['color-danger'],
  })

  return _opts
})

defineExpose({
  toggle(data) {
    cur_data.value = data
    context_menu_ref.value.toggle(data)
  },
})
</script>

<template>
  <hl-context-menu ref="context_menu_ref" :options="options" @click="handleSelected" />
</template>

<style lang='scss' scoped></style>
