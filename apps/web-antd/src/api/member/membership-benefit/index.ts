import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace MembershipBenefitApi {
  /** 会员权益配置信息 */
  export interface MembershipBenefit {
    id: string;
    membershipType: string; // 会员类型编码(normal,vip,svip)
    benefitKey: string; // 权益标识
    benefitName: string; // 权益名称
    benefitDesc: string; // 权益描述
    benefitValue: string; // 权益值
    benefitNum: string; // 权益次数
    sort: number; // 排序
    status: number; // 状态(-1禁用,1启用)
    createdAt: string;
    updatedAt: string;
  }

  /** 创建会员权益请求 */
  export interface CreateMembershipBenefitReq {
    membershipType: string;
    benefitKey: string;
    benefitName: string;
    benefitDesc?: string;
    benefitValue?: string;
    benefitNum?: string;
    sort?: number;
    status: number;
  }

  /** 更新会员权益请求 */
  export interface UpdateMembershipBenefitReq {
    id: string;
    membershipType: string;
    benefitKey: string;
    benefitName: string;
    benefitDesc?: string;
    benefitValue?: string;
    benefitNum?: string;
    sort?: number;
    status: number;
  }

  /** 更新会员权益状态请求 */
  export interface UpdateMembershipBenefitStatusReq {
    id: string;
    status: number;
  }

  /** 删除会员权益请求 */
  export interface DeleteMembershipBenefitReq {
    id: string;
  }

  /** 权益标识选择器 */
  export interface MembershipBenefitKeySelect {
    key: string; // 权益标识
    name: string; // 权益名称
  }
}

interface MembershipBenefitInfo {
  info: MembershipBenefitApi.MembershipBenefit;
}

interface CreateMembershipBenefitReply {
  id: string;
}

interface GetMembershipBenefitKeySelectReply {
  list: MembershipBenefitApi.MembershipBenefitKeySelect[];
}

/** 查询会员权益列表 */
export function getMembershipBenefitList(
  params: PageReq & { membershipType?: string },
) {
  return requestClient.get<PageReply<MembershipBenefitApi.MembershipBenefit>>(
    '/admin/v1/membership_benefit/list',
    { params },
  );
}

/** 查询会员权益详情 */
export function getMembershipBenefitInfo(id: string) {
  return requestClient.get<MembershipBenefitInfo>(
    `/admin/v1/membership_benefit/info?id=${id}`,
  );
}

/** 获取权益标识选择器 */
export function getMembershipBenefitKeySelect() {
  return requestClient.get<GetMembershipBenefitKeySelectReply>(
    '/admin/v1/membership_benefit/key/select',
  );
}

/** 新增会员权益 */
export function createMembershipBenefit(
  data: MembershipBenefitApi.CreateMembershipBenefitReq,
) {
  return requestClient.post<CreateMembershipBenefitReply>(
    '/admin/v1/membership_benefit/create',
    data,
  );
}

/** 修改会员权益 */
export function updateMembershipBenefit(
  data: MembershipBenefitApi.UpdateMembershipBenefitReq,
) {
  return requestClient.post('/admin/v1/membership_benefit/update', data);
}

/** 会员权益状态修改 */
export function updateMembershipBenefitStatus(
  data: MembershipBenefitApi.UpdateMembershipBenefitStatusReq,
) {
  return requestClient.post('/admin/v1/membership_benefit/update/status', data);
}

/** 删除会员权益 */
export function deleteMembershipBenefit(
  data: MembershipBenefitApi.DeleteMembershipBenefitReq,
) {
  return requestClient.post('/admin/v1/membership_benefit/delete', data);
}
