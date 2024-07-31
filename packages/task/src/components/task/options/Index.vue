<script setup>
import { getLabelByVal } from '@hl/utils/common'
import { task_opt_list } from '../../../default/task'
import DetailOpt from './components/Detail.vue'
import useDetailData from './useDetailData'
import RemarkOpt from './components/RemarkOpt.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  noDetail: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['refresh', 'refresh-one', 'click'])
const { task_data, outer_comp_ids, getData } = useDetailData(props.task.task_id)
provide('outer_comp_ids', outer_comp_ids)

// 生成可操作按钮
const opt_List = computed(() => {
  const opts = []

  for (const key in props.task?.a_handle_map) {
    opts.push({
      ...getLabelByVal(task_opt_list, +key, {
        obj: true,
      }),
      value: key,
      label: props.task?.a_handle_map[key],
    })
  }

  // 处理200-219以上的操作
  opts.forEach((opt) => {
    const value = +opt.value
    if (!Number.isNaN(value) && value > 199 && value < 220) {
      opt.comp = RemarkOpt
    }
  })

  return opts
})

function handleRefresh(e) {
  getData()
  emits('refresh', e)
}

function handleRefreshOne(e) {
  getData()
  emits('refresh-one', e)
}

defineExpose({
  getData,
})
</script>

<template>
  <div>
    <detail-opt v-if="!noDetail" :button="type === 'button'" :task-id="task.task_id" :task="task_data" @refresh="handleRefresh" @refresh-one="handleRefreshOne" />
    <component :is="item.comp" v-for="item in opt_List" :key="item.value" :value="item.value" :button="type === 'button'" :task-id="task.task_id" :task="task_data" @refresh="handleRefresh" @refresh-one="handleRefreshOne">
      {{ item.label }}
    </component>
  </div>
</template>

<style lang='scss' scoped>
:deep(button) {
  margin: 5px;
}

:deep(button) {
  margin-left: 5px !important;
}
</style>
