<script name="HlResetButton" setup>
import { ElButton, ElPopconfirm } from 'element-plus'
import { computed, inject } from 'vue'
import IconComp from '../icon/Index.vue'

const props = defineProps({
  icon: {
    type: [Boolean, undefined],
    default: undefined,
  },
  text: {
    type: String,
    default: '重置',
  },
  noConfirm: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['confirm'])

function confirm() {
  emits('confirm')
}

const { buttonIcon } = inject('GLOBAL_CUSTOM_CONFIG', { buttonIcon: true })
const show_icon = computed(() => props.icon !== undefined ? props.icon : (buttonIcon === undefined ? true : buttonIcon))
</script>

<template>
  <el-button v-if="noConfirm" v-bind="$attrs" type="warning" @click="confirm">
    <icon-comp v-if="show_icon" icon="ri:refresh-line" class="mr-1" />
    <slot>
      {{ text }}
    </slot>
  </el-button>
  <el-popconfirm v-else title="确定要重置?" @confirm="confirm">
    <template #reference>
      <el-button v-bind="$attrs" type="warning">
        <icon-comp v-if="show_icon" icon="ri:refresh-line" class="mr-1" />
        <slot>
          {{ text }}
        </slot>
      </el-button>
    </template>
  </el-popconfirm>
</template>
