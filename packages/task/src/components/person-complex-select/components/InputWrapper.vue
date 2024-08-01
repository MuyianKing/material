<script setup>
import { HlIcon } from '@hl/ui'
import { ElTag } from 'element-plus'
import 'element-plus/es/components/tag/style/css'

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: () => ([]),
  },
  formUser: {
    type: Array,
    default: () => ([]),
  },
  placeholder: {
    type: String,
    default: '请选择人员',
  },
})

defineEmits(['click'])
</script>

<template>
  <div>
    <div v-if="!readonly" :class="{ disabled }" class="input-wrapper" @click="$emit('click')">
      <div class="line-clamp-1 flex-1">
        <slot>
          <span v-for="person in formUser" :key="person.value" class="person-item">{{ person.label }}</span>
          <span v-for="person in data.slice(0, 30)" :key="person.id_card" class="person-item">{{ person.name }}</span>
          <span v-if="data.length === 0 && formUser.length === 0" class="flex-1">{{ placeholder || "请选择人员" }}</span>
        </slot>
      </div>
      <hl-icon icon="mingcute:down-line" />
    </div>
    <div v-else>
      <slot name="readonly">
        <el-tag v-for="person in data.slice(0, 10)" :key="person.id" type="primary" class="mx-1">
          {{ person.name }}
        </el-tag>
      </slot>

      <el-tag v-if="data.length > 10" type="primary" class="ml-1 cursor-pointer" @click="$emit('click')">
        更多
      </el-tag>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  width: 100%;
  padding: 1px 11px;
  height: 32px;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  display: flex;
  align-items: center;
  color: #a8abb2;

  .person-item {
    margin-right: 5px;
    padding: 4px 10px;
    background-color: #f4f4f5;
    color: #909399;
    border-radius: 3px;
    font-size: 12px;
    line-height: 24px;
    height: 24px;
  }
}

.disabled {
  background-color: var(--el-disabled-bg-color);
  cursor: not-allowed;
}
</style>
