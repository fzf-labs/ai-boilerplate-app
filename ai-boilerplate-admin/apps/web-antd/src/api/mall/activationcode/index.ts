import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ActivationCodeApi {
  /** 用户权益变化项 */
  export interface UserMembershipChangeItem {
    /** 会员类型编码(normal,vip,svip) */
    membershipType: string;
    /** 到期时间(普通会员为NULL,表示永不过期) */
    expiredAt?: string;
    /** 状态(-1禁用,1正常) */
    status: number;
  }

  /** 用户权益变化 */
  export interface UserMembershipChange {
    /** 变更前 */
    before?: UserMembershipChangeItem;
    /** 变更后 */
    after?: UserMembershipChangeItem;
  }

  /** 用户属性变化 */
  export interface UserChange {
    /** 用户权益变化 */
    userMembershipChange?: UserMembershipChange;
  }

  /** 激活码管理表信息 */
  export interface ActivationCodeInfo {
    /** id */
    id: string;
    /** 商品类型(membership:会员,service:服务) */
    productType: string;
    /** 商品ID */
    productId: string;
    /** 批次号 */
    batchNo: string;
    /** 激活码 */
    code: string;
    /** 激活码有效期开始时间 */
    validSt: string;
    /** 激活码有效期截止时间 */
    validEd: string;
    /** 激活时间 */
    activatedAt?: string;
    /** 用户ID */
    userId?: string;
    /** 用户权益变化 */
    userChange?: UserChange;
    /** 平台 */
    platform?: string;
    /** 平台售出时间 */
    platformSoldAt?: string;
    /** 平台订单号 */
    platformOrderNo?: string;
    /** 平台买家ID */
    platformBuyerId?: string;
    /** 平台买家昵称 */
    platformBuyerName?: string;
    /** 备注 */
    remark?: string;
    /** 状态(-2已退款,-1禁用,0库存,1已售出,2已激活,3已过期) */
    status: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
    /** 商品名称 */
    productName?: string;
    /** 用户昵称 */
    userNickname?: string;
  }

  /** 获取激活码信息响应 */
  export interface GetActivationCodeInfoReply {
    info: ActivationCodeInfo;
  }

  /** 批量生成激活码响应 */
  export interface BatchGenerateActivationCodeReply {
    /** 批次号 */
    batchNo: string;
  }
}

/** 激活码列表查询参数 */
export interface GetActivationCodeListReq extends PageReq {
  /** 商品类型(membership:会员,service:服务) */
  productType?: string;
  /** 商品ID */
  productId?: string;
  /** 批次号 */
  batchNo?: string;
  /** 激活码 */
  code?: string;
  /** 用户ID */
  userId?: string;
  /** 平台 */
  platform?: string;
  /** 平台订单号 */
  platformOrderNo?: string;
  /** 状态(-2已退款,-1禁用,0库存,1已售出,2已激活,3已过期) */
  status?: number;
  /** 激活时间范围 */
  activatedAt?: string[];
  /** 创建时间范围 */
  createdAt?: string[];
}

/** 批量生成激活码请求参数 */
export interface BatchGenerateActivationCodeReq {
  /** 商品类型(membership:会员,service:服务) */
  productType: string;
  /** 商品ID */
  productId: string;
  /** 激活码有效期开始时间 */
  validSt: string;
  /** 激活码有效期截止时间 */
  validEd: string;
  /** 平台 */
  platform?: string;
  /** 备注 */
  remark?: string;
  /** 生成数量 */
  num: number;
}

/** 更新激活码请求参数 */
export interface UpdateActivationCodeReq {
  /** id */
  id: string;
  /** 平台 */
  platform?: string;
  /** 平台售出时间 */
  platformSoldAt?: string;
  /** 平台订单号 */
  platformOrderNo?: string;
  /** 平台买家ID */
  platformBuyerId?: string;
  /** 平台买家昵称 */
  platformBuyerName?: string;
  /** 备注 */
  remark?: string;
}

/** 更新激活码状态请求参数 */
export interface UpdateActivationCodeStatusReq {
  /** id */
  id: string;
  /** 状态(-2已退款,-1禁用,0库存,1已售出,2已激活,3已过期) */
  status: number;
}

/** 删除激活码请求参数 */
export interface DeleteActivationCodeReq {
  /** id */
  id: string;
}

/** 查询激活码列表 */
export function getActivationCodeList(params: GetActivationCodeListReq) {
  return requestClient.get<PageReply<ActivationCodeApi.ActivationCodeInfo>>(
    '/admin/v1/mall_activation_code/list',
    {
      params,
    },
  );
}

/** 查询激活码详情 */
export function getActivationCodeInfo(id: string) {
  return requestClient.get<ActivationCodeApi.GetActivationCodeInfoReply>(
    '/admin/v1/mall_activation_code/info',
    {
      params: { id },
    },
  );
}

/** 批量生成激活码 */
export function batchGenerateActivationCode(
  data: BatchGenerateActivationCodeReq,
) {
  return requestClient.post<ActivationCodeApi.BatchGenerateActivationCodeReply>(
    '/admin/v1/mall_activation_code/batch_generate',
    data,
  );
}

/** 更新激活码 */
export function updateActivationCode(data: UpdateActivationCodeReq) {
  return requestClient.post('/admin/v1/mall_activation_code/update', data);
}

/** 更新激活码状态 */
export function updateActivationCodeStatus(
  data: UpdateActivationCodeStatusReq,
) {
  return requestClient.post(
    '/admin/v1/mall_activation_code/update/status',
    data,
  );
}

/** 删除激活码 */
export function deleteActivationCode(data: DeleteActivationCodeReq) {
  return requestClient.post('/admin/v1/mall_activation_code/delete', data);
}
