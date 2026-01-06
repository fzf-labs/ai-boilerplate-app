import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace UserApi {
  /** 用户会员关系信息 */
  export interface UserMembershipInfo {
    id: string;
    userId: string;
    membershipType: string; // 会员类型编码(normal,vip,svip)
    expiredAt?: string; // 到期时间(普通会员为NULL,表示永不过期)
    autoRenew: number; // 是否自动续费(0否,1是)
    autoRenewDays: number; // 自动续费天数
    status: number; // 状态(-1禁用,1正常)
    createdAt: string;
    updatedAt: string;
  }

  /** 用户信息 */
  export interface User {
    id: string;
    phone: string;
    nickname?: string;
    gender?: number; // 性别（0未知 1男 2女）
    avatar?: string;
    profile?: string;
    wxGzhUserId?: string;
    wxGzhXcxId?: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    userMembershipInfo?: UserMembershipInfo; // 用户会员关系表信息
  }

  /** 创建用户请求 */
  export interface CreateUserReq {
    phone: string;
    nickname?: string;
    gender?: number;
    avatar?: string;
    profile?: string;
    status: number;
  }

  /** 更新用户请求 */
  export interface UpdateUserReq {
    id: string;
    nickname?: string;
    gender?: number;
    avatar?: string;
    profile?: string;
    status?: number;
  }

  /** 更新用户状态请求 */
  export interface UpdateUserStatusReq {
    id: string;
    status: number;
  }

  /** 删除用户请求 */
  export interface DeleteUserReq {
    id: string;
  }

  /** 生成测试Token请求 */
  export interface TestTokenReq {
    id: string;
  }
}

interface UserInfo {
  info: UserApi.User;
}

interface CreateUserReply {
  id: string;
}

interface TestTokenReply {
  token: string;
}

/** 查询用户列表 */
export function getUserList(
  params: PageReq & { nickname?: string; phone?: string },
) {
  return requestClient.get<PageReply<UserApi.User>>('/admin/v1/user/list', {
    params,
  });
}

/** 查询用户详情 */
export function getUserInfo(id: string) {
  return requestClient.get<UserInfo>(`/admin/v1/user/info?id=${id}`);
}

/** 新增用户 */
export function createUser(data: UserApi.CreateUserReq) {
  return requestClient.post<CreateUserReply>('/admin/v1/user/create', data);
}

/** 修改用户 */
export function updateUser(data: UserApi.UpdateUserReq) {
  return requestClient.post('/admin/v1/user/update', data);
}

/** 用户状态修改 */
export function updateUserStatus(data: UserApi.UpdateUserStatusReq) {
  return requestClient.post('/admin/v1/user/update/status', data);
}

/** 删除用户 */
export function deleteUser(data: UserApi.DeleteUserReq) {
  return requestClient.post('/admin/v1/user/delete', data);
}

/** 生成测试Token */
export function testToken(data: UserApi.TestTokenReq) {
  return requestClient.post<TestTokenReply>(
    '/admin/v1/user/generate_parent_test_token',
    data,
  );
}
