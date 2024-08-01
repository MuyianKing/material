<script setup>
import { useAttrs } from 'vue'
import { ElButton, ElLink } from 'element-plus'
import { startTask } from '../../../../server'

defineProps({
  button: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh-one'])

const $attrs = useAttrs()

function handleStart() {
  hl.message.loading('启动中...')
  startTask($attrs['task-id']).then(() => {
    hl.message.success('启动成功')
    emits('refresh-one')
  }).catch((e) => {
    hl.message.error(e, '启动出错')
  }).finally(() => {
    hl.message.closeLoading()
  })
}
</script>

<template>
  <el-button v-if="button" type="primary" v-bind="$attrs" @click="handleStart">
    <slot />
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="primary" v-bind="$attrs" @click="handleStart">
    <slot />
  </el-link>
</template>

<style lang='scss' scoped></style>
