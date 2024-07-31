<script setup>
import TaskDetail from '../../../../views/task/detail/Index.vue'

defineProps({
  task: {
    type: Object,
    default: null,
  },
  button: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh-one', 'refresh'])
const show_detail = ref(false)

const instance = getCurrentInstance()

async function handleClick() {
  try {
    if (instance.parent.exposed) {
      await instance.parent.exposed.getData()
    }

    show_detail.value = true
  } catch (e) {
    hl.message.error(e, '获取任务出错')
  }
}

function refresh() {
  emits('refresh')
}

const cur_instance = getCurrentInstance()

function refreshOne() {
  // 如果父亲是WjTaskCenterDetailHandleWrapper，则调用getData刷新数据
  if (cur_instance.parent.type.name === 'WjTaskCenterDetailHandleWrapper') {
    cur_instance.parent.exposed.getData()
  }
  emits('refresh-one')
}
</script>

<template>
  <template v-if="$slots.default">
    <span v-bind="$attrs" @click="handleClick">
      <slot />
    </span>
  </template>
  <template v-else>
    <el-button v-if="button" type="success" v-bind="$attrs" @click="handleClick">
      查看
    </el-button>
    <el-link v-else :underline="false" class="mx-1 whitespace-nowrap" type="success" v-bind="$attrs" @click="handleClick">
      查看
    </el-link>
  </template>

  <task-detail v-model="show_detail" :task @refresh="refresh" @refresh-one="refreshOne" />
</template>

<style lang='scss' scoped></style>
