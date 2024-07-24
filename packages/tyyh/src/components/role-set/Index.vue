<script name='SimpleUser' setup>
import useListPage from '@hl/ui/src/list-page/index'
import RoleModel from '../../model/Role'
import OrgCascader from '../organization-cascader/Index.vue'
import JobCascader from '../job-cascader/Index.vue'
import PersonSelect from '../person-select-panel/Index.vue'
import { getUserRole } from '../../server/person'
import { getList, saveRole } from '../../server/role'
import PersonItem from '../person-item'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  roleId: {
    type: [Number, String],
    required: true,
  },
})

const emits = defineEmits(['update:modelValue', 'refresh'])

const {
  HlListPage,
  query,
  getData,
  table_data,
  loading,
} = useListPage({
  query: {
    limit: 24,
    id: '',
    role_user: '',
    job_ids: [],
    organization_ids: [],
    police_ids: [],
    query: '',
    org_job_police: [],
  },
  server: getUserRole,
  autoSearch: false,
})

function close() {
  emits('update:modelValue', false)
}

const form = ref({})

function personSelectChange() {
  query.police_ids = query.org_job_police.map((item) => {
    const arr = item.split('/')
    return arr[arr.length - 1]
  })
  console.log(query.police_ids)
  getData()
}

const submitLoading = ref(false)

function onSubmit() {
  if (!form.value.id) {
    hl.message.warning('未获取到角色数据，请刷新重试')
    return
  }

  submitLoading.value = true

  form.value.org_job_police = query.org_job_police
  form.value.organization_id = query.organization_ids
  form.value.job_id = query.job_ids

  saveRole(form.value).then(() => {
    hl.message.success('保存成功')
    emits('refresh')
    close()
  }).catch((e) => {
    hl.message.error(e, '保存失败')
  }).finally(() => {
    submitLoading.value = false
  })
}

async function getRoleData() {
  try {
    const { data } = await getList({ role_id: props.roleId })
    const _data = data[0] || {}
    form.value = new RoleModel(_data)
    query.job_ids = _data.job_id
    query.organization_ids = _data.organization_id
    query.org_job_police = _data.org_job_police
    query.police_ids = _data.police_id
  } catch (e) {
    hl.message.error(e, '获取角色数据失败')
  }
}

watch(() => props.modelValue, async (val) => {
  if (val) {
    loading.value = true
    await getRoleData()
    // 没有id修改不了
    if (!form.value.id) {
      hl.message.warning('未获取到角色数据，请刷新重试')
      return
    }
    query.page = 1
    table_data.data = []
    await getData()
    loading.value = false
  }
}, { immediate: true })
</script>

<template>
  <hl-dialog :model-value="modelValue" :title="`${form.role_name ? `${form.role_name}--` : ''}--人员列表`" class="owner" top="30px" width="1200px" @close="close">
    <hl-list-page v-loading="loading" max-height="calc(100vh - 220px)" no-add no-search style="min-height: 440px;">
      <template #search>
        <hl-form-item class="items-start w-full" label="人员">
          <person-select v-model="query.org_job_police" class="w-full" clearable id-key="org_job_police" max-height="64px" multiple @change="personSelectChange" />
        </hl-form-item>
        <hl-form-item class="items-start w-1/2 flex-1" label="组织机构">
          <org-cascader v-model="query.organization_ids" class="w-full" clearable collapse-tags collapse-tags-tooltip multiple @change="getData" />
        </hl-form-item>
        <hl-form-item class="items-start  w-1/2 flex-1" label="职务">
          <job-cascader v-model="query.job_ids" class="w-full" clearable collapse-tags collapse-tags-tooltip multiple @change="getData" />
        </hl-form-item>
      </template>

      <template #table>
        <div class="flex flex-wrap" style="max-height: 664px;">
          <person-item v-for="item in table_data.data" :key="item.id" :user="item" @change="getData" />
        </div>
        <div v-show="table_data.data.length === 0" style="height: 320px;width: 100%;">
          <hl-nodata width="400px" />
        </div>
      </template>
    </hl-list-page>

    <template #footer>
      <hl-button :loading="submitLoading" text="确认" @click="onSubmit" />
    </template>
  </hl-dialog>
</template>

<style lang='scss' scoped>
.owner {
  ::v-deep(.el-dialog__body) {
    padding-top: 10px;
  }
}
</style>
