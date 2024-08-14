import Name from './name/Index.vue'
import CustomId from './custom-id/Index.vue'
import CustomUser from './custom-user/Index.vue'
import Handler from './handler/Index.vue'
import Copyer from './copyer/Index.vue'
import Helper from './helper/Index.vue'
import OtherNode from './other-node/Index.vue'
import Sign from './sign/Index.vue'
import ReadSign from './read-sign/Index.vue'
import StartBackAction from './start-back-action/Index.vue'
import RemarkValidNodes from './remark-valid-nodes/Index.vue'
import Approve from './approve/Index.vue'
import Remark from './remark/Index.vue'
import Form from './form/Index.vue'
import NoticeType from './notice-type/Index.vue'
import NoticeContent from './notice-content/Index.vue'
import NoticeProject from './notice-project/Index.vue'
import RemarkNoticeUser from './remark-notice-user/Index.vue'
import RemarkNoticeHandler from './remark-notice-handler/Index.vue'
import RemarkNoticeNode from './remark-notice-node/Index.vue'
import MultipleWorks from './multiple-works/Index.vue'
import FirstHandle from './first-handle/Index.vue'
import SecondHandle from './second-handle/Index.vue'
import IsHasPass from './is-has-pass/index.vue'
import PassHoliday from './pass-holiday/Index.vue'
import NearNotice from './near-notice/Index.vue'
import NearType from './near-type/Index.vue'
import NearNoticeTime from './near-notice-time/Index.vue'
import NearNoticeContent from './near-notice-content/Index.vue'
import ExpiredType from './expired-type/Index.vue'
import ExpiredNoticeContent from './expired-notice-content/Index.vue'
import CcNoticeType from './cc-notice-type/Index.vue'
import CcNoticeContent from './cc-notice-content/Index.vue'
import SendOrg from './send-org/Index.vue'
import SendRole from './send-role/Index.vue'
import Zp from './zp/Index.vue'
import ZpApprove from './zp-approve/Index.vue'
import ZpApprovePerson from './zp-approve-person/Index.vue'
import ZpApproveHandler from './zp-approve-handler/Index.vue'
import ZpNoticeType from './zp-notice-type/Index.vue'
import ZpNoticeContent from './zp-notice-content/Index.vue'
import ZpRefreshNoticeType from './zp-refresh-notice-type/Index.vue'
import ZpRefreshNoticeContent from './zp-refresh-notice-content/Index.vue'

export const property_list = [{
  field: 'title',
  key: 'FlowNodePropertyName',
  component: Name,
  type: 'base',
}, {
  field: 'custom_id',
  key: 'FlowNodePropertyCustomId',
  component: CustomId,
  type: 'base',
}, {
  field: 'custom_user',
  key: 'FlowNodePropertyCustomUser',
  component: CustomUser,
  type: 'user',
}, {
  field: 'handler',
  key: 'FlowNodePropertyHandler',
  component: Handler,
  type: 'user',
}, {
  field: 'copyer',
  key: 'FlowNodePropertyCopyer',
  component: Copyer,
  type: 'user',
}, {
  field: 'helper',
  key: 'FlowNodePropertyHelper',
  component: Helper,
  type: 'user',
}, {
  field: 'other_node',
  key: 'FlowNodePropertyOtherNode',
  component: OtherNode,
  type: 'user',
}, {
  field: 'sign',
  key: 'FlowNodePropertySign',
  component: Sign,
  type: 'base',
}, {
  field: 'read_is_sign',
  key: 'FlowNodePropertyReadSign',
  component: ReadSign,
  type: 'base',
}, {
  field: 're_delivery',
  key: 'FlowNodePropertyStartBackAction',
  component: StartBackAction,
  type: 'base',
}, {
  field: 'valid_nodes',
  key: 'FlowNodePropertyRemarkValidNodes',
  component: RemarkValidNodes,
  type: 'base',
}, {
  field: 'pass_label',
  key: 'FlowNodePropertyApprove',
  component: Approve,
  type: 'approve',
  value_type: 'all',
}, {
  field: 'remark',
  key: 'FlowNodePropertyRemark',
  component: Remark,
  type: 'remark',
}, {
  field: 'form_id',
  key: 'FlowNodePropertyForm',
  component: Form,
  type: 'form',
}, {
  field: 'notice_type',
  key: 'FlowNodePropertyNoticeType',
  component: NoticeType,
  type: 'notice',
}, {
  field: 'notice_message',
  key: 'FlowNodePropertyNoticeContent',
  component: NoticeContent,
  type: 'notice',
  value_type: 'all',
}, {
  field: 'project_id',
  key: 'FlowNodePropertyNoticeProject',
  component: NoticeProject,
  type: 'notice',
}, {
  field: 'notice_user',
  key: 'FlowNodePropertyRemarkNoticeUser',
  component: RemarkNoticeUser,
  type: 'notice',
}, {
  field: 'notice_handler',
  key: 'FlowNodePropertyRemarkNoticeHandler',
  component: RemarkNoticeHandler,
  type: 'notice',
}, {
  field: 'notice_node',
  key: 'FlowNodePropertyRemarkNoticeNode',
  component: RemarkNoticeNode,
  type: 'notice',
}, {
  field: 'multiple_works',
  key: 'FlowNodePropertyMultipleWorks',
  component: MultipleWorks,
  type: 'handle',
}, {
  field: 'first_value',
  key: 'FlowNodePropertyFirstHandle',
  component: FirstHandle,
  type: 'handle',
  value_type: 'all',
}, {
  field: 'second_value',
  key: 'FlowNodePropertySecondHandle',
  component: SecondHandle,
  type: 'handle',
  value_type: 'all',
}, {
  field: 'is_has_pass',
  key: 'FlowNodePropertyIsHasPass',
  component: IsHasPass,
  type: 'handle',
}, {
  field: 'pass_holiday',
  key: 'FlowNodePropertyPassHoliday',
  component: PassHoliday,
  type: 'handle',
}, {
  field: 'near_type',
  key: 'FlowNodePropertyNearNotice',
  component: NearNotice,
  type: 'near_notice_config',
}, {
  field: 'near_unit',
  key: 'FlowNodePropertyNearType',
  component: NearType,
  type: 'near_notice_config',
  value_type: 'all',
}, {
  field: 'near_notice_time',
  key: 'FlowNodePropertyNearNoticeTime',
  component: NearNoticeTime,
  type: 'near_notice_config',
  value_type: 'all',
}, {
  field: 'near_message',
  key: 'FlowNodePropertyNearNoticeContent',
  component: NearNoticeContent,
  type: 'near_notice_config',
  value_type: 'all',
}, {
  field: 'expired_type',
  key: 'FlowNodePropertyExpiredType',
  component: ExpiredType,
  type: 'expired_notice_config',
}, {
  field: 'expired_message',
  key: 'FlowNodePropertyExpiredNoticeContent',
  component: ExpiredNoticeContent,
  type: 'expired_notice_config',
  value_type: 'all',
}, {
  field: 'cc_type',
  key: 'FlowNodePropertyCcNoticeType',
  component: CcNoticeType,
  type: 'cc_notice_config',
}, {
  field: 'cc_message',
  key: 'FlowNodePropertyCcNoticeContent',
  component: CcNoticeContent,
  type: 'cc_notice_config',
  value_type: 'all',
}, {
  field: 'send_org',
  key: 'FlowNodePropertySendOrg',
  component: SendOrg,
  type: 'user',
}, {
  field: 'send_role',
  key: 'FlowNodePropertySendRole',
  component: SendRole,
  type: 'user',
}, {
  field: 'zp_enable',
  key: 'FlowNodePropertyZp',
  component: Zp,
  type: 'zp',
}, {
  field: 'zp_sp_enable',
  key: 'FlowNodePropertyZpApprove',
  component: ZpApprove,
  type: 'zp',
}, {
  field: 'zp_sp_type',
  key: 'FlowNodePropertyZpApprovePerson',
  component: ZpApprovePerson,
  type: 'zp',
}, {
  field: 'zp_sp_handler',
  key: 'FlowNodePropertyZpApproveHandler',
  component: ZpApproveHandler,
  type: 'zp',
}, {
  field: 'zp_sp_notice_type',
  key: 'FlowNodePropertyZpNoticeType',
  component: ZpNoticeType,
  type: 'zp',
}, {
  field: 'zp_sp_notice_message',
  key: 'FlowNodePropertyZpNoticeContent',
  component: ZpNoticeContent,
  type: 'zp',
  value_type: 'all',
}, {
  field: 'zp_sp_refuse_notice_type',
  key: 'FlowNodePropertyZpRefreshNoticeType',
  component: ZpRefreshNoticeType,
  type: 'zp',
}, {
  field: 'zp_sp_refuse_notice_message',
  key: 'FlowNodePropertyZpRefreshNoticeContent',
  component: ZpRefreshNoticeContent,
  type: 'zp',
  value_type: 'all',
}]

// 组件分类
export const type_list = [{
  label: '基础配置',
  key: 'base',
}, {
  label: '人员配置',
  key: 'user',
}, {
  label: '审批配置',
  key: 'approve',
}, {
  label: '转派配置',
  key: 'zp',
}, {
  label: '消息通知',
  key: 'notice',
}, {
  label: '抄送通知',
  key: 'cc_notice_config',
}, {
  label: '临期通知',
  key: 'near_notice_config',
}, {
  label: '过期通知',
  key: 'expired_notice_config',
}, {
  label: '处置配置',
  key: 'handle',
}, {
  label: '',
  key: 'remark',
}, {
  label: '关联表单',
  key: 'form',
}]
