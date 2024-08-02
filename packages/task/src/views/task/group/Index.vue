<script name="TaskGroupIndex" setup>
import { ref, toRefs } from 'vue'
import { HlAddButton, HlFormItem, HlGridLayout, HlInput, HlNodata } from '@hl/ui'

import { useList } from '@hl/jooks'
import { useDraggable } from 'vue-draggable-plus'
import { vLoading } from 'element-plus'
import { getList, sortGroup } from '../../../server/group'
import GroupItem from './components/GroupItem.vue'
import GroupEdit from './components/Edit.vue'
import 'element-plus/es/components/loading/style/css'
import '@hl/ui/src/components/add-button/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/grid-layout/Index.css'
import '@hl/ui/src/components/input/Index.css'
import '@hl/ui/src/components/nodata/Index.css'

const {
  HlListPage,
  query,
  table_data,
  search,
  loading,
} = useList({
  query: {
    group_name: '',
  },
  server: getList,
})

// 新增|编辑
const show_edit = ref(false)
const edit_data = ref(null)

function handleEdit(row) {
  edit_data.value = row
  show_edit.value = true
}

// 更新排序
function onUpdate() {
  sortGroup(table_data.data.map(item => item.group_id)).catch((e) => {
    hl.message.error(e, '排序出错')
  })
}

// 设置拖拽
const { data } = toRefs(table_data)
const draggable_ref = ref()
useDraggable(draggable_ref, data, {
  ghostClass: 'ghost',
  onUpdate,
})
</script>

<template>
  <div :class="{ 'no-data': data.length === 0 }" class="list-page">
    <hl-list-page no-add>
      <template #search>
        <hl-form-item label="分组名称">
          <hl-input v-model="query.group_name" @change="search" />
        </hl-form-item>
      </template>
      <template #button>
        <hl-add-button v-resources="'task.group.create'" @click="handleEdit(null)" />
      </template>
      <template #table>
        <hl-grid-layout ref="draggable_ref" v-loading="loading" :min-width="350" :width="350" class="w-full">
          <group-item v-for="group in data" :key="group.group_id" :data="group" @dblclick="handleEdit(group)"
            @refresh="search" />
        </hl-grid-layout>
        <hl-nodata v-if="data.length === 0" class="relative-center" text="暂无分组" width="500px" />
      </template>

      <group-edit v-model="show_edit" :data="edit_data" @refresh="search" />
    </hl-list-page>
  </div>
</template>

<style lang='scss' scoped>
.ghost {
  background-color: #b7e7f3 !important;
}

.list-page {
  width: 100%;
  background-color: transparent;
  height: 100%;

  :deep(.table-body) {
    background-color: transparent !important;
    padding: 0 !important;
  }
}

.no-data {
  :deep(.table-body) {
    background-color: #fff !important;
  }
}
</style>
