<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElButton, ElCheckbox, ElInput, ElTag } from 'element-plus'
import { HlDialog, HlIcon, HlNodata, HlResetButton } from '@hl/ui'
import OrganizationTree from '../organization/components/plugin.vue'
import { getList } from '../../server/person'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/checkbox/style/css'
import 'element-plus/es/components/button/style/css'

import '@hl/ui/src/components/dialog/Index.css'
import '@hl/ui/src/components/icon/Index.css'
import '@hl/ui/src/components/nodata/Index.css'
import '@hl/ui/src/components/reset-button/Index.css'

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    },
  },
  placeholder: {
    type: String,
    default: '请选择人员',
  },
  maxHeight: {
    type: String,
    default: '300px',
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 人员类型 0民警（默认），1仅辅警，2全部
  personType: {
    type: [Number, String],
    default: 0,
  },
  filterValue: {
    type: Array,
    default: () => ([]),
  },
  // org_job_id_card - 以单位id/职位id/身份证号 作为主键
  idKey: {
    type: String,
    default: 'id_card',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // 选择框是否显示全部数据
  inputShowAllData: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

let page = 1
const limit = 200
const draw_end = ref(0)

// 保存全量的人员数据
let data_list = []
let data_list_map = {}

// 保存当前单位的人员数据
const cur_data_list = ref([])

// 重置树
const org_tree = ref()

function handleReset() {
  org_tree.value && org_tree.value.switchNode()
}

function createItem(item, key_value) {
  return {
    police_id: item.police_id,
    name: item.name,
    id_card: item.id_card,
    organization_id: item.organization?.map(org => org.organization_id),
    organization_name: item.organization?.map(org => org.organization_nick).join(','),
    job_name: item.organization?.map(org => org.job_name).join(','),
    org_job: item.organization?.map(org => `${org.organization_nick}-${org.job_name}`).join(','),
    [props.idKey]: key_value,
  }
}

let first = false

function getData() {
  getList({
    organization_id: organization_id || hl.getUserInfo().organization.lsdw,
    sub_organization: 1,
    have_fujing: props.personType,
  }).then((res) => {
    const _res = []
    data_list_map = {}
    res.data = res.data.filter(item => !props.filterValue.includes(item[props.idKey]))
    data_list = []

    res.data.forEach((item) => {
      if (props.idKey === 'org_job_id_card') {
        item.organization.forEach((e) => {
          const new_item = createItem(item, `${e.organization_id}/${e.job_id}/${item.id_card}`)
          data_list_map[new_item[props.idKey]] = new_item
          _res.push(new_item)
          data_list.push(new_item)
        })
      } else {
        const new_item = createItem(item, item[props.idKey])
        data_list_map[new_item[props.idKey]] = new_item
        _res.push(new_item)
        data_list.push(new_item)
      }
    })

    chooseOrg(_res)

    page = 1
    draw_end.value = page * limit

    if (!first) {
      resetSelected()
      first = true
    }
  }).catch((e) => {
    hl.message.error(e, '获取人员列表出错')
  })
}

let organization_id = ''

function chooseOrg(data) {
  // 没有选择部门或者选择的是天宁分局，数据直接取全量数据
  if (organization_id === '') {
    cur_data_list.value = data_list
  } else {
    // 选择了部门
    cur_data_list.value = []

    data.forEach((item) => {
      if (data_list_map[item[props.idKey]])
        cur_data_list.value.push(data_list_map[item[props.idKey]])
    })
  }
}

const show_select = ref(false)

function handleTreeChange(val) {
  organization_id = val
  check_all.value = !!all_map[organization_id]
  getData()
}

const query_name = ref('')
const select_users = ref([])

function handleOpen() {
  if (props.disabled)
    return

  resetSelected()
  show_select.value = true
}

// 选人
function handleSelect(item) {
  if (!item.selected) {
    item.selected = true

    if (props.multiple) {
      select_users.value.push(item)
    } else {
      select_users.value.forEach((e) => {
        e.selected = false
      })
      select_users.value = [item]
    }
  }
}

// 删除人
function delUser(index) {
  if (select_users.value[index].selected) {
    select_users.value[index].selected = false
    select_users.value.splice(index, 1)
  }
}

// 待选区域滚动到底部加载更多
function handleBottom() {
  if (limit * page < cur_data_list.value.length) {
    page++
    draw_end.value = page * limit
  }
}

const outer_page = ref(1)
const select_users_outer = ref([])
const select_users_outer_comp = computed(() => select_users_outer.value.slice(0, outer_page.value * limit))

// 外部显示框下拉加载更多
function handleOuterBottom() {
  if (limit * outer_page.value < select_users_outer.value.length) {
    outer_page.value++
  }
}

// 删除外部的人员
function delOuterUser(index) {
  select_users_outer.value.splice(index, 1)
  const ids = select_users_outer.value.map(item => item[props.idKey])
  emits('update:modelValue', ids)
  emits('change', ids)
}

// 确定
function handleSubmit() {
  const ids = []
  select_users_outer.value = []
  outer_page.value = 1

  select_users.value.forEach((item) => {
    ids.push(item[props.idKey])
    select_users_outer.value.push(item)
  })
  emits('update:modelValue', ids)
  emits('change', ids)
  show_select.value = false
}

let selected_page = 1
const selected_draw_end = ref(0)

// 已选择人员滚动到底部加载更多
function handleSelectedBottom() {
  if (limit * selected_page < select_users.value.length) {
    selected_page++
    selected_draw_end.value = selected_page * limit
  }
}

// 过滤掉已选择的和不满足姓名筛选的待选数据
const person_list_filter = computed(() => {
  try {
    return cur_data_list.value.filter((item) => {
      const filter_flg = item.police_id.includes(query_name.value) || item.name.includes(query_name.value) || item.job_name.includes(query_name.value) || item.organization_name.includes(query_name.value)
      return !item.selected && filter_flg
    })
  } catch (error) {
    console.log('tyyh.person-select-panel', error)
    return []
  }
})

const person_list_comp = computed(() => person_list_filter.value.slice(0, draw_end.value))

// 已经选择的人员数据
const select_users_comp = computed(() => select_users.value.slice(0, selected_draw_end.value))

// 全选|全不选
const all_map = reactive({})
const check_all = ref(false)

function checkAll() {
  all_map[organization_id] = !all_map[organization_id]
  check_all.value = all_map[organization_id]

  if (check_all.value) {
    person_list_filter.value.forEach((item) => {
      handleSelect(item)
    })
  } else if (organization_id === '' || organization_id === '320402000000') {
    // 全不选并且没有选择部门或者选择了天宁分局：将所有已选择的删掉
    clearAll()
  } else {
    // 选择了部门
    cur_data_list.value.forEach((item) => {
      const index = select_users.value.findIndex(user => user[props.idKey] === item[props.idKey])
      if (index > -1)
        delUser(index)
    })
  }
}

// 清除
function clearAll() {
  // 清除选择的人
  select_users.value.forEach((item) => {
    item.selected = false
  })
  select_users.value = []

  // 清除全选
  for (const key in all_map)
    all_map[key] = false

  check_all.value = false
}

// 打开弹框，重置已选择人员
function resetSelected() {
  // 先恢复
  data_list.forEach((item) => {
    item.selected = false
  })

  page = 1
  draw_end.value = page * limit

  selected_page = 1
  selected_draw_end.value = selected_page * limit
  select_users.value = []
  select_users_outer.value = []
  outer_page.value = 1

  cur_data_list.value = [...cur_data_list.value]

  props.modelValue.forEach((idKey) => {
    if (data_list_map[idKey]) {
      handleSelect(data_list_map[idKey])
      select_users_outer.value.push(data_list_map[idKey])
    }
  })
}

watch(() => props.modelValue, () => {
  resetSelected()
}, {
  immediate: true,
})

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="w-full">
    <div :class="{ disabled }" class="person-input" @click="handleOpen">
      <div v-bottom="handleOuterBottom" class="input">
        <template v-if="select_users_outer.length === 0">
          <span class="placeholder"> {{ placeholder }}</span>
        </template>

        <template v-else>
          <div v-for="(item, index) in select_users_outer_comp" :key="item[idKey]" class="selected-item">
            <span>{{ item.name }}<template v-if="inputShowAllData">_{{ item.org_job }}</template> </span>
            <hl-icon class="close-icon" icon="material-symbols-light:close-small" @click.stop="delOuterUser(index)" />
          </div>
        </template>
      </div>
      <hl-icon class="mr-2 el-input__suffix" icon="ep:arrow-down" style="width:14px" theme="outline" />
    </div>

    <hl-dialog v-model="show_select" title="选择人员" top="50px" width="92vw">
      <div class="person-index">
        <organization-tree ref="org_tree" class="left-job-tree" @change="handleTreeChange" />
        <div class="table-wrapper">
          <div class="selected-list">
            <div class="tips">
              <div class="tip-count">
                已选择 <span class="count">{{ select_users.length }}</span> 个人员
              </div>
              <div class="cursor-pointer select-none" @click="clearAll">
                清除
              </div>
            </div>
            <div v-bottom="handleSelectedBottom" class="list-wrapper">
              <el-tag v-for="(user, index) in select_users_comp" :key="user[idKey]" class="selected-tag" closable
                      size="large" @close="delUser(index)"
              >
                {{ user.name }} _ {{ user.org_job }}
              </el-tag>
            </div>
          </div>
          <div class="center">
            <el-input v-model.trim="query_name" clearable placeholder="请输入姓名、警号、职位、单位进行搜索" />
            <hl-reset-button class="ml-2" icon text="重置部门" @click="handleReset" />
          </div>
          <div class="select-options">
            <div v-bottom="handleBottom" class="options">
              <template v-if="person_list_comp.length">
                <div v-for="person in person_list_comp" :key="person[idKey]" class="person-item"
                     @click="handleSelect(person)"
                >
                  {{ person.name }} _ {{ person.org_job }}
                </div>
              </template>
              <template v-else>
                <hl-nodata class="relative-center" width="400px" />
              </template>
            </div>
            <div v-if="multiple" class="select-all">
              <el-checkbox v-model="check_all" size="large" value="全选" @change="checkAll" />
            </div>
          </div>
          <div class="text-right mt-3">
            <el-button type="primary" @click="handleSubmit">
              确定
            </el-button>
          </div>
        </div>
      </div>
    </hl-dialog>
  </div>
</template>

<style lang="scss" scoped>
.person-input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  line-height: calc(var(--el-input-height, 32px) - 2px);
  cursor: pointer;
  color: #606266;
  display: flex;
  flex-wrap: wrap;
  min-height: calc(var(--el-input-height, 32px) - 2px);
  align-items: center;
  background-color: #fff;

  .input {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    max-height: v-bind(maxHeight);
    overflow: auto;

    .placeholder {
      color: #a8abb2;
      padding-left: 11px;
    }

    .selected-item {
      padding: 0 5px;
      background-color: #f4f4f5;
      margin: 2px 5px;
      color: #909399;
      border-radius: 3px;
      font-size: 12px;
      line-height: 24px;
      height: 24px;
      display: flex;
      align-items: center;
    }
  }
}

.person-index {
  display: flex;
  height: 100%;
  width: 100%;
  max-height: calc(100vh - 175px);
  min-height: 50vh;
}

.left-job-tree {
  max-width: 290px;
  min-width: 200px;
  padding: 10px;
  background-color: white;
  overflow: auto;
}

.table-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 0;

  .selected-list {
    max-height: 35%;
    padding: 10px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;

    .tips {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 2px;

      .count {
        color: var(--color-danger);
      }
    }

    .list-wrapper {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      padding-top: 5px;
    }
  }

  .center {
    display: flex;
    margin: 10px 0;
  }

  .select-options {
    flex: 1;
    min-height: 388px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    padding: 10px;

    .person-item {
      background-color: var(--color-primary);
      border-radius: 4px;
      cursor: pointer;
      padding: 0px 7px;
      margin: 5px;
      color: white;
      font-size: var(--fs-b2);
      height: fit-content;
      user-select: none;
      padding: 5px 10px;
    }

    .options {
      flex: 1;
      overflow: auto;
      min-height: 0;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
    }

    .select-all {
      text-align: right;
      height: 14px;
      margin: 5px 0;
    }
  }
}

.selected-tag {
  user-select: none;
  margin: 5px;
}

:deep(.el-dialog__body) {
  padding: 0 !important;
}

:deep(.el-checkbox.el-checkbox--large) {
  height: 14px;
}

.disabled {
  background-color: var(--el-disabled-bg-color);
  cursor: not-allowed;
}
</style>
