<script setup>
import { nextTick, ref } from 'vue'
import { HlBlockTitle, HlIcon } from '@hl/ui'

import WrapperComp from '../../components/Wrapper.vue'
import TableList from './components/table-list/Index.vue'

const editing = ref(false)
const task_list_ref = ref()

const height = ref('60px')
function handleRefresh(params) {
  height.value = params?.val !== -1 ? '95px' : '60px'
}

defineExpose({
  handleSearch(params) {
    nextTick(() => {
      task_list_ref.value && task_list_ref.value.handleSearch(params)
    })
  },
})
</script>

<template>
  <wrapper-comp>
    <template #title>
      <div class="flex items-center">
        <hl-block-title>
          警种服务
        </hl-block-title>
        <hl-icon v-if="editing" class="plus-icon" icon="bx:bxs-folder-plus" />
      </div>
    </template>
    <template #right>
      <div v-if="false" :class="{ editing }" class="edit-item" @click="editing = !editing">
        <hl-icon icon="mage:edit-fill" />
        <span class="ml-1">{{ editing ? '退出' : '编辑' }}</span>
      </div>
    </template>
    <table-list ref="task_list_ref" :editing @refresh="handleRefresh" />
  </wrapper-comp>
</template>

<style lang='scss' scoped>
:deep(.search-page) {
  padding: 0 !important;

  .table-body,
  .search-area {
    padding: 0 !important;
  }
}

.plus-icon {
  color: var(--color-primary);
  margin-left: 20px;
  font-size: 22px;
  cursor: pointer;
}

.edit-item {
  color: var(--color-primary);
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.editing {
  color: var(--color-danger);
}
</style>
