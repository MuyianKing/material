<script setup>
import { inject, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { ElForm } from 'element-plus'
import ControlShow from '../../../../components/form/basic/ControlShow.vue'
import useFlowStore from '../../../../pinia/modules/useFlowStore'
import 'element-plus/es/components/form/style/css'

const { edge } = storeToRefs(useFlowStore())

let lf = null
const getLf = inject('getLf')

watch(edge, (new_val, old_val) => {
  if (!lf) {
    lf = getLf()
  }
  if (!lf) {
    return
  }

  if (old_val) {
    updateActive(false, old_val.properties)
  }

  if (new_val) {
    updateActive(true, new_val.properties)
  }
}, {
  deep: true,
  immediate: true,
})

function updateActive(active, properties) {
  const _edge = lf.getEdgeModelById(properties.id)

  if (!_edge) {
    return
  }

  _edge.setProperties({
    ...properties,
    active,
  })
}
</script>

<template>
  <div>
    <el-form>
      <control-show v-if="edge" v-model="edge.properties.condition" :form-field-list="edge.form_field_list" />
    </el-form>
  </div>
</template>

<style lang='scss' scoped></style>
