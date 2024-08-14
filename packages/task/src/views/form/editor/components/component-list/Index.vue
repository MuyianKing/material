<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import { cloneDeep } from 'lodash-es'
import { guid } from '@hl/utils/es/common'
import { inject, ref, toRefs } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { components_list_config } from './config'
import 'element-plus/es/components/collapse/style/css'

// 组件
const list = ref(cloneDeep(components_list_config))

// 默认展开全部
const collapse_active = ref(list.value.map(item => item.id))

const { form_field_list } = toRefs(inject('editor_store'))

// 拖到画布生成一个组件
function clone(element) {
  // 判断编辑器中是否只能出现一个该组件
  if (form_field_list.value.filter(item => item.key === element.id && item._property?.onlyone === true).length > 0) {
    hl.message.warning('只能添加一个该组件')
    return false
  }

  // 判断当前添加的组件是否是唯一组件
  // if (useFlowStore().onlyones.includes(element.id) && form_field_list.value.filter(item => item).length !== 0) {
  //   hl.message.warning(`${element.name} 属唯一组件不允许混合使用`)
  //   return false
  // }

  // 判断已添加的组件中是否存在唯一组件
  // if (form_field_list.value.filter(item => useFlowStore().onlyones.includes(item.key)).length > 0) {
  //   hl.message.warning('唯一组件不允许混合使用')
  //   return false
  // }

  return {
    // 组件唯一ID
    id: `${element.id}_${guid()}`,
    // 组件名称
    key: element.id,
  }
}
</script>

<template>
  <el-collapse v-model="collapse_active" style="background-color: #fff;">
    <el-collapse-item v-for="item in list" :key="item.id" :name="item.id" :title="item.name">
      <vue-draggable v-model="item.children" :sort="false" :group="{ name: 'form-editor', pull: 'clone', put: false }"
                     class="comp-list-wrapper" :clone="clone"
      >
        <div v-for="comp in item.children" :key="comp.id" class="comp-item">
          {{ comp.name }}
        </div>
      </vue-draggable>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" scoped>
.comp-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  overflow: auto;

  .comp-item {
    background-color: #fff;
    text-align: center;
    cursor: move;
    transition: all 0.3s;
    box-sizing: border-box;
    margin: 5px;
    width: calc(50% - 10px);
    height: 40px;
    line-height: 40px;
    border-radius: 7px;
    border: 1px solid #e8e9eb;
  }
}

.el-collapse {
  padding: 10px;
  padding-top: 0;

  :deep(.el-collapse-item__header) {
    font-size: 15px;
  }

  :deep(.el-collapse-item) {
    & > * {
      background-color: transparent !important;
    }
  }
}
</style>
