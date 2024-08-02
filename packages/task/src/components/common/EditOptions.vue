<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import { HlDelButton, HlIcon, HlInput } from '@hl/ui'
import { ElTooltip } from 'element-plus'
import 'element-plus/es/components/tooltip/style/css'
import '@hl/ui/src/components/del-button/Index.css'
import '@hl/ui/src/components/icon/Index.css'
import '@hl/ui/src/components/input/Index.css'

defineProps({
  title: {
    type: String,
    default: '选项设置',
  },
  addTitle: {
    type: String,
    default: '新增选项',
  },
})

const options = defineModel({
  type: Array,
  default: [],
})

// 添加
function handleAdd() {
  const cur_value = options.value.map(item => +item.value)

  // 默认以选项长度作为value
  let index = options.value.length

  // 判断当前选项值是否已经存在
  for (; index < 1000; index++) {
    if (!cur_value.includes(index)) {
      break
    }
  }

  options.value.push({
    label: `选项${index}`,
    value: `选项${index}`,
  })
}
// 删除
function handleDel(index) {
  options.value.splice(index, 1)
}
</script>

<template>
  <div class="options-wrapper">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center">
        <span class="edit-title">{{ title }}</span>
        <el-tooltip placement="right" effect="light">
          <hl-icon class="ml-1" icon="ep:question-filled" />
          <template #content>
            <div>您可以拖动左侧的图标或《选项》进行排序</div>
          </template>
        </el-tooltip>
      </div>
      <div class="add-title" @click="handleAdd">
        <hl-icon icon="icon-park-outline:add-one" />
        <span class="ml-1">{{ addTitle }}</span>
      </div>
    </div>
    <div class="mt-2">
      <vue-draggable v-model="options" ghost-class="ghost-item" handle=".handle">
        <div v-for="(item, index) in options" :key="item.value" class="option-item">
          <hl-icon icon="eva:move-fill" class="flex-shrink-0 handle" style="font-size: 18px;" />
          <div class="flex ml-2 w-full">
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 handle">
                选项
              </div>
              <hl-input v-model="item.label" class="ml-2 w-full" :disabled="item.readonly" @change="() => item.value = item.label" />
            </div>
            <!-- <div class="flex ml-3 items-center">
              <div class="flex-shrink-0">
                选项值
              </div>
              <hl-input v-model="item.value" class="ml-2" :disabled="item.readonly" />
            </div> -->
          </div>
          <hl-del-button v-if="!item.readonly" class="flex-shrink-0 ml-2" text="" message="一旦删除如果此表单下发过任务，该项数据将无法统计，您可以尝试修改选项" @click="handleDel(index)" />
        </div>
      </vue-draggable>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.options-wrapper {
  width: 100%;
  color: var(--el-text-color-regular);
  user-select: none;

  .edit-title {
    flex: 1;
    font-size: 15px;
  }

  .add-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
  }

  .add-title:hover {
    color: lightgray;
  }

  .option-item {
    cursor: move;
    display: flex;
    align-items: center;
    background-color: rgb(247, 247, 247);
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }

  .ghost-item {
    background-color: rgb(149, 175, 245);
    color: white;
  }
}
</style>
