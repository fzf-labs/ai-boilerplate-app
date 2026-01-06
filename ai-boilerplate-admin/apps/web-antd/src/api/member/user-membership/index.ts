import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace UserMembershipApi {
  /** 用户会员关系信息 */
  export interface UserMembership {
    id: string;
    userId: string; // 用户ID
    membershipType: string; // 会员类型编码(normal,vip,svip)
    expiredAt: string; // 到期时间(普通会员为NULL,表示永不过期)
    autoRenew: number; // 是否自动续费(0否,1是)
    autoRenewDays: number; // 自动续费天数
    status: number; // 状态(-1禁用,1正常)
    createdAt: string;
    updatedAt: string;
  }

  /** 创建用户会员关系请求 */
  export interface CreateUserMembershipReq {
    userId: string;
    membershipType: string;
    expiredAt?: string;
    autoRenew?: number;
    autoRenewDays?: number;
    status: number;
  }

  /** 更新用户会员关系请求 */
  export interface UpdateUserMembershipReq {
    id: string;
    userId: string;
    membershipType: string;
    expiredAt?: string;
    autoRenew?: number;
    autoRenewDays?: number;
    status: number;
  }

  /** 更新用户会员关系状态请求 */
  export interface UpdateUserMembershipStatusReq {
    id: string;
    status: number;
  }

  /** 删除用户会员关系请求 */
  export interface DeleteUserMembershipReq {
    id: string;
  }
}

interface UserMembershipInfo {
  info: UserMembershipApi.UserMembership;
}

interface CreateUserMembershipReply {
  id: string;
}

/** 查询用户会员关系列表 */
export function getUserMembershipList(params: PageReq) {
  return requestClient.get<PageReply<UserMembershipApi.UserMembership>>(
    '/admin/v1/user_membership/list',
    { params },
  );
}

/** 查询用户会员关系详情 */
export function getUserMembershipInfo(id: string) {
  return requestClient.get<UserMembershipInfo>(
    `/admin/v1/user_membership/info?id=${id}`,
  );
}

/** 根据用户ID查询用户会员关系详情 */
export function getUserMembershipInfoByUserId(userId: string) {
  return requestClient.get<UserMembershipInfo>(
    `/admin/v1/user_membership/info/by_user_id?userId=${userId}`,
  );
}

/** 新增用户会员关系 */
export function createUserMembership(
  data: UserMembershipApi.CreateUserMembershipReq,
) {
  return requestClient.post<CreateUserMembershipReply>(
    '/admin/v1/user_membership/create',
    data,
  );
}

/** 修改用户会员关系 */
export function updateUserMembership(
  data: UserMembershipApi.UpdateUserMembershipReq,
) {
  return requestClient.post('/admin/v1/user_membership/update', data);
}

/** 用户会员关系状态修改 */
export function updateUserMembershipStatus(
  data: UserMembershipApi.UpdateUserMembershipStatusReq,
) {
  return requestClient.post('/admin/v1/user_membership/update/status', data);
}

/** 删除用户会员关系 */
export function deleteUserMembership(
  data: UserMembershipApi.DeleteUserMembershipReq,
) {
  return requestClient.post('/admin/v1/user_membership/delete', data);
}
