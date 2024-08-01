<script setup>
import { evalByFun } from '@hl/utils/es/common'
import { cloneDeep } from 'lodash-es'
import { ref, watch } from 'vue'
import { HlButton, HlDialog } from '@hl/ui'
import { fh, number } from '../../../../../../../../default/form'
import BlocksComp from './Blocks.vue'
import ExpressionPanel from './ExpressionPanel.vue'
import FieldList from './FieldList.vue'

const model = defineModel('exp', {
  type: [Array, String],
})

const expression = ref([])

function handleAdd(val) {
  expression.value.push(val)
}

const show = defineModel()

// 校验表达式是否合法
function validate(value) {
  // 将表单替换为a变量
  const new_exp = value.map((item) => {
    if (typeof item === 'object') {
      return 'a'
    }
    return item
  }).join('')

  evalByFun(new_exp, {
    a: 1,
  })
}

// 提交
function handleSubmit() {
  try {
    validate(expression.value)
    model.value = expression.value
    show.value = false
  } catch (error) {
    hl.message.error(null, '表达式错误')
  }
}

// 键盘按键事件
const all_input = [...number, ...fh].map(item => item.toString())
function handleKeyUp(e) {
  if (all_input.includes(e.key)) {
    handleAdd(e.key)
  } else if (e.key !== 'Backspace') {
    hl.message.warning('输入不合法')
  }
}

watch(show, (val) => {
  if (val) {
    expression.value = cloneDeep(model.value)
    document.addEventListener('keyup', handleKeyUp)
  } else {
    document.removeEventListener('keyup', handleKeyUp)
  }
})
</script>

<template>
  <hl-dialog v-model="show" title="公式编辑" width="700px">
    <div class="p-2">
      <expression-panel v-model="expression" />

      <div class="flex mt-2">
        <div class="mt-2">
          表单对象
        </div>
        <field-list class="ml-4" @click="handleAdd" />
      </div>
      <div class="flex mt-4">
        <div style="line-height:28px">
          计算符号
        </div>
        <blocks-comp class="ml-4" :data="fh" @click="handleAdd" />
      </div>
      <div class="flex mt-4">
        <div style="line-height:28px">
          计算数字
        </div>
        <blocks-comp class="ml-4" :data="number" @click="handleAdd" />
      </div>
    </div>
    <template #footer>
      <hl-button @click="handleSubmit">
        提交
      </hl-button>
    </template>
  </hl-dialog>
</template>

<style lang='scss' scoped></style>
