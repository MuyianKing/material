import Label from './label/Index.vue'
import LabelWidth from './label-width/Index.vue'
import LabelId from './label-id/Index.vue'
import IframeUrl from './iframe-url/Index.vue'
import Token from './token/Index.vue'
import Align from './align/Index.vue'
import Placeholder from './placeholder/Index.vue'
import Guide from './guide/Index.vue'
import Columns from './columns/Index.vue'
import DateFormat from './date-format/Index.vue'
import DateType from './date-type/Index.vue'
import DividerStyle from './divider-style/Index.vue'
import Expand from './expand/Index.vue'
import ExpandMultiple from './expand-multiple/Index.vue'
import OneLine from './one-line/Index.vue'
import Format from './format/Index.vue'
import Multiple from './multiple/Index.vue'
import Outer from './outer/Index.vue'
import Range from './range/Index.vue'
import Required from './required/Index.vue'
import Status from './status/Index.vue'
import SourceType from './source-type/Index.vue'
import Options from './options/Index.vue'
import ControlShow from './control-show/Index.vue'
import MaxminLength from './maxmin-length/Index.vue'
import Rows from './rows/Index.vue'
import UploadType from './upload-type/Index.vue'
import UploadSuffix from './upload-suffix/Index.vue'
import UploadMultiple from './upload-multiple/Index.vue'
import UploadMinmax from './upload-minmax/Index.vue'
import DefaultValue from './default-value/Index.vue'
import PhoneType from './phone-type/Index.vue'
import TextColor from './text-color/Index.vue'
import BgColor from './bg-color/Index.vue'
import FontSize from './font-size/Index.vue'
import FontWeight from './font-weight/Index.vue'
import FontItalic from './font-italic/Index.vue'
import TextIndent from './text-indent/Index.vue'
import Padding from './padding/Index.vue'
import DataRange from './data-range/Index.vue'
import ShowType from './show-type/Index.vue'
import CheckStrictly from './check-strictly/Index.vue'
import AllData from './all-data/Index.vue'
import OrgUrl from './org-url/Index.vue'
import KeepLevel from './keep-level/Index.vue'
import MultTask from './mult-task/Index.vue'
import Clearable from './clearable/Index.vue'
import PersonHasNext from './person-has-next/Index.vue'
import PersonIdKey from './person-id-key/Index.vue'
import PersonLinkOrg from './person-link-org/Index.vue'
import PersonSelect from './person-select/Index.vue'

// 所有属性组件
export const property_list = [{
  field: 'label',
  key: 'FormPropertyLabel',
  component: Label,
  type: 'base',
}, {
  field: 'label_width',
  key: 'FormPropertyLabelWidth',
  component: LabelWidth,
  type: 'base',
}, {
  field: 'label_id',
  key: 'FormPropertyLabelId',
  component: LabelId,
  type: 'base',
}, {
  field: 'iframe_url',
  key: 'FormPropertyIframeUrl',
  component: IframeUrl,
  type: 'base',
}, {
  field: 'token',
  key: 'FormPropertyToken',
  component: Token,
  type: 'base',
}, {
  field: 'align',
  key: 'FormPropertyAlign',
  component: Align,
  type: 'base',
}, {
  field: 'placeholder',
  key: 'FormPropertyPlaceholder',
  component: Placeholder,
  type: 'base',
}, {
  field: 'guide',
  key: 'FormPropertyGuide',
  component: Guide,
  type: 'base',
}, {
  field: 'columns',
  key: 'FormPropertyColumns',
  component: Columns,
  type: 'base',
}, {
  field: 'date_format',
  key: 'FormPropertyDateFormat',
  component: DateFormat,
  type: 'date',
  value_type: 'all',
}, {
  field: 'date_type',
  key: 'FormPropertyDateType',
  component: DateType,
  type: 'date',
}, {
  field: 'divider_style',
  key: 'FormPropertyDividerStyle',
  component: DividerStyle,
  type: 'base',
}, {
  field: 'expand',
  key: 'FormPropertyExpand',
  component: Expand,
  type: 'base',
}, {
  field: 'expand_multiple',
  key: 'FormPropertyExpandMultiple',
  component: ExpandMultiple,
  type: 'base',
  value_type: 'all',
}, {
  field: 'one_line',
  key: 'FormPropertyOneLine',
  component: OneLine,
  type: 'base',
  value_type: 'all',
}, {
  field: 'format',
  key: 'FormPropertyFormat',
  component: Format,
  type: 'base',
}, {
  field: 'multiple',
  key: 'FormPropertyMultiple',
  component: Multiple,
  type: 'base',
}, {
  field: 'outer_field',
  key: 'FormPropertyOuter',
  component: Outer,
  type: 'other',
}, {
  field: 'is_range',
  key: 'FormPropertyRange',
  component: Range,
  type: 'date',
}, {
  field: 'required',
  key: 'FormPropertyRequired',
  component: Required,
  type: 'base',
}, {
  field: 'status',
  key: 'FormPropertyStatus',
  component: Status,
  type: 'base',
}, {
  field: 'source_type',
  key: 'FormPropertySourceType',
  component: SourceType,
  type: 'source',
  value_type: 'all',
}, {
  field: 'options',
  key: 'FormPropertyOptions',
  component: Options,
  type: 'source',
}, {
  field: 'show',
  key: 'FormPropertyControlShow',
  component: ControlShow,
  type: 'show',
}, {
  field: 'maxmin',
  key: 'FormPropertyMaxminLength',
  component: MaxminLength,
  type: 'base',
  value_type: 'all',
}, {
  field: 'rows',
  key: 'FormPropertyRows',
  component: Rows,
  type: 'base',
}, {
  field: 'upload_type',
  key: 'FormPropertyUploadType',
  component: UploadType,
  type: 'base',
}, {
  field: 'upload_suffix',
  key: 'FormPropertyUploadSuffix',
  component: UploadSuffix,
  type: 'base',
}, {
  field: 'upload_multiple',
  key: 'FormPropertyUploadMultiple',
  component: UploadMultiple,
  type: 'base',
}, {
  field: 'upload_minmax',
  key: 'FormPropertyUploadMinmax',
  component: UploadMinmax,
  type: 'base',
  value_type: 'all',
}, {
  field: 'default_value',
  key: 'FormPropertyDefaultValue',
  component: DefaultValue,
  type: 'default',
}, {
  field: 'phone_type',
  key: 'FormPropertyPhoneType',
  component: PhoneType,
  type: 'phone',
}, {
  field: 'text_color',
  key: 'FormPropertyTextColor',
  component: TextColor,
  type: 'base',
}, {
  field: 'bg_color',
  key: 'FormPropertyBgColor',
  component: BgColor,
  type: 'base',
}, {
  field: 'font_size',
  key: 'FormPropertyFontSize',
  component: FontSize,
  type: 'base',
}, {
  field: 'font_weight',
  key: 'FormPropertyFontWeight',
  component: FontWeight,
  type: 'base',
}, {
  field: 'font_italic',
  key: 'FormPropertyFontItalic',
  component: FontItalic,
  type: 'base',
}, {
  field: 'text_indent',
  key: 'FormPropertyTextIndent',
  component: TextIndent,
  type: 'base',
}, {
  field: 'padding',
  key: 'FormPropertyPadding',
  component: Padding,
  type: 'base',
}, {
  field: 'data_range',
  key: 'FormPropertyDataRange',
  component: DataRange,
  type: 'org',
}, {
  field: 'show_type',
  key: 'FormPropertyShowType',
  component: ShowType,
  type: 'org',
}, {
  field: 'check_strictly',
  key: 'FormPropertyCheckStrictly',
  component: CheckStrictly,
  type: 'org',
}, {
  field: 'all_data',
  key: 'FormPropertyAllData',
  component: AllData,
  type: 'org',
}, {
  field: 'org_url',
  key: 'FormPropertyOrgUrl',
  component: OrgUrl,
  type: 'org',
}, {
  field: 'keep_level',
  key: 'FormPropertyKeepLevel',
  component: KeepLevel,
  type: 'org',
}, {
  field: 'mult_task',
  key: 'FormPropertyMultTask',
  component: MultTask,
  type: 'org',
}, {
  field: 'clearable',
  key: 'FormPropertyClearable',
  component: Clearable,
  type: 'base',
}, {
  field: 'person_has_next',
  key: 'FormPropertyPersonHasNext',
  component: PersonHasNext,
  type: 'person',
}, {
  field: 'person_id_key',
  key: 'FormPropertyPersonIdKey',
  component: PersonIdKey,
  type: 'person',
}, {
  field: 'person_link_org',
  key: 'FormPropertyPersonLinkOrg',
  component: PersonLinkOrg,
  type: 'person',
}, {
  field: 'person_data',
  key: 'FormPropertyPersonSelect',
  component: PersonSelect,
  type: 'person',
}]

// 组件分类
export const type_list = [{
  label: '基础配置',
  key: 'base',
}, {
  label: '数据源配置',
  key: 'source',
}, {
  label: '单位配置',
  key: 'org',
}, {
  label: '人员配置',
  key: 'person',
}, {
  label: '时间格式',
  key: 'date',
}, {
  label: '手机端配置',
  key: 'phone',
}, {
  label: '默认值',
  key: 'default',
}, {
  label: '显示控制',
  key: 'show',
}, {
  label: '其他',
  key: 'other',
}]
