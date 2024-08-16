<script setup name="HlTableEdit">
import storage from '@hl/utils/es/storage'
import { computed, inject, ref } from 'vue'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import DialogComp from '../dialog/Index.vue'
import ButtonComp from '../button/Index.vue'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['close', 'submit'])

const store = inject('hlTableStore')

// 选择的列
const checkList = ref([])

const columns = computed(() => {
  const keys = storage.get(store.value.storageKey) || []
  const edits_config = store.value.columns.filter(column => column.prop && column.label).map(column => ({
    label: column.label,
    prop: column.prop,
    show: keys.length === 0 || keys.includes(column.prop),
  }))

  return edits_config
})

// 确定
function submit() {
  storage.set(store.value.storageKey, checkList.value)
  store.value.columns.forEach((column) => {
    column.show = !column.prop || checkList.value.includes(column.prop)
  })
  emits('submit')
  close()
}

function close() {
  emits('close')
}
</script>

<template>
  <dialog-comp :model-value="show" width="700px" title="自定义表头" @close="close">
    <!-- 自定义表头 -->
    <div class="hl-table-edit-header">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in columns" :key="item.prop" :value="item.prop" :checked="item.show">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <template #footer>
      <button-comp @click="submit">
        确认
      </button-comp>
    </template>
  </dialog-comp>
</template>
