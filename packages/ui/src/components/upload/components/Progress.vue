<script setup name="UploadProgress">
import { ElProgress } from 'element-plus'
import 'element-plus/es/components/progress/style/css'

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
    <div v-show="show" class="hl-ui-progress-shadow" style="position: fixed;
                                                            top: 0;
                                                            left: 0;
                                                            width: 100%;
                                                            height: 100%;
                                                            z-index: 999999;
                                                            background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="progress-body" style="position: absolute;
                                        top: 50%;
                                        left: 50%;
                                        transform: translateX(-50%) translateY(-50%);
                                        width: 50%;
                                        padding: 20px;
                                        background-color: #fff;
                                        border-radius: 5px;"
      >
        <div class="title" style="margin-bottom: 10px;">
          正在上传...
        </div>
        <slot :percentage="progress" />
        <el-progress v-if="!slots.default" text-inside :stroke-width="20" :percentage="progress" class="progress" style="width: 100%;" />
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>

</style>
