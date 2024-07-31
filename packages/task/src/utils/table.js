import useBus from '@utils/bus'
import { exportTemplate } from '../server/config'

// 任务表格模板下载
export async function downloadTemplate(config_uuid) {
  try {
    const { url, file_name } = await exportTemplate(config_uuid)
    hl.file.download(url, file_name)
    hl.message.success('下载成功')
  } catch (e) {
    hl.message.error(e, '下载失败')
  }
}

const { emitBus } = useBus()
/**
 * 请求数据并刷新表格行数据
 * @param row 行数据
 * @param server 请求函数/更新后的行数据（返回更新后的行数据）
 * @returns {Promise<void>}
 */
export async function refreshTableRow(row, server) {
  try {
    let result = {}
    if (typeof server === 'function') {
      result = await server()
    } else {
      result = server
    }

    for (const key in result) {
      row[key] = result[key]
    }

    emitBus('refreshTableRow', result)
  } catch (e) {
    hl.message.error(e, '更新信息出错')
  }
}
