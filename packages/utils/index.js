import { addPrefixToUrls, generateApis, useURL } from './es/api'
import { authLogin, doDataProcess, downloadDrive, hasPlugin } from './es/auth'
import { autoRefresh } from './es/check.update'
import { isLight, mix, set16ToRgb } from './es/color'
import { arrayUnion, convertToChinaNum, evalByFun, firstUpcase, getCanUseValue, getLabelByVal, getUrlParam, guid, isTruth, jsonparse, pageSize, someInArray } from './es/common'
import { getDateRange } from './es/date'
import { exitFullScreen, getDpi, getImgSize, getMmByPx, getOffsetToBody, getPtByPx, getPxBymm, isOverflow, openFullScreen, translateUnit } from './es/dom'
import echartsUtil from './es/echarts.util'
import handleErrorr from './es/error'
import { AUDIO_SUFFIX, FILE_SUFFIX, IMAGE_SUFFIX, UPLOAD_FILE_MAX_SIZE, UPLOAD_VIDEO_MAX_SIZE, VIDEO_SUFFIX, download, fileToBlob, getBlobFromUrl, getMimeType, getSuffix, getType, mime_type, readBlobAsJSON } from './es/file'
import { closeLoading, confirm, error, loading, success, warning } from './es/message'
import * as nodebugger from './es/no.debugger'
import storage from './es/storage'
import { useTreeToTable } from './es/table'
import { flatTree, makeTree } from './es/tree.utils'
import { isIdNum, isJson, isObjectEmpty, v_carnum, v_email, v_id_num, v_int, v_ip, v_latlong, v_phone, v_phoneOrTel, v_port, v_tel } from './es/validator'
import { jump } from './es/router'

export {
  generateApis,
  useURL,
  addPrefixToUrls,
  authLogin,
  hasPlugin,
  downloadDrive,
  doDataProcess,
  autoRefresh,
  set16ToRgb,
  isLight,
  mix,
  arrayUnion,
  convertToChinaNum,
  evalByFun,
  firstUpcase,
  getCanUseValue,
  getLabelByVal,
  getUrlParam,
  guid,
  isTruth,
  jsonparse,
  pageSize,
  someInArray,
  getDateRange,
  translateUnit,
  getMmByPx,
  getPtByPx,
  getPxBymm,
  getDpi,
  openFullScreen,
  exitFullScreen,
  getOffsetToBody,
  isOverflow,
  getImgSize,
  echartsUtil,
  handleErrorr,
  mime_type,
  readBlobAsJSON,
  fileToBlob,
  getBlobFromUrl,
  download,
  getType,
  getMimeType,
  getSuffix,
  AUDIO_SUFFIX,
  IMAGE_SUFFIX,
  UPLOAD_FILE_MAX_SIZE,
  UPLOAD_VIDEO_MAX_SIZE,
  FILE_SUFFIX,
  VIDEO_SUFFIX,
  closeLoading,
  loading,
  error,
  success,
  warning,
  confirm,
  nodebugger,
  jump,
  storage,
  useTreeToTable,
  makeTree,
  flatTree,
  isJson,
  isObjectEmpty,
  isIdNum,
  v_phoneOrTel,
  v_int,
  v_carnum,
  v_port,
  v_email,
  v_phone,
  v_tel,
  v_ip,
  v_latlong,
  v_id_num,
}
