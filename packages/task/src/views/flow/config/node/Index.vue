<script setup>
import { getLabelByVal } from '@hl/utils/es/common'
import { property_list, type_list } from '../../../../components/flow-node-property/config'
import useFlowStore from '../../../../pinia/modules/useFlowStore'
import { splitNodeEdge, validateOuterFileds } from '../../../../hooks/flow'
import { check_config } from '../../../../default/flow'

const { node, prev_form_id, error_message } = storeToRefs(useFlowStore())

const getLf = inject('getLf')

watch(node, () => {
  if (!node?.value) {
    return
  }
  getLf().setProperties(node.value.id, node.value)
}, {
  deep: true,
})

const property_list_comp = computed(() => {
  const config = { ...node.value?.base_config || {} }

  if (node.value.form_id !== undefined) {
    config.form_id = node.value.form_id
  }

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

// 校验表单提交后，节点配置中的表单内联系人配置是否准确
function handleCheckProcess({ old_form_id, new_form_id }) {
  const cells = getLf().getGraphData()
  const { nodes, edges } = splitNodeEdge(cells)
  const lf = getLf()

  console.log(old_form_id)

  error_message.value = []

  // 所有节点更新关联的表单配置
  nodes.forEach((item) => {
    if (item.type !== 'StartNode' && item.type !== 'EndNode') {
      const base_config = item.properties.base_config

      check_config.forEach(({ key, type, goto }) => {
        if (type === 'form_user') {
          if (base_config[key] && base_config[key].form_user) {
            const form_user = base_config[key].form_user

            // 遍历表单内联系人配置，用新的form_id替换旧的form_id
            for (let i = 0; i < form_user.length; i++) {
              const user_config = form_user[i]
              // 新表单id等于老表单id替换
              if (user_config.form_id === old_form_id) {
                user_config.form_id = new_form_id
              }
            }
          }
        } else {
          // 其他组件
          if (goto(base_config)) {
            const form_id = (base_config[key].split('__') || [])
            if (form_id && form_id.length > 0) {
              // 新表单id等于老表单id替换
              if (+form_id[0] === old_form_id) {
                base_config[key] = `${new_form_id}__${form_id[1]}`
              }
            }
          }
        }
      })

      // 重新为节点设置属性，否则不生效
      lf.setProperties(item.id, item.properties)
    }
  })

  // 边更新关联的表单配置
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i]
    let { condition } = edge.properties
    if (condition && condition.length > 0) {
      // 过滤掉连接符
      condition = condition.filter(item => item.type === 'condition')

      for (let i = 0; i < condition.length; i++) {
        const cond = condition[i]

        // field[0]格式：节点ID__表单ID
        const fields = cond.field[0]?.split('__')

        // 新表单id等于老表单id替换
        if (fields && fields[1] && +fields[1] === old_form_id) {
          cond.field[0] = `${fields[0]}__${new_form_id}`
          break
        }
      }
    }

    lf.setProperties(edge.id, edge.properties)
  }

  nextTick(() => {
    // 校验是否存在引用缺失的表单
    validateOuterFileds(getLf().getGraphData()).then((data) => {
      data.forEach((item) => {
        error_message.value.push(item)
      })
    })
  })
}
</script>

<template>
  <div class="base-config-wrapper">
    <el-form label-width="100px">
      <template v-if="property_list_comp.length > 0">
        <template v-for="type_comp in property_list_comp" :key="type_comp.key">
          <el-divider class="mt-8">
            {{ type_comp.label }}
          </el-divider>
          <template v-for="comp in type_comp.children" :key="comp.key">
            <!-- 依赖所有的字段组件 -->
            <component :is="comp.key" v-if="comp.value_type === 'all'" v-model="node.base_config" :node="node" :form-config="prev_form_id" />

            <!-- 添加表单组件 -->
            <component :is="comp.key" v-else-if="comp.field === 'form_id'" v-model="node" :node="node" :form-config="prev_form_id" @update="handleCheckProcess" />

            <!-- 其他 -->
            <component :is="comp.key" v-else v-model="node.base_config[comp.field]" :node="node" :form-config="prev_form_id" />
          </template>
        </template>
      </template>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.base-config-wrapper {
  position: relative;
  padding: 5px;
  width: 100%;

  .el-divider {
    margin: 16px 0;
  }
}
</style>
