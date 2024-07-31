export default class CycleModel {
  constructor(config = {}) {
    config = config || {}

    // 循环周期
    this.cycleType = config.cycleType || 0

    // 开启日期
    this.startDate = config.startDate || dayjs().format('YYYY-MM-DD')

    // 开启时间
    this.startTime = config.startTime || dayjs().format('HH:mm')

    // 是否跳过节假日
    this.passHoliday = config.passHoliday || 0

    // 循环时间：周和月
    this.startDay = config.startDay || []
  }
}
