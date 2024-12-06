<script setup>
import { HlDescriptions, HlDescriptionsItem } from '@hl/ui'

const config = [
  {
    label: '接警编号',
    key: 'jjbh',
  },
  {
    label: '接警时间',
    key: 'djsj_time',
  },
  {
    label: '接警单位',
    key: 'djdwmc',
  },
  {
    label: '报警方式',
    key: 'bjxs',
  },
  {
    label: '报警类型',
    key: 'bjlx',
  },
  {
    label: '报警人',
    key: 'bjr',
  },
  {
    label: '报警人联系电话',
    key: 'lxdh',
  },
  {
    label: '报警登记时间',
    key: 'djsj_time',

  },
  {
    label: '报警修改时间',
    key: 'xgsj_time',
    span: 1,
  },
  {
    label: '事发地址',
    key: 'sfdd',
    span: 3,
  },
  {
    label: '报警内容',
    key: 'bjnr',
    span: 4,
  },
]
</script>

<template>
  <div class="p-4 bg-white w-full">
    <hl-descriptions>
      <hl-descriptions-item v-for="item in config" :key="item.key" :label="item.label" :span="item.span" label-width="calc(6em + 23px)">
        {{ item.label }}
      </hl-descriptions-item>
    </hl-descriptions>
  </div>
</template>

<style lang='scss' scoped></style>
