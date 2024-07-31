<script setup>
import useBus from '@utils/bus'
import { getTaskList } from '../../../../../../../server/benches'
import useBenchesStore from '../../../../../../../pinia/modules/useBenchesStore'
import AttentionItem from './components/AttentionItem.vue'
import EditDialog from './components/EditDialog.vue'

const emits = defineEmits(['search', 'set-count'])

const config = ref({
  value: -1,
  options: [],
})

const { attention_config } = storeToRefs(useBenchesStore())

async function getData(changeValue = true) {
  try {
    const result = await getTaskList()
    handleData(result)
    config.value = {
      value: changeValue ? -1 : config.value.value,
      subs: result,
    }
    attention_config.value.all_config_list = result || {}

    if (result && result.length > 0) {
      emits('set-count', result.reduce((lastItem, currentItem) => (currentItem.unfinish || 0) + lastItem, 0))
    }
  } catch (e) {
    hl.message.error(e, '获取配置清单出错')
  }
}

function handleData(result) {
  result.forEach((item) => {
    if (item.subs && item.subs.length > 0) {
      item.value = -1
      handleData(item.subs)
    }
  })
}

// 获取当前激活的值
function getActiveData(data) {
  const active_data = data.subs[data.value]

  if (!active_data) {
    return []
  }

  // 判断后台与没有选中，有选中的以后代为准
  if (active_data.subs && active_data.subs.length > 0) {
    const return_data = getActiveData(active_data)
    if (return_data && return_data.length > 0) {
      return return_data
    }
  }

  return active_data?.config_uuids || []
}

// 解决双击修改时会清空子项的问题
let oneTime = 0
let twoTime = 0
let timer = null

function handleTabClick(data) {
  timer && clearTimeout(timer)
  if (oneTime === 0) {
    oneTime = new Date().getTime()
  } else if (twoTime === 0) {
    twoTime = new Date().getTime()
    if (twoTime - oneTime < 300) {
      oneTime = 0
      twoTime = 0
      return
    }
  }
  timer = setTimeout(() => {
    if (data.value !== -1 && data.subs && data.subs.length > 0) {
      handleData(data.subs)
    }
    oneTime = 0
    twoTime = 0
  }, 300)
}

// 判断是否是操作之后影响的刷新/如果是则不带动列表刷新
let refreshTableRow = false
watch(config, (val) => {
  if (refreshTableRow) {
    // 每次更改后恢复
    refreshTableRow = false
    return
  }

  const config_uuids = getActiveData(config.value)
  emits('search', {
    config_uuids,
    val,
  })
}, {
  deep: true,
})

onMounted(() => {
  getData()
})

const { addBus } = useBus()
addBus('refreshTableRow', () => {
  refreshTableRow = true
  getData(false)
})
</script>

<template>
  <div class="my-attention ">
    <attention-item v-model="config" v-bind="$attrs" @tab-click="handleTabClick" />
    <edit-dialog @refresh="getData" />
    <div class="my-attention-line" />
  </div>
</template>

<style lang='scss' scoped>
.my-attention-line {
  border-bottom: 1px solid rgb(214, 214, 214);
  margin: 10px 0;
}
</style>
