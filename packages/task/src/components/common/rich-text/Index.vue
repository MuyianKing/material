<script setup>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { jsonparse } from '@hl/utils/es/es/common'
import { nextTick, onMounted, ref, watch } from 'ref'

const container_ref = ref()
const editor_ref = ref()

const model = defineModel()
let editor = null
let update_by_self = false
function init() {
  nextTick(() => {
    editor = new Quill(editor_ref.value, {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题 —— 下拉选择
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ align: [] }], // 对齐方式// text direction
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

    if (model.value) {
      setContent(model.value)
    }

    editor.on('text-change', () => {
      update_by_self = true
      model.value = JSON.stringify(editor.getContents())
    })
  })
}

function setContent(val) {
  editor && editor.setContents(jsonparse(val, {}))
}

watch(model, (val) => {
  nextTick(() => {
    if (editor && !update_by_self) {
      editor.setContents(jsonparse(val, {}))
    }
    update_by_self = false
  })
})

onMounted(() => {
  init()
})

defineExpose({
  setContent,
})
</script>

<template>
  <div ref="container_ref" class="w-full ql-editor-wrapper">
    <div id="editor" ref="editor_ref" class="w-full" />
  </div>
</template>

<style scoped lang="scss">
@import './zh.scss';
</style>
