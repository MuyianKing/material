import { merge } from 'lodash-es'

/**
 * 生成所有的请求路径
 * @param {object} globModules 所有api文件的export
 * @returns 地址
 */
export function generateApis(globModules) {
  let apis = {}
  for (const key in globModules) {
    // 取文件名
    let name = /.\/(?<comp>.*).js/.exec(key)?.groups.comp.split('/')
    name = name[name.length - 1]

    apis = merge(apis, useURL(globModules[key].default.urls, {
      ...globModules[key].default.config,
      keyword: name === 'index' ? '' : name,
    }))
  }

  return apis
}

/**
 * 生成url
 * @param {object} urls 所有的url
 * @param {object} config 配置
 * @param {object} config.prefix 前缀
 * @param {object} config.keyword hl.api.keyword
 */
export function useURL(urls, config = {}) {
  const prefix = config.prefix || ''
  const url_map = addPrefixToUrls(prefix, urls)

  // 设置了keyword，以keyword作为属性名
  const keyword = config.keyword || ''
  if (keyword) {
    const url_map_key = {}
    url_map_key[keyword] = url_map
    return url_map_key
  }

  return url_map
}

/**
 * 为urls加上前缀
 * @param {string} prefix 前缀
 * @param {object} urls 地址
 * @returns 地址
 */
export function addPrefixToUrls(prefix, urls) {
  const new_urls = {}
  for (const key in urls) {
    new_urls[key] = prefix + urls[key]
  }

  return new_urls
}
