<script setup name="UploadProgress">
import { ElProgress } from 'element-plus'

import { useSlots } from 'vue'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
})

const slots = useSlots()
</script>

<template>
  <teleport to="body">
    <div v-show="show" class="hl-ui-progress-shadow">
      <div class="progress-body" style="">
        <div class="title mb-2">
          正在上传...
        </div>
        <slot :percentage="progress" />
        <el-progress v-if="!slots.default" text-inside :stroke-width="20" :percentage="progress" class="progress" />
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>

</style>
