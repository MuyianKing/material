<script setup>
import { inject } from 'vue'
import { useList } from '@hl/hooks'
import { ElPopover, vLoading } from 'element-plus'
import IconComp from '../icon/Index.vue'
import InputComp from '../input/Index.vue'

import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/loading/style/css'

defineProps({
  placholder: {
    type: String,
    default: '请选择图标',
  },
  title: {
    type: String,
    default: '',
  },
})

const { getIcons } = inject('GLOBAL_CUSTOM_CONFIG')

const model = defineModel()
function handleClick(row) {
  model.value = row
}

const {
  query,
  getData,
  table_data,
  search,
  loading,
} = useList({
  query: {
    limit: 200,
    query: '',
  },
  server: getIcons,
})

function handleBottom() {
  query.page++
  getData({
    append: true,
  })
}
</script>

<template>
  <div>
    <el-popover placement="bottom-start" :title="title" :width="440" trigger="click" :teleported="false">
      <template #reference>
        <div class="flex items-center cursor-pointer">
          <span class="placholder-item">{{ placholder }}</span>
          <icon-comp class="ml-2" :icon="model" style="font-size: 26px;" />
        </div>
      </template>

      <div class="icons-wrapper">
        <input-comp v-model="query.query" placeholder="请输入名称搜索，仅支持英文" @input="search" />
        <div v-loading="loading" v-bottom="handleBottom" class="icon-content">
          <div v-for="item in table_data.data" :key="item" class="icon-item">
            <icon-comp :icon="item" size="22px" @click="handleClick(item)" />
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.icons-wrapper {
  font-size: 24px;
  max-height: 400px;

  display: flex;
  flex-direction: column;

  .icon-content {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }

  $height: 40px;

  .icon-item {
    width: $height;
    height: $height;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    margin: 8px;
    cursor: pointer;
  }
}

.placholder-item {
  color: gray;
}

/*滚动条整体样式*/
/*高宽分别对应横竖滚动条的尺寸*/
.icon-content::-webkit-scrollbar {
  height: 10px;
  width: 2px;
}

/*滚动条里面小方块*/
.icon-content::-webkit-scrollbar-thumb {
  border-radius: 2px;
}

/*滚动条里面轨道*/
.icon-content::-webkit-scrollbar-track {
  border-radius: 2px;
}
</style>
