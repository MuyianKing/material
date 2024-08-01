<script setup>
import { getLabelByVal } from '@hl/utils/es/common'
import NodeData from '../../../../model/flow/node.data'
import { node_list } from '../../../../default/flow'
import useFlowStore from '../../../../../../../packages/task/src/pinia/modules/useFlowStore'

const props = defineProps({
  type: {
    type: String,
    default: '#7a939d',
  },
  properties: {
    type: Object,
    default: () => ({
      base_config: {},
    }),
  },
})

const { node } = storeToRefs(useFlowStore())

const ndoe_config = getLabelByVal(node_list, props.type, {
  value: 'type',
  obj: true,
})

const node_data = ref(null)
// 通过监听pinia来改变节点显示数据
watch(node, (val) => {
  // pinia是所有节点共享，需要判断是否属于当前节点
  if (val && val.id === node_data.value.id) {
    node_data.value = new NodeData(val)
  }
}, {
  deep: true,
})

watch(() => props.properties, (val) => {
  node_data.value = val
}, {
  immediate: true,
})
</script>

<template>
  <div class="node-item">
    <div class="top">
      <hl-icon :icon="ndoe_config.icon" style="font-size: 20px;" />
      <span class="ml-1">{{ node_data?.base_config.title }}</span>
    </div>
    <div class="content">
      <el-text line-clamp="2" class="content-text">
        {{ node_data?.base_config.remark || '节点备注' }}
      </el-text>
      <hl-icon icon="formkit:right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$border-radius: 5px;

.node-item {
  width: 200px;
  height: fit-content;
  position: relative;
  border-radius: $border-radius;
  cursor: move;
}

.node-del {
  position: absolute;
  top: 4px;
  right: 2px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.top {
  display: flex;
  background-color: v-bind('ndoe_config.top_bg');
  border-radius: $border-radius $border-radius 0 0;
  padding: 5px 10px;
  color: white;
  font-size: 14px;
  height: 34px;
}

.content {
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 $border-radius $border-radius;
  line-height: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-height: 46px;

  .content-text {
    flex: 1;
    min-width: 0;
    color: gray;
  }

  & > svg {
    font-size: 22px;
    color: gray;
    margin-left: 5px;
  }
}
</style>
