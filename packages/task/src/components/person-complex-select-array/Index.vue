<script setup>
import { getLabelByVal } from '@hl/utils/es/common'
import { ref, watch } from 'vue'
import { HlButton, HlDialog, HlFormItem, HlIcon, HlQuestionIcon, HlSelect } from '@hl/ui'
import { ElForm, ElTag } from 'element-plus'
import { user_level_default } from '../../default'
import ComplexUser from '../../model/ComplexUser'
import InputWrapper from '../person-complex-select/components/InputWrapper.vue'
import ComplexControlSelect from '../person-complex-select/Index.vue'
import { clone } from './deepCopy'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/form/style/css'

import '@hl/ui/src/components/button/Index.css'
import '@hl/ui/src/components/dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/icon/Index.css'
import '@hl/ui/src/components/question-icon/Index.css'
import '@hl/ui/src/components/select/Index.css'

defineProps({
  title: {
    type: String,
    default: '',
  },
  formConfig: {
    type: Array,
    default() {
      return []
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '配置人员/角色/单位',
  },
})

const CLOSE_STATE = {
  CLOSE: 1,
  CANCEL: 2,
}

const query_model = ref([])
const query = defineModel({
  type: Array,
  default() {
    return []
  },
})

const show = ref(false)
function handleOpen() {
  show.value = true
}

watch(show, (val) => {
  if (val) {
    // 第二个参数：克隆的数据中是否存在传入的类的类对象
    query_model.value = clone(query.value, ComplexUser)
  }
})

function handleAdd() {
  query_model.value.push({
    type: '',
    data: new ComplexUser(),
  })
}

function handleDelete(index) {
  query_model.value.splice(index, 1)
}

const formRef = ref()
function handleSave() {
  formRef.value.validate((valid) => {
    if (valid) {
      query.value = query_model.value
      handleCancel()
    }
  })
}

let closeState = CLOSE_STATE.CLOSE
function handleCancel() {
  closeState = CLOSE_STATE.CANCEL
  show.value = false
}

function handleClose() {
  if (closeState !== CLOSE_STATE.CANCEL)
    query_model.value = []

  closeState = CLOSE_STATE.CLOSE
}
</script>

<template>
  <div class="w-full">
    <input-wrapper :readonly="readonly" :disabled="disabled" :placeholder="placeholder" @click="handleOpen">
      <span v-for="person in query.slice(0, 30)" :key="person.id" class="person-item">{{
        getLabelByVal(user_level_default, person.type) }}</span>

      <template #readonly>
        <el-tag v-for="person in query.slice(0, 10)" :key="person.id" type="primary" class="mx-1">
          {{ getLabelByVal(user_level_default, person.type) }}
        </el-tag>
      </template>
    </input-wrapper>

    <hl-dialog v-model="show" :title="title" width="700px" top="30" @close="handleClose">
      <div class="level">
        <el-form ref="formRef" :model="query_model">
          <div v-for="(item, index) in query_model" :key="item.data" class="card">
            <div class="delete-button">
              <hl-icon icon="line-md:menu-to-close-transition" size="20" color="red" @click="handleDelete(index)" />
            </div>
            <hl-form-item label="用户层级" :prop="`[${index}].type`" required>
              <hl-select v-model="item.type" class="flex-1" :options="user_level_default" />
              <hl-question-icon class="absolute -right-5">
                <div>单位层级：市局支队查看支队，分局大队层级查看大队，派出所层级查看派出所，市局领导查看全市，分局领导查看全分局</div>
                <div>行政层级：市局单位查看全市，分局单位查看分局，派出所单位查看派出所</div>
              </hl-question-icon>
            </hl-form-item>
            <hl-form-item label="层级人员" :prop="`[${index}].data`" required>
              <complex-control-select v-model="item.data"
                                      :title="`${getLabelByVal(user_level_default, item.type) || '层级'}人员`"
              />
            </hl-form-item>
          </div>
        </el-form>

        <div class="add-button">
          <hl-icon icon="icon-park-outline:add-four" size="30" @click="handleAdd" />
        </div>
      </div>

      <template #footer>
        <hl-button @click="handleCancel">
          取消
        </hl-button>
        <hl-button type="success" @click="handleSave">
          保存
        </hl-button>
      </template>
    </hl-dialog>
  </div>
</template>

<style lang='scss' scoped>
.level {
  padding: 10px;

  .card {
    border: 1px dashed var(--color-primary);
    margin: 10px;
    padding: 5px 20px;
    border-radius: 10px;
  }
}

.person-item {
  margin-right: 5px;
  padding: 4px 10px;
  background-color: #f4f4f5;
  color: #909399;
  border-radius: 3px;
  font-size: 12px;
  line-height: 24px;
  height: 24px;
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.delete-button {
  cursor: pointer;
  text-align: right;
  margin-bottom: 5px;
}
</style>
