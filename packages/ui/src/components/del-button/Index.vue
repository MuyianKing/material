<script setup>
import { ElPopover } from 'element-plus'
import 'element-plus/es/components/popover/style/css'
import ButtonComp from '../button/Index.vue'

const props = defineProps({
  message: {
    type: String,
    default: '您确定确认删除？',
  },
  noPopover: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: 'top',
  },
  text: {
    type: String,
    default: '删除',
  },
})

const emits = defineEmits(['click'])

const visible = ref(false)

// 确定删除
function submit() {
  visible.value = false
  emits('click')
}

// 删除
function handleClick() {
  if (!props.noPopover) {
    visible.value = true
  } else {
    emits('click')
  }
}
</script>

<template>
  <el-popover :placement="placement" :visible="visible">
    <div>
      <p>{{ message }}</p>
      <div class="text-center mt-2">
        <el-button size="small" type="danger" @click="visible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </div>
    <template #reference>
      <div class="inline-flex">
        <button-comp :text="text" button-type="icon" class="del-icon" icon="icon-park-outline:delete" @click="handleClick" />
      </div>
    </template>
  </el-popover>
</template>

<style lang="scss" scoped>
:deep(.del-icon) {
  cursor: pointer;
  color: var(--color-danger);
}
</style>
