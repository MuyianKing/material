<script setup>
import { inject, onMounted, reactive, ref } from 'vue'
import { ElPopover, vLoading } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'
import IconComp from '../icon/Index.vue'
import InputComp from '../input/Index.vue'

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

const query = reactive({
  limit: 200,
  page: 1,
  query: '',
})

const loading = ref(false)
const table_data = reactive({
  data: [],
  has_more: true,
})
async function getData(config) {
  try {
    if (!config?.append) {
      table_data.data = []
    }

    loading.value = true
    const result = await getIcons(query)
    result.data.forEach((icon) => {
      table_data.data.push(icon)
    })

    table_data.has_more = result.count > query.page * query.limit
  } finally {
    loading.value = false
  }
}

const search = useDebounceFn(() => {
  query.page = 1.0
  getData()
})

function handleBottom() {
  if (!table_data.has_more) {
    return
  }

  query.page++
  getData({
    append: true,
  })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="hl-icon-select">
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
