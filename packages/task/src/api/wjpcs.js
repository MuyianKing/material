import { addPrefixToUrls } from '@hl/utils/api'

export default addPrefixToUrls('/wjpcs/api', {
  noticeList: '/day_notice/page',
  noticeRead: '/day_notice/read',
  noticeDelete: '/day_notice/delete',
  noticeCreate: '/day_notice/create',
  jzzlList: '/jzzl/list',
  jzzlType: '/jzzl/type_list',
  jzzlExport: '/jzzl/export_jzzl',
  jzzlCount: '/jzzl/list_count',
  jzzlOrg: '/jzzl/org_list',
  jzzlTaskCount: '/jzzl/count',
  jzzlScore: '/jzzl/score',
  jzzlScoreList: '/jzzl/score_list',
  pswordGet: 'ps-word/get-by-id',
  exportJzzlCount: '/jzzl/export_jzzl_count',
})
