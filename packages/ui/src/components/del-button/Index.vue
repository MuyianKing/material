<script setup>
import { ElButton, ElPopover } from 'element-plus'
import 'element-plus/es/components/popover/style/css'
import { ref } from 'vue'
import ButtonComp from '../button/Index.vue'
import useButton from '../../hooks/useButton'

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
  icon: {
    type: String,
    default: 'icon-park-outline:delete',
  },
  text: {
    type: [Boolean, String],
    default: false,
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

const { _text } = useButton(props, '删除')
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
      <div class="hl-del-button inline-block">
        <button-comp :button-type="text ? 'text' : 'icon'" type="danger" class="del-icon" :icon :text="_text" v-bind="$attrs" @click="handleClick">
          <slot />
        </button-comp>
      </div>
    </template>
  </el-popover>
</template>
