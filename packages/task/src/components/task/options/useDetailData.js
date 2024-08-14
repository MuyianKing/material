import { ref } from 'vue'
import { getTaskDetailData } from '../../../server'

export default function (taskId) {
  const task_data = ref({})
  const outer_comp_ids = ref([])

  async function getData() {
    try {
      const { result, _outer_comp_ids } = await getTaskDetailData(taskId)
      outer_comp_ids.value = _outer_comp_ids
      task_data.value = result
      return result
    } catch (e) {
      hl.message.error(e, '更新任务出错')
    }
  }

  return {
    task_data,
    outer_comp_ids,
    getData,
  }
}
