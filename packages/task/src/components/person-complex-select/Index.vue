<script setup>
import { CircleSelect, JobCascader, Organization, PersonItem, PersonSelectPanel, RoleSelect } from '@hl/tyyh'
import { reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { HlButton, HlDialog, HlFormItem, HlIcon, HlPage, HlQuestionIcon, HlSearchPage, HlSelect } from '@hl/ui'
import { vLoading } from 'element-plus'
import { getPersonByAll } from '../../server'
import { TaskFlowNodeOuter } from '../flow'
import ComplexUser from '../../model/ComplexUser'

import OrgTypeSelect from '../organization-type-select/Index.vue'
import { validateOuterFileds } from '../../hooks/flow'
import useFlowStore from '../../pinia/modules/useFlowStore'
import ExcludePerson from './components/ExcludePerson.vue'
import InputWrapper from './components/InputWrapper.vue'
import 'element-plus/es/components/loading/style/css'

const props = defineProps({
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
  nodes: {
    type: Array,
    default: null,
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
  lf: {
    type: Object,
    default: null,
  },
})

const query = defineModel({
  type: Object,
  default() {
    return {}
  },
})

const show = ref(false)
const query_model = ref(new ComplexUser())

const { error_message } = storeToRefs(useFlowStore())

// 提交
function handleSave() {
  query.value = new ComplexUser(query_model.value)
  show.value = false

  setTimeout(() => {
    if (props.lf) {
      validateOuterFileds(props.lf.getGraphData()).then((data) => {
        error_message.value = data
      })
    }
  }, 150)
}

const excludes = ref([])

// 排除人员
function clearPerson(user) {
  const isPush = excludes.value.some(item => item.id_card === user.id_card)
  if (!isPush) {
    query_model.value.exclude_id_cards.push(user.id_card)
  }
}

// 恢复排除人员
function closeExclude(user) {
  const index = excludes.value.map(item => item.id_card).indexOf(user.id_card)
  query_model.value.exclude_id_cards.splice(index, 1)
}

function handleOpen() {
  if (props.disabled)
    return

  show.value = true
}

const table_data = reactive({
  data: [],
  count: 0,
})

const page = ref(1)
const loading = ref(false)

function getData() {
  loading.value = true
  getPersonByAll({
    ...query_model.value,
    limit: 15,
    page: page.value,
  }).then((data) => {
    table_data.data = data.data
    table_data.count = data.count
  }).catch((e) => {
    hl.message.error(e, '获取人员列表出错')
  }).finally(() => {
    loading.value = false
  })
}

const handleSearch = useDebounceFn(() => {
  page.value = 1
  getData()
  getExcludePerson()
}, 500)

// 选择了人、单位等重新获取人员数据
watch(query_model, () => {
  handleSearch()
}, {
  immediate: true,
  deep: true,
})

// 外部query变化后，以外部为准
watch(query, () => {
  query_model.value = new ComplexUser(query.value)
}, {
  immediate: true,
})

function getExcludePerson() {
  getPersonByAll({
    id_cards: query_model.value.exclude_id_cards || [],
    limit: 10000,
    page: 1,
  }).then((data) => {
    excludes.value = data.data.map(user => ({
      name: user.name,
      id_card: user.id_card,
    }))
  }).catch((e) => {
    hl.message.error(e, '获取人员列表出错')
  }).finally(() => {
    loading.value = false
  })
}

/**
 * 有两种情况：提交关闭，这时候query就是query_model，
 * 另一种是点右上角关闭，这时候代表用户不想要当前选择的人、单位，query为打开前的人员数据
 */
watch(show, (val) => {
  if (!val) {
    query_model.value = new ComplexUser(query.value)
    handleSearch()
  }
})
</script>

<template>
  <div class="w-full">
    <input-wrapper :readonly="readonly" :disabled="disabled" :placeholder="placeholder" :data="table_data.data" :form-user="query_model.form_user" @click="handleOpen" />
    <hl-dialog v-model="show" :title="title" width="90%" top="30">
      <hl-search-page label-width="100px">
        <template #header>
          <hl-form-item v-if="formConfig && formConfig.length > 0" label="单位层级" class="w-full">
            <org-type-select v-model="query_model.dwcjs" class="w-full" :disabled="disabled || readonly" />
          </hl-form-item>
          <hl-form-item label="角色" class="w-half">
            <role-select v-model="query_model.roles" multiple :max-collapse-tags="2" collapse-tags collapse-tags-tooltip :disabled="disabled || readonly" />
          </hl-form-item>
          <hl-form-item label="圈层" class="w-half">
            <circle-select v-model="query_model.circles" multiple :max-collapse-tags="2" collapse-tags collapse-tags-tooltip :disabled="disabled || readonly" />
          </hl-form-item>
          <hl-form-item label="职务" class="w-half">
            <job-cascader v-model="query_model.jobs" multiple class="w-full" :max-collapse-tags="16" collapse-tags collapse-tags-tooltip :disabled="disabled || readonly" />
          </hl-form-item>
          <hl-form-item label="单位" class="w-half">
            <organization v-model="query_model.organizations" class="w-full" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="8" :disabled="disabled || readonly" />
          </hl-form-item>
          <hl-form-item label="补充人员" class="w-full">
            <div class="flex w-full items-center">
              <person-select-panel v-model="query_model.id_cards" max-height="64px" class="flex-1" :disabled="disabled || readonly" />
              <ElTooltip>
                <hl-icon icon="mingcute:question-fill" class="tooltip-item" />
                <template #content>
                  最终选择的人员会根据职务、角色、单位取交集，再加上补充人员和表单内联系人
                </template>
              </ElTooltip>
            </div>
          </hl-form-item>
          <hl-form-item v-if="formConfig && formConfig.length > 0" label="表单内联系人" class="w-half">
            <div class="flex w-full items-center">
              <task-flow-node-outer v-model="query_model.form_user" :form-config="formConfig" multiple type="form_user" />
              <ElTooltip>
                <hl-icon icon="mingcute:question-fill" class="tooltip-item" />
                <template #content>
                  <div>表单内联系人是指当前节点的前面所有节点关联的表单内的配置的对外输出字段，</div>
                  <div>当配置了这些字段后，当前面的节点流转到当前节点时，会自动统计出前面节点填写的字段以供当前节点使用</div>
                </template>
              </ElTooltip>
            </div>
          </hl-form-item>
          <hl-form-item v-if="nodes" label="关联节点" class="w-half">
            <div class="flex w-full items-center">
              <hl-select v-model="query_model.extends_org" :options="nodes" class="flex-1" />
              <hl-question-icon placement="bottom">
                关联该节点的处置单位
              </hl-question-icon>
            </div>
          </hl-form-item>
          <hl-form-item label="排除人员" class="w-full">
            <exclude-person :list="excludes" class="w-full" @close="closeExclude" />
          </hl-form-item>
        </template>

        <template #table>
          <div v-loading="loading" class="h-full">
            <div class="flex flex-wrap">
              <person-item v-for="item in table_data.data" :key="item.id" :user="item" close @clear="clearPerson" />
            </div>
            <hl-nodata v-show="table_data.data.length === 0" height="400px" width="auto" />
          </div>
        </template>

        <hl-page v-model="page" :count="table_data.count" @change="getData" />
      </hl-search-page>

      <template #footer>
        <div class="text-right">
          <hl-button @click="handleSave">
            确定
          </hl-button>
        </div>
      </template>
    </hl-dialog>
  </div>
</template>

<style lang='scss' scoped>
.w-half {
  width: calc(50% - 10px);
}

.tooltip-item {
  position: absolute;
  right: -20px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
