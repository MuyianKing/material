<script setup>
import { deleteTask } from '../../../../server'

defineProps({
  button: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh'])
const $attrs = useAttrs()

const visible = ref(false)

// 删除
function handleClick() {
  visible.value = true
}

// 确认删除
function deleteTaskFun() {
  deleteTask($attrs['task-id']).then(() => {
    hl.message.success('删除成功')
    visible.value = false
    emits('refresh', 'delete')
  }).catch((e) => {
    hl.message.error(e, '删除失败')
  })
}
</script>

<template>
  <el-popover :visible="visible" placement="top">
    <div>
      <p>您确定确认删除？</p>
      <div class="text-center mt-2">
        <el-button size="small" type="danger" @click="visible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="deleteTaskFun">
          确定
        </el-button>
      </div>
    </div>
    <template #reference>
      <el-button v-if="button" type="danger" v-bind="$attrs" @click="handleClick">
        <slot />
      </el-button>
      <el-link v-else :underline="false" class="mx-1 whitespace-nowrap" type="danger" v-bind="$attrs" @click="handleClick">
        <slot />
      </el-link>
    </template>
  </el-popover>
</template>

<style lang="scss" scoped>

</style>
