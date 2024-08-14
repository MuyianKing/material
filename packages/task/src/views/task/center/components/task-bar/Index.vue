<script setup>
import { onMounted, reactive, ref } from 'vue'
import { HlChart, HlNodata } from '@hl/ui'
import WrapperComp from '../../components/Wrapper.vue'
import { getTaskStep } from '../../../../../server/task'
import StaItem from './components/StaItem.vue'
import BreadCrumb from './components/BreadCrumb.vue'
import '@hl/ui/src/components/chart/Index.css'
import '@hl/ui/src/components/nodata/Index.css'

const emits = defineEmits(['search'])
const option = ref({
  color: '#409eff',
  grid: {
    left: 30,
    top: 30,
    bottom: 20,
    right: 0,
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: {
    barWidth: 30,
    data: [],
    type: 'bar',
    label: {
      show: true,
      position: 'top',
    },
  },
})
function changeChartData() {
  const xAxis = []
  const series = []
  data.value.data.forEach((item) => {
    item.organization_name = item.organization_name?.replace(/派出所|责任区|社区/g, '') || item.config_name
    xAxis.push(item.organization_name)
    series.push({
      ...item,
      value: item.count,
    })
  })

  option.value = {
    xAxis: {
      data: xAxis,
    },
    series: {
      data: series,
    },
  }
}

const data = ref({})
const level = ref([])
const query = reactive({
  type: 'distribute7',
})
async function getData(first = false) {
  try {
    const res = await getTaskStep(query)
    data.value = res.data
    changeChartData()

    if (first) {
      level.value = [{
        label: data.value.name,
        value: '',
      }]
    }
  } catch (error) {
    hl.message.error(error, '获取本级任务失败')
  }
}

// 向下穿透
function chartReady(chartInstance) {
  chartInstance.on('click', (e) => {
    // 无法向下穿透的条件1
    if (data.value.dwcj === 4) {
      return
    }
    const { organization_name, organization_id } = e.data
    // 判断点击的是已存在的派出所 - 无法向下穿透的条件2
    if (level.value[level.value.length - 1].value === organization_id) {
      return
    }

    level.value.push({
      label: organization_name,
      value: organization_id,
    })

    query.organization_id = organization_id
    linkList()
  })
}

// 返回指定目录
function back(org) {
  // 点击的是第一个
  if (!org.value) {
    query.organization_id = ''
    linkList(true)
    return
  }

  // 如果重复点击最后一个层级
  if (level.value[level.value.length - 1].value === org.value) {
    return
  }

  // 拿到点击的第几位
  let index = 0
  for (let i = 0; i < level.value.length; i++) {
    if (level.value[i].value === org.value) {
      index = i
      break
    }
  }
  // 去除后面的层级
  level.value.splice(index + 1)
  query.organization_id = org.value
  linkList()
}

// 联动列表
function linkList(first) {
  emits('search', {
    organization: [query.organization_id || ''],
    status: query.status,
    status_start_time: query.status_start_time,
    status_end_time: query.status_end_time,
    contain_jkry: query.contain_jkry,
  })
  getData(first)
}

onMounted(() => {
  getData(true)
})
</script>

<template>
  <wrapper-comp title="本级任务">
    <div class="flex-column h-full">
      <sta-item v-model="query" @refresh="linkList" />
      <bread-crumb class="mt-3" :level="level" @back="back" />
      <hl-chart v-show="data.data?.length > 0" :option="option" class="flex-1-0" @ready="chartReady" />
      <template v-if="data.data?.length === 0">
        <div class="nodata">
          <hl-nodata width="60%" />
        </div>
      </template>
    </div>
  </wrapper-comp>
</template>

<style lang='scss' scoped>
.nodata {
  height: calc(100% - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
