<script setup>
import { getLabelByVal } from '@hl/utils/es/common'
import { computed, inject, toRefs } from 'vue'
import { HlFormItem, HlInput, HlNodata } from '@hl/ui'
import { ElDivider, ElForm } from 'element-plus'
import { property_list, type_list } from '../../../../../../components/form-property/config'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/divider/style/css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/nodata/Index.css'
import '@hl/ui/src/components/input/Index.css'

const { property_config, active_form_item } = toRefs(inject('editor_store'))

const property_list_comp = computed(() => {
  const config = property_config.value?._property_config || []

  const list = []
  for (const key in config) {
    const _config = getLabelByVal(property_list, key, { value: 'field', obj: true })

    // 所给配置不存在组件
    if (!_config) {
      continue
    }

    // 配置组件显示隐藏
    if (typeof config[key] === 'object' && !Array.isArray(config[key]) && config[key].is_config) {
      if (config[key].hide !== true) {
        list.push(_config)
      }
    } else {
      // 未配置默认显示
      list.push(_config)
    }
  }

  const _type_list = type_list.map((type) => {
    type.children = list.filter(item => item.type === type.key) || []
    return type
  })

  return _type_list.filter(item => item.children.length > 0)
})
</script>

<template>
  <el-form label-width="100px">
    <hl-form-item label="表单ID">
      <hl-input :model-value="active_form_item" readonly />
    </hl-form-item>

    <template v-if="property_list_comp.length > 0">
      <template v-for="type_comp in property_list_comp" :key="type_comp.key">
        <el-divider class="mt-8">
          {{ type_comp.label }}
        </el-divider>
        <template v-for="comp in type_comp.children" :key="comp.key">
          <component :is="comp.key" v-if="comp.value_type === 'all'" v-model="property_config.property" />
          <component :is="comp.key" v-else :key="comp.key" v-model="property_config.property[comp.field]" />
        </template>
      </template>
    </template>

    <hl-nodata v-else class="no-data" text="请先选择一个组件" style="width:calc(100% - 20px)" />
  </el-form>
</template>

<style lang="scss" scoped>
.no-data {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
