import http from '../utils/request'

import { clearUserData } from '@hooks/user'
import { ENV_MODE } from "../utils/app"

/**
 * 登录
 * @param {*} params
 */
export function login(params) {
  console.log("login", params);
  return http.post(hl.api.tyyh.login, params)
}

/**
 * 退出登录
 */
export async function logout(router) {
  try {
    await http.post(hl.api.tyyh.logout)
    clearUserData(router)
  } catch (error) {
    console.log(error)
  } finally {
    let url = `${window.location.origin}${window.location.pathname}#/login`
    if (ENV_MODE === 'dev') {
      url += '?hl=!@#'
    }

    window.location.href = url
  }
}