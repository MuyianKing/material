<script name="TaskMouldIndex" setup>
import { reactive, ref } from 'vue'
import { HlIcon, HlSearchPage } from '@hl/ui'
import { ElLink } from 'element-plus'

import { jump } from '@hl/utils/es/router'
import {useRouter} from "vue-router"
import { getTaskTree } from '../../../server/config'
import TaskPublish from '../publish/Index.vue'
import TaskItem from './components/TaskItem.vue'

import 'element-plus/es/components/link/style/css'
import '@hl/ui/src/components/icon/Index.css'
import '@hl/ui/src/components/search-page/Index.css'

const query = reactive({
  query: '',
})

const task_tree = ref([])

async function getData() {
  try {
    task_tree.value = await getTaskTree(query)
  } catch (e) {
    hl.message.error(e, '获取任务出错')
  }
}

function handleCreate() {
  jump({
    path: '/task/design/base-config',
    type: '_blank',
  },useRouter())
}

const show_publish = ref(false)
const config_uuid = ref('')

function handlePublish(task) {
  if (task.is_stop !== 0) {
    hl.message.warning('模板已停用，无法发布任务')
    return
  }

  if (task.is_publish === 0) {
    hl.message.warning('模板未发布，无法发布任务')
    return
  }

  show_publish.value = true
  config_uuid.value = task.config_uuid
}
</script>

<template>
  <hl-search-page v-visible="getData" class="task-wrapper">
    <template #header>
      <div class="w-full flex items-center">
        <div class="header">
          <input v-model="query.query" placeholder="请输入名称进行搜索">
          <div class="search-button" @click="getData">
            <hl-icon color="#fff" icon="akar-icons:search" size="19" />
          </div>
        </div>
        <el-link v-resources="'task.config.create'" class="task-link h-full" @click="handleCreate">
          <hl-icon color="#7a92fe" icon="ion:create" size="19" />
          创建模板
        </el-link>
      </div>
    </template>

    <template #table>
      <div v-for="item in task_tree" :key="item.group_id" class="card">
        <template v-if="item._task_config_list.length > 0">
          <div class="title">
            {{ item.group_name }}
          </div>
          <div class="flex flex-wrap">
            <task-item v-for="task in item._task_config_list" :key="task.config_id" :data="task" :root-data="item"
              class="m-2" @publish="handlePublish(task)" @refresh="getData" />
          </div>
        </template>
      </div>
    </template>

    <task-publish v-model="show_publish" :config-uuid="config_uuid" />
  </hl-search-page>
</template>

<style lang='scss' scoped>
.task-wrapper {
  width: 100%;
  height: 100%;

  ::v-deep(.search-area) {
    background-color: #f5f6f6 !important;
  }

  ::v-deep(.table-body) {
    background-color: #f5f6f6 !important;
  }

  .header {
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex: 1;
    height: 100%;

    input {
      width: 100%;
      border: 0px;
      font-size: 14px;
      font-family: '汉仪旗黑', 'serif';
      color: #a5acc1;
      text-indent: 0.5rem;
      padding: 15px;

      &::placeholder {
        color: #a5acc1;
      }
    }

    .search-button {
      width: 70px;
      height: 100%;
      background-color: var(--color-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .card {
    margin-bottom: 30px;
    padding-left: 10px;

    .title {
      font-weight: 700;
      font-size: 18px;
      position: relative;
      margin-bottom: 10px;

      &::after {
        content: '';
        width: 8px;
        height: 25px;
        position: absolute;
        left: -12px;
        top: 50%;
        transform: translateY(-50%);
        background: linear-gradient(#fff, rgba(86, 146, 255));
        border-radius: 5px;
      }
    }
  }

  .card:last-child {
    margin-bottom: 0;
  }

  .task-link {
    color: var(--color-primary);
    margin: 0 10px;
  }

  :deep(.bottom) {
    margin-top: 0;
  }

  :deep(.el-divider__text) {
    font-size: 15px;
  }
}
</style>
