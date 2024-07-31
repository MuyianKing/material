<script setup>
import { getCanUseValue } from '@hl/utils/common'
import CustomComp from '../../basic/CustomComp.vue'
import EditorPanelItem from '../../../form-editor/EditorPanelItem.vue'
import PreviewPanelItem from '../../../form-editor/PreviewPanelItem.vue'

import { generatePropertyByConfig } from '../../utils'

const props = defineProps({
  config: {
    type: Object,
    default() {
      return null
    },
  },
  mode: {
    type: String,
    default: 'edit',
  },
})

const emits = defineEmits(['update:config', 'ready'])

const form = defineModel({
  type: Object,
})

const list = computed({
  get: () => props.config.children,
  set: (value) => {
    emits('update:config', {
      ...props.config,
      children: value,
    })
  },
})

const self_config = {
  // 后代
  children: [[], []],
  // 删除按钮距离容器的底部的距离
  deleteBottom: '0px',
  _property_config: {
    columns: 2,
    show: [],
  },
  // 样式
  _style: {
    height: 'auto',
    minHeight: 40,
  },
}

let columns = 2
watch(() => props.config._property?.columns, (val) => {
  const new_columns = +val

  const children = list.value
  if (columns > new_columns) {
    hl.message.confirm('减少列数会清除您已经配置的内容').then(() => {
      for (let i = columns; i > new_columns; i--) {
        children.pop()
      }
      columns = new_columns || 0
    }).catch(() => {
      // 恢复原来的列数
      const config = props.config
      config._property.columns = columns
      emits('update:config', config)
    })
  } else {
    // 增加列数
    for (let i = columns; i < new_columns; i++) {
      children.push([])
    }
    columns = new_columns
  }

  emits('update:config', {
    ...props.config,
    children,
  })
})

onMounted(() => {
  emits('update:config', generatePropertyByConfig(self_config, props.config))
  nextTick(() => {
    emits('ready')
  })
})

const _style = computed(() => ({
  height: getCanUseValue(props.config._style?.height),
  minHeight: getCanUseValue(props.config._style?.minHeight),
}))
</script>

<template>
  <custom-comp :form="form" :config :mode="mode" class="flex-wrapper" :class="{ 'edit-panel': mode === 'edit' }">
    <div v-for="(row, index) in list?.length" :key="row" class="column-item" :style="_style">
      <editor-panel-item v-if="mode === 'edit'" v-model="list[index]" :style="_style" mode="edit" />
      <preview-panel-item v-else v-model="list[index]" v-model:form-data="form" mode="preview" />

      <div v-if="!list[index] || list[index].length === 0" class="tip-item">
        将组件拖放到这
      </div>
    </div>
    <slot />
  </custom-comp>
</template>

<style lang="scss" scoped>
.flex-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;

  .column-item {
    flex: 1;
    min-width: 0;
    flex-basis: 0;
    overflow: auto;
    position: relative;

    .tip-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
      color: gray;
    }
  }
}

.edit-panel {
  &.flex-wrapper {
    margin-bottom: 10px;
    padding: 10px;
  }

  .column-item {
    background-color: #f7f7f7;
    border: 1px dashed #c7c7c7;
    margin: 5px;
  }
}
</style>
