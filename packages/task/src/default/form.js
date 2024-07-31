import { AUDIO_SUFFIX, FILE_SUFFIX, IMAGE_SUFFIX, VIDEO_SUFFIX } from '@hl/utils/file'

/**
 * 输入文本类型
 */
export const input_type_list = [{
  label: '手机号',
  value: 'phone',
}, {
  label: '身份证号',
  value: 'idCard',
}, {
  label: '数字',
  value: 'number',
}, {
  label: '整数',
  value: 'integer',
}, {
  label: '车牌号',
  value: 'carNum',
}, {
  label: 'IP地址',
  value: 'ip',
}, {
  label: '端口号',
  value: 'port',
}, {
  label: '邮箱',
  value: 'email',
}]

export const date_time_type = [{
  label: '年',
  value: 'year',
}, {
  label: '月',
  value: 'month',
}, {
  label: '日期',
  value: 'date',
}, {
  label: '日期时间',
  value: 'datetime',
}]

export const date_time_format_type = [{
  label: 'YYYY-MM-DD',
  value: 'YYYY-MM-DD',
}, {
  label: 'YYYY年MM月DD日',
  value: 'YYYY年MM月DD日',
}, {
  label: 'YYYY-MM-DD HH:mm:ss',
  value: 'YYYY-MM-DD HH:mm:ss',
}, {
  label: 'YYYY年MM月DD日 HH:mm:ss',
  value: 'YYYY年MM月DD日 HH:mm:ss',
}]

// 数据源
export const select_source_type = [{
  label: '自定义',
  value: '_self',
}, {
  label: '接口',
  value: 'api',
}]

// 显示控制字段的opt类型
export const show_opt_type = [{
  label: '=',
  value: 'equal',
  conditionFun: '==',
}, {
  label: '!=',
  value: 'ne',
  conditionFun: '!=',
}, {
  label: '>',
  value: 'gt',
  conditionFun: '>',
}, {
  label: '>=',
  value: 'gt_equal',
  conditionFun: '>=',
}, {
  label: '<',
  value: 'lt',
  conditionFun: '<',
}, {
  label: '<=',
  value: 'lt_equal',
  conditionFun: '<=',
}, {
  label: '包含',
  value: 'include',
  // 条件转换器
  conditionFun(key, value) {
    return `(
      (function fn() {
        var value = form['${key}']
        if(Array.isArray(value)){
          for(var i=0;i<value.length;i++){
            value[i] = value[i]+""
          }
        }else{
          value = value+""
        }
        return value.indexOf('${value}')>-1
      })()
    )`
  },
}]

// 显示控制：或与且
export const show_huo_qie = [{
  label: '或',
  value: 'huo',
  condition_value: '||',
}, {
  label: '且',
  value: 'qie',
  condition_value: '&&',
}]

// 对齐方式
export const align_type = [{
  label: '左对齐',
  value: 'left',
}, {
  label: '剧中',
  value: 'center',
}, {
  label: '右对齐',
  value: 'right',
}]

// 对齐方式
export const deivider_type = [{
  label: '实线',
  value: 'solid',
}, {
  label: '虚线',
  value: 'dashed',
}]

// 任务等级
export const task_level = [{
  label: '红色',
  value: 4,
  readonly: true,
}, {
  label: '橙色',
  value: 3,
  readonly: true,
}, {
  label: '蓝色',
  value: 2,
  readonly: true,
}, {
  label: '绿色',
  value: 1,
  readonly: true,
}]

// 任务期限
export const task_deadline_type = [{
  label: '6小时',
  value: 6,
}, {
  label: '12小时',
  value: 12,
}, {
  label: '24小时',
  value: 24,
}, {
  label: '48小时',
  value: 48,
}, {
  label: '自定义',
  value: 0,
}]

// 任务循环类型
export const task_circle_type = [{
  label: '循环',
  value: 1,
}, {
  label: '不循环',
  value: 2,
}]

// 附件类型
export const file_type_list = [{
  label: '图片',
  value: 'image',
}, {
  label: '视频',
  value: 'video',
}, {
  label: '音频',
  value: 'audio',
}, {
  label: '文件',
  value: 'file',
}]

// 附件后缀
export const suffix_type_list = [...AUDIO_SUFFIX, ...FILE_SUFFIX, ...IMAGE_SUFFIX, ...VIDEO_SUFFIX].map(item => ({
  label: item,
  value: item,
}))

// 用户类
export const user_type_default = [{
  label: '当前用户姓名',
  value: 'name',
  comp: 'user-default',
}, {
  label: '当前用户警号',
  value: 'police_id',
  comp: 'user-default',
}, {
  label: '当前用户身份证号',
  value: 'id_card',
  comp: 'user-default',
}, {
  label: '当前用户部门',
  value: 'org',
  comp: 'user-default',
}]

// 用户层级
export const user_level_default = [{
  label: '单位层级',
  value: 1,
}, {
  label: '行政层级',
  value: 2,
}, {
  label: '全市层级',
  value: 3,
}, {
  label: '分局层级',
  value: 4,
}, {
  label: '派出所层级',
  value: 5,
}, {
  label: '责任区层级',
  value: 6,
}]

// 默认值类型
export const default_type = [{
  label: '基础类',
  children: [{
    label: '自定义',
    value: 'custome',
    comp: 'hl-input',
  }],
}, {
  label: '用户类',
  children: user_type_default,
}, {
  label: '扩展类',
  children: [{
    label: '时间差计算',
    value: 'time_diff',
    comp: 'time-diff',
  }, {
    label: '数学计算',
    value: 'math',
    comp: 'math',
  }],
}]

export const fh = ['+', '-', '*', '/', '(', ')']
export const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']

export const is_whether = [{
  label: '是',
  value: 1,
}, {
  label: '否',
  value: 0,
}]
