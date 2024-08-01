<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import { computed, inject } from 'vue'
import { HlIcon } from '@hl/ui'

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    },
  },
})

const emits = defineEmits(['update:modelValue'])

const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})

const { active_form_item, property_config } = toRefs(inject('editor_store'))

function handleClick(row) {
  active_form_item.value = row.id
  property_config.value = {
    property: row._property,
    _property_config: row._property_config,
    style: row._style,
    key: row.key,
  }
}

function handleReady(row) {
  handleClick(row)
}

// 删除元素
function handleDel(row) {
  const index = list.value.findIndex(item => item.id === row.id)
  list.value.splice(index, 1)

  // 激活的标签不是此标签
  if (active_form_item.value !== row.id) {
    return
  }

  // 将其他标签作为激活标签
  const new_active = list.value[index > 0 ? (index - 1) : 0]
  if (new_active) {
    handleClick(new_active)
  } else {
    // 没有可用标签
    property_config.value = null
  }
}

function handleAdd() {
  // views/form/editor/components/component-list/Index.vue组件会往list中加一个元素并触发add事件
  const last_item = list.value[list.value.length - 1]

  // 最后一个元素如果是false表示组件不能添加到编辑器中
  if (last_item === false) {
    list.value.pop()
  }
}
</script>

<template>
  <vue-draggable v-model="list" :animation="150" group="form-editor" class="editor-wrapper" @add="handleAdd">
    <div v-for="(item, index) in list" :key="item.id" class="w-full">
      <component :is="item.key" v-model:config="list[index]" class="editor-item" :class="{ active: active_form_item === item.id }" @click.stop="handleClick(item)" @ready="handleReady(item)">
        <div class="delete-icon" :style="{ bottom: item.deleteBottom }" @click.stop="handleDel(item)">
          <hl-icon icon="mi:delete" style="font-size: 16px;" />
        </div>
      </component>
    </div>
  </vue-draggable>
</template>

<style lang="scss" scoped>
.editor-wrapper {
  height: 100%;
  width: 100%;
  padding: 10px;
}

.editor-item {
  padding: 10px 5px;
  padding-left: 15px;
  position: relative;
  background-color: #fff;
  border: 1px solid #ebecee;
  cursor: move !important;

  :deep(.el-form-item__label) {
    cursor: move !important;
  }

  .delete-icon {
    cursor: pointer !important;

    * {
      cursor: pointer !important;
    }
  }
}

.editor-item.active {
  box-shadow: 4px 0 0 0px var(--color-primary) inset;
  z-index: 99;
}

.delete-icon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: var(--color-danger);
  position: absolute;
  bottom: -12px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--color-primary);
}
</style>
