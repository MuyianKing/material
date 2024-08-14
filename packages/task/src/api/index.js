import { addPrefixToUrls } from '@hl/utils/es/api'

export default addPrefixToUrls('/task/api', {
  app: '/task/config/app',
  taskTree: '/task/config/tree',
  taskConfigAdd: '/task/config/add',
  taskConfigEdit: '/task/config/edit',
  taskConfigPublish: '/task/config/publish',
  multiplePerson: '/task/sso/person',
  dict: '/task/config/params',
  taskConfigOne: '/task/config/one',
  taskConfigDel: '/task/config/delete',
  taskConfigStop: '/task/config/stop',
  taskConfigStart: '/task/config/start',
  taskConfigExport: '/task/config/export_demo',
  taskConfigImport: '/task/config/import_check',
  taskConfigConfirm: '/task/config/import_sure',
  taskAdditionalDelay: '/task/additional/cqyc_sq',
  taskRevDelay: '/task/additional/cqyc_cx',
  taskRevTurnOver: '/task/additional/yjsq_cx',
  taskExaminesDelay: '/task/additional/cqyc_sp',
  taskTurnOverDelay: '/task/additional/yjsq_sp',
  taskAdditionalMove: '/task/additional/yjsq_sq',
  taskAddWorkAskFor: '/task/additional/pz_add',
  taskRemoveWorkAskFor: '/task/additional/pz_del',
  groupList: '/task/group/list',
  groupCreate: '/task/group/add',
  groupEdit: '/task/group/edit',
  groupSort: '/task/group/sort',
  groupDel: '/task/group/delete',
  formAdd: '/task/form/add',
  formEdit: '/task/form/edit',
  formOne: '/task/form/one',
  formSome: '/task/form/some',
  dwcj: '/task/sso/dwcj_list',
  publish: '/task/info/add',
  list: '/task/list/list',
  taskOne: '/task/info/one',
  taskSign: '/task/info/sign',
  taskFinish: '/task/info/work',
  taskupdateResult: '/task/info/result_modify',
  taskAudit: '/task/info/audit',
  taskRead: '/task/info/read',
  taskInfoList: '/task/info/list',
  taskSuccess: '/task/info/finish',
  myTaskCount: '/task/benches/mytask',
  taskSubscriptionList: '/task/benches/subscribe_list',
  benchesConfigTree: '/task/benches/config_tree',
  benchesSubscriptionTask: '/task/benches/subscribe_set',
  benchesTaskCancel: '/task/benches/subscribe_cancel',
  benchesTaskList: '/task/benches/task_list',
  benchesTaskSet: '/task/benches/task_set',
  benchesJKRYGet: '/task/benches/jkry_get',
  benchesJKRYSet: '/task/benches/jkry_set',
  benchesInfoGroupSet: '/task/benches/info_group_set',
  taskBenchesParams: '/task/benches/params_get_condition',
  setBenchesParams: '/task/benches/params_set_condition',
  taskParams: '/task/benches/params_list',
  setHeaderParams: '/task/benches/params_set_list',
  getHeaderParams: '/task/benches/params_get_list',
  taskStatistics: '/task/benches/statistics',
  taskMyCreate: '/task/info/my_create',
  taskDelete: '/task/info/delete',
  taskStart: '/task/info/start',
  taskMyManage: '/task/info/my_manage',
  taskDeploy: '/task/info/deploy',
  taskDing: '/task/info/ding',
  taskTurnOver: '/task/info/yijiao',
  taskRedeploy: '/task/info/zhuanpai',
  taskGetDing: '/task/info/get_ding',
  taskInfoUnfinish: '/task/info/get_unfinish',
  taskNodeHandle: '/task/node/node_handler',
  taskUnfinish: '/task/benches/unfinish',
  infoGroupList: '/task/infogroup/list',
  infoGroupWhere: '/task/infogroup/get_where',
  infoGroupSetWhere: '/task/infogroup/set_where',
  infoGroupHeader: '/task/infogroup/get_items',
  infoGroupDetail: '/task/infogroup/one_detail',
  infoGroupExport: '/task/infogroup/one_export',
  infoGroupParams: '/task/infogroup/one_params',
  infoGroupSetItems: '/task/infogroup/set_items',
  infoGroupToTop: '/task/infogroup/to_top',
  infoGroupProcess: '/task/infogroup/one_process',
  infoTaskModelList: '/task/model/list',
  taskQueryGet: '/task/list/query_get',
  taskListBtn: '/task/list/btn_purview',
  taskListOrgGet: '/task/list/org_get',
  taskListOrgSet: '/task/list/org_set',
  taskListUserSet: '/task/list/user_set',
  taskListUserGet: '/task/list/user_get',
  taskInfoExport: '/task/info/export',
  taskListQuerySet: '/task/list/query_set',
  taskListQueryGet: '/task/list/query_get',
  taskListListSet: '/task/list/list_set',
  taskListLiastGet: '/task/list/list_get',
  taskListParamsGet: '/task/list/params_get',
  taskAuditFeedbackList: '/task/additional/work_sp_list',
  taskAuditFeedbackAudit: '/task/additional/work_sp',
  taskAlarmList: '/jq-basic/page',
})
