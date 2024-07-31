<script setup>
import FormDetail from '../../../../../form/preview/Template.vue'
import Highlight from '../../../../../../components/task/detail/Highlight.vue'
import HandleDialog from '../../../../../../components/task/options/components/handle/components/Dialog.vue'
import ResultAudit from './ResultAudit.vue'
import Dot from './Dot.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['remove', 'refresh'])

// 翻转
function reverseData(data) {
  if (!data)
    return

  if (!props.reverse) {
    return data.toReversed()
  }

  return data
}

const interaction = ['pizhu']

const show_handle_dialog = ref(false)
function handleRefresh() {
  emits('refresh')
}

function handleSubSubmit() {
  if (props.data.modify === 1) {
    show_handle_dialog.value = true
  }
}
const show_history = ref(false)
</script>

<template>
  <el-timeline-item class="time-line-item" :timestamp="data.time" placement="top" type="success" v-bind="$attrs">
    <template #dot>
      <dot :data="data" />
    </template>
    <hl-icon v-if="data.data?.old" icon="mingcute:down-fill" title="展开" class="pen-item pen-item-close right-10" :class="{ open: show_history }" @click="show_history = !show_history" />
    <hl-icon v-if="data.modify" icon="iconoir:page-edit" class="pen-item" title="编辑" @click="handleSubSubmit" />
    <highlight :data="data" :interaction="interaction" @remove="(id) => $emit('remove', id)" />
    <form-detail v-if="data.data?.content && typeof data.data?.content === 'object' && !interaction.includes(data.type)" :form-data="data.data?.content || {}" :config="data.a_node_form" mode="text">
      <template #before="{ form }">
        <result-audit v-if="form.pass !== undefined" :data="form" />
      </template>
    </form-detail>
  </el-timeline-item>

  <template v-if="data.data?.old && show_history">
    <el-timeline-item v-for="old_item in reverseData(data.data?.old)" :key="old_item.a_time" class="time-line-item ml-5 time-line-item-second-level" :timestamp="old_item.a_time" placement="top" type="success">
      <template #dot>
        <dot :data="data" />
      </template>

      <form-detail v-if="old_item" :form-data="old_item || {}" :config="data.a_node_form" mode="text">
        <template #before="{ form }">
          <result-audit v-if="form.pass !== undefined" :data="form" />
        </template>
      </form-detail>
    </el-timeline-item>
  </template>

  <handle-dialog v-if="data.modify" v-model="show_handle_dialog" :config="data.a_node_form" :form-id="data.id" :form-data="data.data?.content || {}" :task-id="data.task_id" @refresh="handleRefresh" />
</template>

<style lang='scss' scoped>
:deep(.el-form-item) {
  margin-bottom: 0;

  .el-form-item__label {
    width: fit-content;
  }

  $height: 25px;

  .el-form-item__label {
    height: $height;
    line-height: $height;
    font-size: 13px;
    width: fit-content !important;
  }

  .el-form-item__content {
    line-height: $height;
    font-size: 13px;
  }
}

:deep(.custome-wrapper) {
  margin-bottom: 0 !important;
}

:deep(.custome-wrapper.flex-wrapper) {
  flex-direction: column;

  .column-item {
    width: 100%;
  }
}

.pen-item {
  position: absolute;
  right: 10px;
  z-index: 10;
  display: block;
  color: var(--color-primary);
  user-select: none;
  cursor: pointer;
  transition: all 0.5s;
}

.pen-item-close {
  bottom: -15px !important;
  right: 10px !important;
}
.open {
  transform: rotate(180deg);
}

.time-line-item {
  width: 100%;
  transition: all ease 0.2s;
}

.time-line-item:hover {
  background-color: var(--el-color-primary-light-8);
  border-radius: 5px;
  width: calc(100% - 10px);
}

.time-line-item-second-level {
  width: calc(100% - 20px);
  &:hover {
    width: calc(100% - 30px);
  }
  :deep(.el-timeline-item__tail) {
    border-left: 2px dashed var(--el-timeline-node-color);
  }
}
</style>
