import type {
  IAppVersion,
  IBindPhoneReq,
  ICacheInfo,
  IChangePasswordReq,
  IDeleteAccountReq,
  ISendCodeReq,
  IUpdateUserProfileReq,
  IUserProfile,
} from './types/user'
import { http } from '@/http/http'

/**
 * 获取用户详细信息
 */
export function getUserProfile() {
  return http.get<IUserProfile>('/user/profile')
}

/**
 * 更新用户信息
 * @param data 用户信息
 */
export function updateUserProfile(data: IUpdateUserProfileReq) {
  return http.post<void>('/user/profile/update', data)
}

/**
 * 修改密码
 * @param data 密码信息
 */
export function changePassword(data: IChangePasswordReq) {
  return http.post<void>('/user/password/change', data)
}

/**
 * 发送验证码
 * @param data 手机号
 */
export function sendVerifyCode(data: ISendCodeReq) {
  return http.post<void>('/user/code/send', data)
}

/**
 * 绑定手机号
 * @param data 手机号和验证码
 */
export function bindPhone(data: IBindPhoneReq) {
  return http.post<void>('/user/phone/bind', data)
}

/**
 * 注销账号
 * @param data 密码
 */
export function deleteAccount(data: IDeleteAccountReq) {
  return http.post<void>('/user/account/delete', data)
}

/**
 * 获取缓存信息
 */
export function getCacheInfo() {
  return http.get<ICacheInfo>('/user/cache/info')
}

/**
 * 清除缓存
 */
export function clearCache() {
  return http.post<void>('/user/cache/clear')
}

/**
 * 检查版本更新
 */
export function checkVersion() {
  return http.get<IAppVersion>('/app/version/check')
}
