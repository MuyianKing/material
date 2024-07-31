<script setup>
import { guid } from '@hl/utils/common'
import { getFormById } from '../../../server/form'
import ComponentList from './components/component-list/Index.vue'
import EditorPanel from './components/editor-panel/Index.vue'
import ConfigComp from './components/config/Index.vue'
import FooterComp from './components/Footer.vue'

import EditorStore from './store.js'

const props = defineProps({
  formId: {
    type: [Number, String],
    default: '',
  },
  // 是否是开始节点
  isStart: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['save-success'])

const editorStore = reactive(new EditorStore())

provide('editor_store', editorStore)

function getData() {
  const route = useRoute()

  let form_id = props.formId
  if (route.path === '/form/editor/index') {
    form_id = route.query.id
  }

  if (form_id) {
    getFormById(form_id).then((data) => {
      editorStore.id = data.id
      editorStore.form_field_list = data.form_field_list
      editorStore.form_config = data.form_config
    }).catch((e) => {
      hl.message.error(e, '获取表单数据出错')
    })
  } else if (props.isStart) {
    editorStore.form_field_list.push({
      id: `FormTitle_${guid()}`,
      key: 'FormTitle',
    })
  }
}

function handleCreated(row) {
  emits('save-success', row)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="form-editor-wrapper">
    <div class="form-editor-content">
      <!-- 组件列表 -->
      <component-list class="comp-list" />

      <!-- 表单区域 -->
      <editor-panel class="editor-panel" />

      <!-- 标签配置 -->
      <config-comp class="property-config" />
    </div>
    <footer-comp :is-start="isStart" @created="handleCreated" />
  </div>
</template>

<style lang="scss" scoped>
.form-editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.form-editor-content {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f5f6f6;
  flex: 1;
  min-height: 0;

  .comp-list {
    width: 300px;
  }

  .editor-panel {
    min-width: 0;
    flex: 1;
  }

  .property-config {
    width: 350px;
    background-color: #fff;
  }
}
</style>
