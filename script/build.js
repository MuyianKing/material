import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { constants, copyFileSync, promises } from 'node:fs'
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

// 打包输出路径
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

  if (name !== 'theme-chalk') {
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8',
    )
  }

  // 如果指定的version，需要回写到组件库的package.json
  if (version) {
    fsExtra.outputFile(
      package_path,
      fileStr,
      'utf-8',
    )
  }

  return {
    name,
    version: _config.version,
  }
}

// 拷贝README.md
function copyREADME(name) {
  const package_path = path.resolve(__dirname, `../../packages/${name}/README.md`)
  copyFileSync(package_path, path.resolve(outputDir, `${name}/README.md`), constants.COPYFILE_EXCL)
}

// 打包主题包
async function buildThemeChalk(version) {
  const pck = 'theme-chalk'

  // 更新版本
  createPackageJson(pck, {
    version,
  })

  const package_path = path.resolve(__dirname, `../../packages/${pck}`)
  const output_path = path.resolve(`${outputDir}/ui`, pck)

  await promises.cp(package_path, output_path, {
    force: true, // 存在则强制覆盖
    recursive: true, // 递归文件夹拷贝，如果为false，里面有文件夹则报错
  })
}

// 所有组件的打包配置
const build_config = {
  ui: ui_vite_config,
  tyyh: tyyh_vite_config,
  utils: utils_vite_config,
  hooks: hooks_vite_config,
  directions: dir_vite_config,
}

// 打包单个组件库
async function buildLib(pck, options) {
  await build(build_config[pck])
  const { version } = createPackageJson(pck, options)
  copyREADME(pck)

  if (pck === 'ui') {
    buildThemeChalk(version)
  }
}

// 打包
async function buildPackages() {
  // 判断有没有dist目录，没有创建
  try {
    await promises.stat(outputDir)
    // 清空目录
    clearFolder(outputDir)
  } catch {
    // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
    await promises.mkdir(outputDir, { recursive: true })
  }

  const params = getParams()

  const options = {
    // 非0：需要外部修正版本号
    version: params.v || 0,
  }

  if (params.pck) {
    // 打包指定组件库
    buildLib(params.pck, options)
  } else {
    // 打包所有
    ['ui', 'tyyh', 'utils', 'hooks', 'directions'].forEach((pck) => {
      buildLib(pck, options)
    })
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
