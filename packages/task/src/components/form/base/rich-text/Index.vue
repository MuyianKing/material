<script setup>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { jsonparse } from '@hl/utils/common'
import CustomEditableComp from '../../basic/CustomEditableComp.vue'

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

const self_config = {
  _property_config: {
    editable: true,
    label: {
      is_config: true,
      default: '',
      hide: true,
    },
    label_width: {
      is_config: true,
      default: '0px',
      hide: true,
    },
    label_id: '',
    show: [],
    default_value: {
      type: 'rich_text',
      value: '',
    },
    // 1-正常状态 2-只读
    status: 1,
  },
  // 样式
  _style: {},
}

function sinicize() {
  const TOOLBAR_TILTE = {
    'ql-bold': ['加粗'],
    'ql-italic': ['倾斜'],
    'ql-underline': ['下划线'],
    'ql-strike': ['删除线'],
    'ql-blockquote': ['块引用'],
    'ql-script': ['下标', '上标'],
    'ql-list': ['编号列表', '项目符号列表'],
    'ql-indent': ['减少缩进量', '增加缩进量'],
    'ql-align': ['对齐', '左对齐', '居中', '右对齐', '两端对齐'],
    'ql-color': ['字体颜色'],
    'ql-background': ['文本突出显示颜色'],
    'ql-size': ['字号'],
    'ql-header': ['标题'],
    'ql-link': ['链接'],
    'ql-image': ['图片'],
    'ql-clean': ['清除样式'],
  }
  for (const key in TOOLBAR_TILTE) {
    Array.from(
      container_ref.value.querySelectorAll(
        `.ql-toolbar .ql-formats > .${key}`,
      ),
    ).forEach((item, index) => {
      if (key === 'ql-align') {
        Array.from(item.querySelectorAll('[role=button]')).forEach(
          (role, rIndex) => {
            role.title = TOOLBAR_TILTE[key][rIndex]
          },
        )
      } else {
        item.title = TOOLBAR_TILTE[key][index]
      }
    })
  }
}

const container_ref = ref()
const editor_ref = ref()
const form = defineModel()
onMounted(() => {
  emits('update:config', generatePropertyByConfig(self_config, props.config))

  nextTick(() => {
    const editor = new Quill(editor_ref.value, {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题 —— 下拉选择
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ align: [] }], // 对齐方式// text direction'
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ script: 'sub' }, { script: 'super' }], // 下标/上标
            ['clean'], // 清除文本格式
          ],
        },
      },
      placeholder: '请输入内容',
      theme: 'snow',
    })

    // 判断是否是只读的 (文本模式/只读/添加组件时的编辑模式)
    if (props.config._property?.status === 2 || props.mode === 'text' || props.mode === 'edit') {
      // false === 不可编辑
      editor.enable(false)
    }

    // 判断预览模式回显内容
    if ((props.config._property.default_value?.value && props.mode === 'preview')) {
      editor.setContents(jsonparse(props.config._property.default_value.value), {})
      // 并保存 - 如果是只读添加的默认值就是设置的值
      form.value[props.config.id] = props.config._property.default_value.value
    }

    // 文本模式只能查看内容
    if (props.mode === 'text') {
      container_ref.value.querySelector('.ql-editor').setAttribute('contenteditable', false)
      // 文本模式回显
      editor.setContents(jsonparse(form.value[props.config.id]), {})
    }

    // 监听文字输入
    editor.on('text-change', () => {
      if (form.value) {
        form.value[props.config.id] = JSON.stringify(editor.getContents())
      }
    })
    sinicize()
    emits('ready')
  })
})
</script>

<template>
  <custom-editable-comp :config="config" :mode="mode" :form="form">
    <!--  如果是只读/是text模式就显示label文字指引 -->
    <div v-if="(config._property?.status !== 2)" class="label">
      富文本内容：
    </div>

    <div ref="container_ref" class="w-full ql-editor-wrapper" :class="{ 'read-only-item': mode === 'text' || (mode === 'preview' && config._property?.status === 2) }">
      <div id="editor" ref="editor_ref" class="w-full" />
    </div>
    <slot />
  </custom-editable-comp>
</template>

<style lang="scss" scoped>
@import './zh.scss';

.label {
  width: 100px;
}

.read-only-item {
  :deep(.ql-toolbar) {
    display: none;

    .ql-snow {
      display: none;
    }
  }

  :deep(.ql-container) {
    border: 0 !important;

    .ql-editor {
      padding: 0;
    }
  }
}
</style>
