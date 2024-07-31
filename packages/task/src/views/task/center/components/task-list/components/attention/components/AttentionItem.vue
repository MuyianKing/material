<script setup>
import { setTaskList } from '../../../../../../../../server/benches'
import useBenchesStore from '../../../../../../../../pinia/modules/useBenchesStore'

defineProps({
  editable: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    default: 1,
  },
  taskType: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['refresh', 'tab-click'])

const model = defineModel({
  type: Object,
  default: null,
})

const { attention_config } = storeToRefs(useBenchesStore())

function handleEdit(type = 'edit') {
  nextTick(() => {
    attention_config.value.active_index = model.value.value
    attention_config.value.curren_list = model.value.subs
    attention_config.value.edit_type = type
    attention_config.value.show = true
  })
}

async function handleDel(index) {
  try {
    await hl.message.confirm('确定删除该分组')
    hl.message.loading('正在删除...')
    const { subs } = model.value
    subs.splice(index, 1)
    await setTaskList(attention_config.value.all_config_list)
  } catch (e) {
    hl.message.error(e, '删除失败')
    refresh()
  } finally {
    hl.message.closeLoading()
  }
}

function refresh() {
  emits('refresh')
}

function isHidden(unfinish, type) {
  return (unfinish || type === 1)
}
</script>

<template>
  <el-tabs v-if="model" v-model="model.value" :class="`tab-style-${level}`" @tab-click="emits('tab-click', model)">
    <el-tab-pane v-if="level === 1" :class="`tab-item-${level}`" :name="-1">
      <template #label>
        <span :class="{ active_item: model.value === -1 }" class="panel-item">
          全部任务
        </span>
      </template>
    </el-tab-pane>

    <el-tab-pane v-for="(item, index) in model.subs" :key="index" :class="`tab-item-${level}`" :name="index">
      <template #label>
        <el-badge :class="{ active_item: model.value === index }" :hidden="isHidden(!item.unfinish, taskType)" :max="99" :offset="[0, 8]" :value="item.unfinish" class="panel-item">
          <span class="select-none" @dblclick.stop="handleEdit('edit')">{{ item.title }}</span>
          <hl-icon v-if="editable && !item.all" class="trash-item" icon="ci:trash-full" @click.stop="handleDel(index)" />
        </el-badge>

        <hl-icon v-if="index === model.subs.length - 1 && editable" class="plus-icon" icon="bx:bxs-folder-plus" @click="handleEdit('add')" @click.stop />
      </template>

      <attention-item v-if="item.subs" v-model="model.subs[index]" :editable :task-type :level="level + 1" @refresh="refresh" @tab-click="emits('tab-click', $event)" />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang='scss' scoped>
.plus-icon {
  color: var(--color-primary);
  margin-left: 5px;
  font-size: 22px;
  position: absolute;
  right: -62px;
  transform: translateX(-100%);
  cursor: pointer;
}

.trash-item {
  cursor: pointer;
  font-size: 20px;
  margin-left: 2px;
  color: var(--color-danger);
}

.panel-item {
  background-color: rgb(246 246 246);
  padding: 5px 10px;
  border-radius: 3px;
  color: #a0a0a0;
  font-weight: bold;
  min-width: 100px;
  display: flex;
  justify-content: center;
}

:deep(.el-tabs__header) {
  margin-bottom: 5px !important;

  .el-tabs__nav-wrap::after {
    background-color: transparent !important;
  }

  .el-tabs__item {
    padding-left: 0;
    height: 32px;
  }

  .active_item {
    color: var(--color-primary);
  }
}

.tab-style-2 {
  :deep(.el-tabs__active-bar) {
    background-color: transparent !important;
  }

  .active_item {
    background-color: var(--el-color-primary-light-8);
  }
}

.tab-style-3 {
  :deep(.el-tabs__active-bar) {
    background-color: var(--color-primary) !important;

    &::after,
    &::before {
      content: '';
      width: 25%;
      height: 4px;
      background-color: #fff;
      display: block;
      position: absolute;
    }

    &::after {
      right: 0;
    }
  }

  .panel-item {
    background-color: #fff;
    min-width: 0;
    padding: 0 20px;
  }

  .active_item {
    background-color: #fff;
  }
}
</style>
