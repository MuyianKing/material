<script setup>
import { HlInput, HlSelect } from '@hl/ui'
import { getLabelByVal } from '@hl/utils/es/common'
import { watch } from 'vue'

import { default_type } from '../../../../../default/form'
import UserDefault from './components/UserDefault.vue'
import TimeDiff from './components/time-diff/Index.vue'
import MathComp from './components/math/Index.vue'

const model = defineModel()

// 组件映射关系
const comp_map = {
  'hl-input': HlInput,
  'user-default': UserDefault,
  'time-diff': TimeDiff,
  'math': MathComp,
}

// 将所有配置变为一维数组
const all_type = []

function initAllType() {
  default_type.forEach((item) => {
    item.children.forEach((type) => {
      all_type.push(type)
    })
  })
}

initAllType()

let _comp = ''

// 类型变化：设置初始值
function handleChange() {
  const val = model.value.type
  switch (val) {
    case 'math':
      model.value.value = {
        value: [],
        tofix: 2,
      }
      break
    case 'datetime':
      model.value.value = 'cur_time'
      break
    case 'time_diff':
      model.value.value = {
        large: '',
        small: '',
        unit: 'day',
        tofix: 2,
      }
      break
    default:
      model.value.value = ''
      break
  }

  // 设置组件
  _comp = comp_map[getLabelByVal(all_type, val, {
    label: 'comp',
  })]
}

watch(() => model.value.type, () => {
  handleChange()
}, {
  immediate: true,
})
</script>

<template>
  <div v-if="model" class="w-full">
    <hl-select v-model="model.type" :options="default_type" placeholder="请选择默认值类型" />
    <component :is="_comp" v-if="_comp" v-model="model.value" class="mt-2" :type="model.type" />
  </div>
</template>

<style lang='scss' scoped></style>
