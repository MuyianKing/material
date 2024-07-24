export default {
  config: {
    prefix: '/zgcpcs',
  },
  // 请求路径
  urls: {
    noticeList: '/notice/noticeList',
    noticeEdit: '/notice/editNotice',
    noticeAdd: '/notice/issueNotice',
    noticeDelete: '/notice/deleteNotice',
    noticeDetail: '/notice/detail',
    noticeIsRead: '/notice/setToRead',
    noticeTotal: '/notice/readOrNotReadTimes',
    cjDict: '/jqDict/getCjDict',
    jjDict: '/jqDict/getJjDict',
    jqList: '/jq/page',
    jqAdd: '/jq/insert',
    jqEdit: '/jq/update',
    jqDelete: '/jq/delete',
    jqDetailById: '/jq/get-by-id',
    addPolicePersonInfo: '/jq/add-person-info',
    updatePolicePersonInfo: '/jq/update-person-info',
    deletePolicePersonInfo: '/jq/delete-involved-person',
    involvedPersonInfo: '/sj/involved-person-info',
    involvedPersonPage: '/sj/involved-person-page',
    countPolice: '/jq/count-police',
    dictTree: '/dict/tree',
    dictAdd: '/dict/add',
    dictUpdate: '/dict/update',
    dictSort: '/dict/update-sort'
  },
}
