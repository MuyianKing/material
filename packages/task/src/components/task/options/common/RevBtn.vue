<script setup>
import { ref } from 'vue'

defineProps({
  text: {
    type: String,
    default: '',
  },
  placement: {
    type: String,
    default: 'top',
  },
})
const emits = defineEmits(['click'])

const visible = ref(false)

function submit() {
  visible.value = false
  emits('click')
}
</script>

<template>
  <el-popover :placement="placement" :visible="visible" width="155">
    <div>
      <p>确认{{ text || '删除' }}？</p>
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
      <span @click="visible = true">
        <slot />
      </span>
    </template>
  </el-popover>
</template>

<style scoped lang="scss">
</style>
