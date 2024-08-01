<script setup>
import { useAttrs } from 'vue'
import { ElButton, ElLink } from 'element-plus'
import { signTask } from '../../../../server'

import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/link/style/css'

defineProps({
  button: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh-one'])

const $attrs = useAttrs()
function handleSign() {
  hl.message.loading('签收中...')
  signTask($attrs['task-id']).then(() => {
    hl.message.success('签收成功')
    emits('refresh-one')
  }).catch((e) => {
    hl.message.error(e, '签收出错')
  }).finally(() => {
    hl.message.closeLoading()
  })
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="primary" @click="handleSign">
    <slot />
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="primary" v-bind="$attrs" @click="handleSign">
    <slot />
  </el-link>
</template>

<style lang='scss' scoped></style>
