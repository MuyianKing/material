<script setup>
import { computed } from 'vue'
import { HlIcon } from '@hl/ui'
import { ElImage } from 'element-plus/es'

import blockUp from '../../../../assets/img/task/block_up.png'
import noPublish from '../../../../assets/img/task/no_publish.png'

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const color = computed(() => {
  let c = '#5692ff'
  if (props.data.is_stop) {
    c = '#ff7072'
  } else if (!props.data.is_publish) {
    c = '#ff8d1a'
  }

  return c
})
</script>

<template>
  <div class="header">
    <div class="flex items-center">
      <div class="icon" :style="{ 'background-color': color }">
        <hl-icon :icon="data.logo" color="#fff" size="28" class="icon-i" />
      </div>
      <div class="title">
        {{ data?.config_name }}
      </div>
    </div>
    <div class="suffix">
      <template v-if="data.is_stop">
        <el-image :src="blockUp" class="img" />
      </template>
      <template v-else-if="!data.is_publish">
        <el-image :src="noPublish" class="img" />
      </template>
    </div>
  </div>
  <div class="content">
    <template v-if="data.remark">
      {{ data.remark }}
    </template>
    <template v-else>
      <div class="no-data">
        暂无内容
      </div>
    </template>
  </div>
  <div class="bottom">
    <div class="flex items-center">
      <hl-icon icon="carbon:send-alt-filled" size="14" />
      <span>{{ data.name }}</span>
    </div>
    <div class="flex items-center time">
      <hl-icon icon="bx:bxs-time-five" size="14" color="#697e9d" />
      <span>{{ data.create_time }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    margin-left: 15px;
    //margin-bottom: 10px;
    font-weight: 700;
    font-size: 16px;
  }

  .icon {
    width: 45px;
    height: 45px;
    border-radius: 5px;
    background-color: var(--color-primary);
    position: relative;

    .icon-i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.content {
  height: 80px;
  color: #9eacbf;
  font-size: 15px;
  margin: 10px 0 10px 0;
  position: relative;
  word-spacing: 30px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  .no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #000033;
  font-weight: 700;

  .time {
    color: #697e9d;
  }
}
</style>
