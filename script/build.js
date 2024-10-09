import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { build } from 'vite'
import fsExtra from 'fs-extra'
import ui_vite_config from '../packages/ui/vite.config.js'
import tyyh_vite_config from '../packages/tyyh/vite.config.js'
import utils_vite_config from '../packages/utils/vite.config.js'
import hooks_vite_config from '../packages/hooks/vite.config.js'
import dir_vite_config from '../packages/directions/vite.config.js'
import clearFolder from './utils/clearFolder.js'
import getObjectFromJson from './utils/getObjectFromJson.js'

const __dirname = fileURLToPath(import.meta.url)

const outputDir = path.resolve(__dirname, '../../dist')

/**
 * 生成组件的 package.json 文件
 * @param {*} name
 * @param {*} options
 * @param {*} options.version 版本号：大部分情况下都是组件自身定义，少数情况外部指定，比如所有组件统一升级到一个大版本
 */
function createPackageJson(name, options) {
  options = options || {}
  const { version } = options

  const package_path = path.resolve(__dirname, `../../packages/${name}/package.json`)
  const _config = getObjectFromJson(package_path)

  _config.version = version || _config.version
  const fileStr = JSON.stringify(_config, '', '\t')
  fsExtra.outputFile(
    path.resolve(outputDir, `${name}/package.json`),
    fileStr,
    'utf-8',
  )

  // 如果指定的version，需要回写到组件库的package.json
  if (version) {
    fsExtra.outputFile(
      package_path,
      fileStr,
      'utf-8',
    )
  }
}

// 所有组件的打包配置
const build_config = {
  ui: ui_vite_config,
  tyyh: tyyh_vite_config,
  utils: utils_vite_config,
  hooks: hooks_vite_config,
  directions: dir_vite_config,
}

async function buildLib(pck, options) {
  await build(build_config[pck])
  createPackageJson(pck, options)
}

async function buildPackages() {
  // 清空目录
  clearFolder(path.resolve(__dirname, outputDir))

  const fix_version = false

  const options = fix_version
    ? {
        version: '0.6.1',
      }
    : null

  const params = getParams()

  if (params.pck) {
    buildLib(params.pck, options)
  } else {
    buildLib('ui', options)
    buildLib('tyyh', options)
    buildLib('utils', options)
    buildLib('hooks', options)
    buildLib('directions', options)
  }
}

// 获取参数
function getParams() {
  const params = {}
  process.argv.forEach((item) => {
    item = item.split('=')

    if (item.length === 2) {
      params[item[0]] = item[1]
    }
  })

  return params
}

buildPackages()
