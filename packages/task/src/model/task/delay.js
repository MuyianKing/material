export default class Delay {
  constructor(task_id, time) {
    // 任务id
    this.task_id = task_id

    // 延长到什么时候：精确到秒
    this.end_time = dayjs(time).add(1, 'day').format('YYYY-MM-DD 23:59:59')

    // 申请理由
    this.remark = ''
  }
}
