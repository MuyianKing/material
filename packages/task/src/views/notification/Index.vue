<script name="NotificationIndex" setup>
import useListPage from '@hl/ui/src/list-page'
import { SetRolePerson } from '@hl/tyyh'
import { deleteNotice, getNoticeList } from '../../server/notice'
import AddNoticeBtn from './add/Index.vue'

const {
  HlListPage,
  getData,
  table_data,
  loading,
  query,
  search,
} = useListPage({
  query: {
    query: '',
    status: '',
    create_time: '',
  },
  data_extend_keys: ['header_config'],
  server: getNoticeList,
})

const roleSetShow = ref(false)

function handleDel(row) {
  const delLoading = hl.message.loading('正在删除，请稍后...')
  deleteNotice(row.id).then(() => {
    getData()
  }).catch((e) => {
    hl.message.error(e, '删除失败，请重试')
  }).finally(() => {
    delLoading.close()
  })
}
</script>

<template>
  <hl-list-page no-add>
    <template #search>
      <hl-form-item label="通知标题">
        <hl-input v-model="query.query" style="width: 200px" @input="search" />
      </hl-form-item>
      <hl-form-item label="通知时间">
        <hl-date v-model:end="query.end_time" v-model:start="query.start_time" type="daterange" @change="search" />
      </hl-form-item>
    </template>
    <template #button>
      <add-notice-btn @refresh="getData" />
      <hl-button icon="carbon:software-resource-cluster" type="success" @click="roleSetShow = true">
        通知人员
      </hl-button>
      <!--      <refresh-btn :loading="loading" class="mr-2" @refresh="getData" /> -->
    </template>
    <template #table>
      <hl-table v-loading="loading" :data="table_data.data" nowrap row-key="task_id">
        <hl-table-column type="index" />
        <hl-table-column label="通知内容" prop="title" />
        <hl-table-column label="通知时间" prop="time" />
        <hl-table-column label="附件" prop="file">
          <template #default="{ row }">
            <hl-file :file="row.file_info" />
          </template>
        </hl-table-column>
        <hl-table-column label="已读人员" prop="notice_read">
          <template #default="{ row }">
            <span>人数：{{ row?.noticeLenght }}；</span>
            {{ row?.noticeListName }}
          </template>
        </hl-table-column>
        <hl-table-column label="操作" width="80">
          <template #default="{ row }">
            <hl-del-button type="text" @click="handleDel(row)" />
          </template>
        </hl-table-column>
      </hl-table>
    </template>
    <set-role-person v-model="roleSetShow" role-id="wjtztb" />
  </hl-list-page>
</template>

<style lang='scss' scoped>
:deep(table .el-button) {
  padding: 0;
  height: fit-content;
}
</style>
