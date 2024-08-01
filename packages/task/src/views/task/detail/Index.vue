<script setup>
import { computed, ref, useAttrs, watch } from 'vue'
import { HlDialog } from '@hl/ui'
import { ElSkeleton } from 'element-plus'

import TaskForm from '../detail/components/TaskForm.vue'
import TaskResult from '../detail/components/task-result/Index.vue'
import TaskOpt from '../../../components/task/options/Index.vue'

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
  showCtrl: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh', 'refresh-one'])
const loading = ref(false)
const dialog_ref = ref()

// 骨架屏行数
const rows = Number.parseInt((document.body.clientHeight - 170) / 36 - 1)

const $attrs = useAttrs()
watch(() => $attrs.modelValue, async (val) => {
  if (val) {
    // 签收后任务状态变了，这里更新状态
    refreshOne()
  }
})

function refresh() {
  emits('refresh')
}

function refreshOne() {
  emits('refresh-one')
}

const height = computed(() => {
  return props.task?.a_handle?.length > 0 ? 280 : 300
})
</script>

<template>
  <hl-dialog ref="dialog_ref" :title="`任务详情 - ${task?.task_id}`" top="50px" width="90%">
    <div :style="{ height: `calc(100vh - ${height}px)` }" class="task-wrapper">
      <el-skeleton :loading="loading" :rows="rows" animated>
        <task-form :config="task?.start_node?.form_config || {}" :model-value="task?.start_node?.form_content"
          class="form-wrapper" />
      </el-skeleton>
      <el-skeleton :loading="loading" :rows="rows" animated class="ml-8">
        <task-result :result="task?.result || []" class="recorder" @refresh="refreshOne" />
      </el-skeleton>
    </div>
    <template v-if="showCtrl && Object.keys(task?.a_handle_map || {}).length > 0" #footer>
      <task-opt :task="task" no-detail type="button" @refresh="refresh" @refresh-one="refreshOne" />
    </template>
  </hl-dialog>
</template>

<style lang='scss' scoped>
.task-wrapper {
  width: 100%;
  display: flex;

  &>div {
    height: 100%;
    overflow: auto;
  }

  .form-wrapper {
    min-width: 0;
    flex: 1;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
  }

  .recorder {
    width: 450px;
    margin-left: 20px;
    position: relative;
  }
}
</style>
