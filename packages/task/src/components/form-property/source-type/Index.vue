<script setup>
import { HlInput, HlSelect } from '@hl/ui'
import EditOptions from '../../common/EditOptions.vue'
import { select_source_type } from '../../../default/form'

const property = defineModel()
</script>

<template>
  <div>
    <!-- 下拉组件数据源配置 -->
    <hl-select v-model="property.source_type" :options="select_source_type" />
    <edit-options v-if="property.source_type === '_self'" v-model="property.options" class="mt-4" />
    <hl-input v-else-if="property.source_type === 'api'" v-model="property.api" class="mt-4" placeholder="请输入接口地址" />
  </div>
</template>

<style lang='scss' scoped></style>
