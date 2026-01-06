import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace MembershipApi {
  /** 会员类型配置信息 */
  export interface Membership {
    id: string;
    name: string; // 会员类型名称
    type: string; // 会员类型编码(normal,vip,svip)
    description: string; // 会员类型描述
    sort: number; // 排序
    status: number; // 状态(-1禁用,1启用)
    createdAt: string;
    updatedAt: string;
  }

  /** 创建会员类型请求 */
  export interface CreateMembershipReq {
    name: string;
    type: string;
    description?: string;
    sort?: number;
    status: number;
  }

  /** 更新会员类型请求 */
  export interface UpdateMembershipReq {
    id: string;
    name: string;
    type: string;
    description?: string;
    sort?: number;
    status: number;
  }

  /** 更新会员类型状态请求 */
  export interface UpdateMembershipStatusReq {
    id: string;
    status: number;
  }

  /** 删除会员类型请求 */
  export interface DeleteMembershipReq {
    id: string;
  }
}

interface MembershipInfo {
  info: MembershipApi.Membership;
}

interface CreateMembershipReply {
  id: string;
}

/** 查询会员类型列表 */
export function getMembershipList(params: PageReq) {
  return requestClient.get<PageReply<MembershipApi.Membership>>(
    '/admin/v1/membership/list',
    { params },
  );
}

/** 查询会员类型详情 */
export function getMembershipInfo(id: string) {
  return requestClient.get<MembershipInfo>(
    `/admin/v1/membership/info?id=${id}`,
  );
}

/** 新增会员类型 */
export function createMembership(data: MembershipApi.CreateMembershipReq) {
  return requestClient.post<CreateMembershipReply>(
    '/admin/v1/membership/create',
    data,
  );
}

/** 修改会员类型 */
export function updateMembership(data: MembershipApi.UpdateMembershipReq) {
  return requestClient.post('/admin/v1/membership/update', data);
}

/** 会员类型状态修改 */
export function updateMembershipStatus(
  data: MembershipApi.UpdateMembershipStatusReq,
) {
  return requestClient.post('/admin/v1/membership/update/status', data);
}

/** 删除会员类型 */
export function deleteMembership(data: MembershipApi.DeleteMembershipReq) {
  return requestClient.post('/admin/v1/membership/delete', data);
}
