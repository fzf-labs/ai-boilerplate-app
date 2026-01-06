import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemAdminApi {
  /** 用户信息 */
  export interface Admin {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
    sex: number;
    email: string;
    mobile: string;
    roleId: string;
    deptId: string;
    postId: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    roleName: string;
    deptName: string;
    postName: string;
  }

  /** 个人资料更新请求 */
  export interface UpdateProfileReq {
    nickname: string;
    mobile?: string;
    email?: string;
    sex: number;
    avatar?: string;
  }

  /** 密码重置请求 */
  export interface ResetPasswordReq {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
}

interface AdminInfo {
  info: SystemAdminApi.Admin;
}

/** 查询用户下拉列表 */
export function getAdminSelector() {
  return requestClient.get<PageReply<SystemAdminApi.Admin>>(
    '/admin/v1/sys_admin/selector',
    {},
  );
}

/** 查询用户管理列表 */
export function getAdminList(params: PageReq) {
  return requestClient.get<PageReply<SystemAdminApi.Admin>>(
    '/admin/v1/sys_admin/list',
    { params },
  );
}

/** 查询用户详情 */
export function getAdminInfo(id: string) {
  return requestClient.get<AdminInfo>(`/admin/v1/sys_admin/info?id=${id}`);
}

/** 新增用户 */
export function createAdmin(data: SystemAdminApi.Admin) {
  return requestClient.post('/admin/v1/sys_admin/create', data);
}

/** 修改用户 */
export function updateAdmin(data: SystemAdminApi.Admin) {
  return requestClient.post('/admin/v1/sys_admin/update', data);
}

/** 用户状态修改 */
export function updateAdminStatus(id: string, status: number) {
  return requestClient.post('/admin/v1/sys_admin/update/status', {
    id,
    status,
  });
}

/** 删除用户 */
export function deleteAdmin(id: string) {
  return requestClient.post(`/admin/v1/sys_admin/delete`, { id });
}

/** 用户密码重置 */
export function resetAdminPassword(id: string, password: string) {
  return requestClient.post('/admin/v1/sys_admin/update/password', {
    id,
    password,
  });
}
