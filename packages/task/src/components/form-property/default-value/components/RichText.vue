<script setup>
import { HlButton, HlDialog } from '@hl/ui'
import { ref } from 'vue'
import RichText from '../../../../components/common/rich-text/Index.vue'
import '@hl/ui/src/components/button/Index.css'
import '@hl/ui/src/components/dialog/Index.css'

const model = defineModel()
const show = ref(false)

const rich_text = ref('')

const rich_ref = ref()
function handleShow() {
  show.value = true
  rich_text.value = model.value
}

function handleSubmit() {
  model.value = rich_text.value
  show.value = false
}
</script>

<template>
  <div class="text-center w-full">
    <hl-button @click="handleShow">
      点击配置
    </hl-button>

    <hl-dialog v-model="show" title="配置默认值" width="800px">
      <rich-text ref="rich_ref" v-model="rich_text" />

      <template #footer>
        <hl-button @click="handleSubmit">
          提交
        </hl-button>
      </template>
    </hl-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.ql-editor) {
  height: 300px;
  overflow: auto;
}
</style>
