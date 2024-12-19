<script setup>
import { ElButton, ElPopover } from 'element-plus'
import { ref } from 'vue'
import useButton from '../../hooks/useButton'
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
  <span class="hl-del-button inline-flex">
    <el-popover :placement="placement" :visible="visible" aria-hidden="false">
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
          <button-comp :button-type="text ? 'text' : 'icon'" type="danger" :icon :text="_text" @click="handleClick">
            <slot />
          </button-comp>
        </div>
      </template>
    </el-popover>
  </span>
</template>
