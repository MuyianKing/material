import dayjs from 'dayjs'

// 获取时间日期
export function getDateRange(date) {
  // 默认值
  let date_start = ''
  let date_end = ''
  const format = 'YYYY-MM-DD' // 格式化
  switch (date) {
    case 'today':
      // 返回当天 - 当天
      date_start = dayjs().format(format)
      date_end = dayjs().format(format)
      break
    case 'week':
      // 返回本周第一天 - 本周最后一天
      date_start = dayjs().day(1).format(format)
      date_end = dayjs().day(7).format(format)
      break
    case 'month':
      // 返回本月第一天 - 本月最后一天
      date_start = dayjs().startOf('month').format(format)
      date_end = dayjs().endOf('month').format(format)
      break
    case 'year':
      // 返回本年第一天 - 本年最后一天
      date_start = dayjs().startOf('year').format(format)
      date_end = dayjs().endOf('year').format(format)
      break
    default:
      break
  }
  // 设置
  return { date_start, date_end }
}
