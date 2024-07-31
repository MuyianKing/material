<script setup>
import { readTask } from '../../../../server'

defineProps({
  button: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh-one'])

const $attrs = useAttrs()

function handleRead() {
  hl.message.loading('已读中...')
  readTask($attrs['task-id']).then(() => {
    hl.message.success('已读成功')
    emits('refresh-one')
  }).catch((e) => {
    hl.message.error(e, '已读出错')
  }).finally(() => {
    hl.message.closeLoading()
  })
}
</script>

<template>
  <el-button v-if="button" type="primary" v-bind="$attrs" @click="handleRead">
    <slot />
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="primary" v-bind="$attrs" @click="handleRead">
    <slot />
  </el-link>
</template>

<style lang='scss' scoped></style>
