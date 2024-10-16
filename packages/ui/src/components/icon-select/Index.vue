<script setup>
import { inject, onMounted, reactive, ref } from 'vue'
import { ElButton, ElPopover, vLoading } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'
import { vBottom } from '@hl/directions'
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
  teleported: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '440px',
  },
  trigger: {
    type: String,
    default: 'click',
  },
})

const { getIcons } = inject('GLOBAL_CUSTOM_CONFIG', null)

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
    if (!getIcons) {
      return
    }

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

const popover_ref = ref()
function handleSubmit() {
  popover_ref.value?.hide()
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="hl-icon-select">
    <el-popover ref="popover_ref" placement="bottom-start" :title :width :trigger :teleported>
      <template #reference>
        <div class="flex items-center cursor-pointer">
          <span class="placholder-item">{{ placholder }}</span>
          <icon-comp class="ml-2" :icon="model" style="font-size: 26px;" />
        </div>
      </template>

      <div class="hl-icons-wrapper">
        <input-comp v-model="query.query" placeholder="请输入名称搜索，仅支持英文" @input="search" />
        <div v-loading="loading" v-bottom="handleBottom" class="icon-content">
          <div v-for="item in table_data.data" :key="item" class="icon-item">
            <icon-comp :icon="item" size="22px" @click="handleClick(item)" />
          </div>
        </div>
        <div class="btn-wrapper">
          <el-button type="danger" size="small" @click="model = ''">
            清除
          </el-button>
          <el-button type="primary" size="small" @click="handleSubmit">
            确定
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
