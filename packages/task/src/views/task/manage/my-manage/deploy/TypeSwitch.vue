<script setup>
import { computed, ref } from 'vue'
import { PersonSelectPanel } from '@hl/tyyh'
import { HlButton, HlIcon } from '@hl/ui'
import '@hl/ui/src/components/button/Index.css'
import '@hl/ui/src/components/icon/Index.css'

import '@hl/tyyh/src/components/person-select-panel/Index.css'

const emits = defineEmits(['search', 'deploy-submit'])

const old_id_card = defineModel('idCard')

const old_id_card_temp = ref([])
const new_id_card = ref([])

const deploy = defineModel('deploy')

function handleSearch() {
  old_id_card.value = old_id_card_temp.value[0] || ''
  emits('search')
}

function handleChange(state) {
  deploy.value = state
  handleSearch()
}

function handleDeploy() {
  // 自动检测
  if (deploy.value === 2) {
    emits('deploy-submit', {
      deploy: 2,
    })
  } else {
    // 手动替换
    if (!old_id_card.value || !new_id_card.value[0]) {
      hl.message.warning('请输入检索人员或替换人员')
      return
    }

    if (old_id_card.value === new_id_card.value[0]) {
      hl.message.warning('替换人相同，请重新选择')
      return
    }

    emits('deploy-submit', {
      deploy: 1,
      old_id_card: old_id_card.value,
      new_id_card: new_id_card.value[0],
    })
  }
}

const itemWith = '70px'
const sliderPosition = computed(() => {
  if (deploy.value === 2) {
    return {
      left: '0',
    }
  } else if (deploy.value === 1) {
    return {
      left: itemWith,
    }
  }
  return {
    left: '-100px',
  }
})
</script>

<template>
  <div v-if="deploy === 1" class="flex items-center text-gray-400 text-sm" style="width:300px">
    <person-select-panel v-model="old_id_card_temp" :input-show-all-data="false" :multiple="false" class="flex-1"
                         @change="handleSearch"
    />
    <span class="ml-2 whitespace-nowrap ">替换</span>
    <hl-icon class="flex-shrink-0" icon="ep:d-arrow-right" />
    <person-select-panel v-model="new_id_card" :input-show-all-data="false" :multiple="false" class="flex-1" />
  </div>
  <hl-button class="ml-1 h-[26px]" type="warning" @click="handleDeploy">
    调度
  </hl-button>
  <div class="smooth-switch-box flex items-center relative ml-2">
    <div :class="{ active: deploy === 2 }" class="smooth-switch-item" @click="handleChange(2)">
      自动检测
    </div>
    <div :class="{ active: deploy === 1 }" class="smooth-switch-item" @click="handleChange(1)">
      手动替换
    </div>
    <div :style="sliderPosition" class="smooth-switch-slider" />
  </div>
</template>

<style lang="scss" scoped>
.smooth-switch-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  line-height: 26px;
  height: 26px;
  cursor: pointer;
  overflow: hidden;
  color: #666;
  flex-shrink: 0;
}

.smooth-switch-item {
  width: v-bind(itemWith);
  height: 100%;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease-in-out;

  &.active {
    color: #fff;
  }
}

.smooth-switch-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(itemWith);
  padding: 0 5px;
  height: 100%;
  background-color: var(--color-primary);
  transition: left 0.2s ease-in-out;
}
</style>
