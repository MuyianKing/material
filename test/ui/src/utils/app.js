// 环境变量对象
export const ENV_CONFIG = import.meta.env

// 运行环境： dev - 开发环境  prod - 生成环境
export const ENV_MODE = ENV_CONFIG.MODE.includes('development') ? 'dev' : 'prod'

// 运行环境
export const MODE = ENV_CONFIG.MODE

// 应用名称
export const WEB_NAME = ENV_CONFIG.VITE_WEB_NAME

// 系统缓存统一前缀
export const PROJECT_PREFIX = ENV_CONFIG.VITE_PROJECT_PREFIX

// 接口基本地址
export const BASE_URL = ENV_CONFIG.VITE_BASE_URL

// 是否跨域
export const CORS = ENV_CONFIG.VITE_CORS

// 图标服务地址
export const ICONIFY_API = ENV_CONFIG.VITE_ICONIFY_API
