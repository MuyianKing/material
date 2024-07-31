import SignOpt from '../components/task/options/components/Sign.vue'
import HandleOpt from '../components/task/options/components/handle/Index.vue'
import HandleAllOpt from '../components/task/options/components/HandleAll.vue'
import ApproveOpt from '../components/task/options/components/Approve.vue'
import DelayOpt from '../components/task/options/components/Delay.vue'
import RevDelayOpt from '../components/task/options/components/RevDelay.vue'
import RevTurnOverOpt from '../components/task/options/components/RevTurnOver.vue'
import HandOverOpt from '../components/task/options/components/HandOver.vue'
import ExaminesDelayOpt from '../components/task/options/components/ExaminesDelay.vue'
import ExaminesTurnOverOpt from '../components/task/options/components/ExaminesTurnOver.vue'
import WorkAskFor from '../components/task/options/components/WorkAskFor.vue'
import DeleteOpt from '../components/task/options/components/Delete.vue'
import StartOpt from '../components/task/options/components/Start.vue'
import NoticeOpt from '../components/task/options/components/Notice.vue'
import TurnOver from '../components/task/options/components/TurnOver.vue'
import Redeploy from '../components/task/options/components/Redeploy.vue'
import SuccessOpt from '../components/task/options/components/Success.vue'
import ReSend from '../components/task/options/components/handle/ReSend.vue'
import AuditFeedback from '../components/task/options/components/audit-feedback/Index.vue'
// 任务状态
export const task_status_list = [{
  label: '未知任务',
  value: -2,
  color: '#CDD0D6',
}, {
  label: '撤销',
  value: -1,
  color: '#CDD0D6',
}, {
  label: '未开始',
  value: 0,
  color: '#CDD0D6',
}, {
  label: '未签收',
  value: 1,
  color: '#F56C6C',
  comp: 'sign-opt',
}, {
  label: '未完成',
  value: 2,
  color: '#E6A23C',
}, {
  label: '待审批',
  value: 3,
  color: '#E6A23C',
}, {
  label: '已完成',
  value: 11,
  color: '#67C23A',
}, {
  label: '超时完成',
  value: 12,
  color: '#F56C6C',
}, {
  label: '已审批',
  value: 13,
  color: '#67C23A',
}, {
  label: '超时审批',
  value: 14,
  color: '#F56C6C',
}, {
  label: '未读',
  value: 21,
}, {
  label: '已读',
  value: 22,
}, {
  label: '错误',
  value: -3,
  color: '#F56C6C',
}, {
  label: '未知',
  value: 3,
  color: '#E6A23C',
}, {
  label: '撤销',
  value: 4,
  color: '#E6A23C',
}]

// 任务处置
export const task_opt_list = [{
  label: '签收',
  value: 1,
  comp: SignOpt,
}, {
  label: '工作要求',
  value: 21,
  comp: WorkAskFor,
}, {
  label: '处置中',
  value: 2,
  comp: HandleOpt,
}, {
  label: '处置完成',
  value: 3,
  comp: HandleAllOpt,
}, {
  label: '完成',
  value: 4,
  comp: SuccessOpt,
}, {
  label: '重新下发',
  value: 5,
  comp: ReSend,
}, {
  label: '审批',
  value: 9,
  comp: ApproveOpt,
}, {
  label: '已读',
  value: 20,
  comp: NoticeOpt,
}, {
  label: '呈请延长',
  value: 31,
  comp: DelayOpt,
}, {
  label: '移交申请',
  value: 32,
  comp: HandOverOpt,
}, {
  label: '审批呈请延长',
  value: 41,
  comp: ExaminesDelayOpt,
}, {
  label: '审批移交申请',
  value: 42,
  comp: ExaminesTurnOverOpt,
}, {
  label: '撤销呈请延长',
  value: 51,
  comp: RevDelayOpt,
}, {
  label: '撤销移交申请',
  value: 52,
  comp: RevTurnOverOpt,
}, {
  label: '调度',
  value: 61,
  comp: null,
}, {
  label: '删除',
  value: 101,
  comp: DeleteOpt,
}, {
  label: '启动',
  value: 102,
  comp: StartOpt,
}, {
  label: '通知',
  value: 103,
  comp: NoticeOpt,
}, {
  label: '移交',
  value: 12,
  comp: TurnOver,
}, {
  label: '转派',
  value: 13,
  comp: Redeploy,
}, {
  label: '审批反馈',
  value: 43,
  comp: AuditFeedback,
}]

// 任务调度类型
export const rwdd_type_list = [{
  label: '人工确认调度',
  value: 0,
}, {
  label: '自动调度',
  value: 1,
}]

// 审批呈请
export const examinesApplyFor = [{
  label: '通过',
  value: 1,
}, {
  label: '驳回',
  value: 0,
}]

// 操作动态类型
export const additional_type_list = [{
  label: '发起',
  value: -1,
}, {
  label: '未通过',
  value: 0,
}, {
  label: '通过',
  value: 1,
}, {
  label: '忽略',
  value: 10,
}, {
  label: '撤销',
  value: 11,
}]

// 任务类型
export const taskStatus = [{
  label: '我的任务',
  value: 1,
  count: 120,
  unreadCount: 0,
  taskStatusOption: [{
    label: '未签收',
    value: 2,
  }, {
    label: '未完成',
    value: 3,
  }, {
    label: '已完成',
    value: 4,
  }],
}, {
  label: '待我审核',
  value: 11,
  count: 20,
  unreadCount: 0,
  taskStatusOption: [{
    label: '未审批',
    value: 12,
  }, {
    label: '已审批',
    value: 13,
  }],
}, {
  label: '我的下发',
  value: 31,
  count: 60,
  unreadCount: 0,
}, {
  label: '全部任务',
  value: 99,
  count: 240,
  unreadCount: 0,
  taskStatusOption: [{
    label: '全部未完成',
    value: 97,
  }, {
    label: '全部已完成',
    value: 98,
  }, {
    label: '不属我监控的',
    value: 89,
  }],
}]

// 任务统计类型
export const taskTypes = [{
  label: '局长指令',
  value: 1,
}, {
  label: '督办指令',
  value: 2,
}]
