import type { AuthAdminInfo, Menu } from '@vben/types';

import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
    expiredAt: string;
    refreshAt: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }

  export interface MenuResult {
    menu: Menu[];
  }

  export interface PermissionResult {
    permission: string[];
  }

  export interface UpdateAdminInfoReq {
    nickname: string;
    sex: number;
    avatar: string;
  }

  export interface UpdateAdminPasswordReq {
    oldPassword: string;
    newPassword: string;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>(
    '/admin/v1/sys_auth/login',
    data,
  );
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>(
    '/admin/v1/sys_auth/refresh',
    {
      withCredentials: true,
    },
  );
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/admin/v1/sys_auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取管理员信息
 */
export async function getAdminInfoApi() {
  return requestClient.get<AuthAdminInfo>('/admin/v1/sys_auth/admin_info');
}

/** 更新个人资料 */
export function updateAdminInfo(data: AuthApi.UpdateAdminInfoReq) {
  return requestClient.post('/admin/v1/sys_auth/update/admin_info', data);
}

/** 修改个人密码 */
export function updateAdminPassword(data: AuthApi.UpdateAdminPasswordReq) {
  return requestClient.post('/admin/v1/sys_auth/update/admin_password', data);
}

/**
 * 获取管理员菜单
 */
export async function getAdminMenuApi() {
  return requestClient.get<AuthApi.MenuResult>('/admin/v1/sys_auth/menu');
}

/**
 * 获取用户权限
 */
export async function getAdminPermissionApi() {
  return requestClient.get<AuthApi.PermissionResult>(
    '/admin/v1/sys_auth/permission',
  );
}
