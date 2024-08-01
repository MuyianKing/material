import { ref } from 'vue'
import dayjs from 'dayjs'

export const SEARCH_TASK_STATUS_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const task_status_config = ref([{
  label: '近七天下发',
  key: 'distribute7',
  icon: 'emojione:books',
  count: 0,
  query() {
    return {
      create_start_time: `${dayjs().add(-7, 'day').format(SEARCH_TASK_STATUS_TIME_FORMAT)}_${dayjs().format(SEARCH_TASK_STATUS_TIME_FORMAT)}`,
      create_end_time: '',
      status_start_time: `${dayjs().add(-7, 'day').format(SEARCH_TASK_STATUS_TIME_FORMAT)}_${dayjs().format(SEARCH_TASK_STATUS_TIME_FORMAT)}`,
      status_end_time: '',
      contain_jkry: 0,
      status: ['0', '1', '2'],
    }
  },
}, {
  label: '待办任务',
  key: 'unfinish',
  icon: 'fxemoji:openbook',
  count: 0,
  query: {
    status_start_time: '',
    status_end_time: '',
    status: ['1', '2', '3', '21'],
    contain_jkry: 0,
  },
}, {
  label: '7天到期',
  key: 'due7',
  icon: 'fluent-emoji-flat:alarm-clock',
  count: 0,
  query() {
    return {
      create_end_time: `${dayjs().format(SEARCH_TASK_STATUS_TIME_FORMAT)}_${dayjs().add(7, 'day').format(SEARCH_TASK_STATUS_TIME_FORMAT)}`,
      create_start_time: '',
      status_end_time: `${dayjs().format(SEARCH_TASK_STATUS_TIME_FORMAT)}_${dayjs().add(7, 'day').format(SEARCH_TASK_STATUS_TIME_FORMAT)}`,
      status_start_time: '',
      contain_jkry: 0,
      status: [],
    }
  },
}, {
  label: '逾期未完成',
  key: 'overdue',
  icon: 'fluent-emoji-flat:police-car-light',
  count: 0,
  query() {
    return {
      status: ['2'],
      create_end_time: `_${dayjs().add(7, 'day').format(SEARCH_TASK_STATUS_TIME_FORMAT)}`,
      create_start_time: '',
      status_end_time: `_${dayjs().add(7, 'day').format(SEARCH_TASK_STATUS_TIME_FORMAT)}`,
      status_start_time: '',
      contain_jkry: 0,
    }
  },
}, {
  label: '已完成',
  key: 'finish',
  icon: 'noto-v1:party-popper',
  count: 0,
  query: {
    status_start_time: '',
    status_end_time: '',
    status: ['11', '12', '13', '14', '22'],
    contain_jkry: 0,
  },
}])
