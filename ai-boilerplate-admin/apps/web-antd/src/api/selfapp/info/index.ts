import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SelfAppApi {
  /** 自应用信息 */
  export interface SelfAppInfo {
    /** ID */
    id: string;
    /** 包名 */
    packageName: string;
    /** 应用名称 */
    name: string;
    /** 应用描述 */
    description?: string;
    /** 状态(-1禁用 1启用) */
    status: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  }

  /** 创建自应用请求参数 */
  export interface CreateSelfAppReq {
    /** 包名 */
    packageName: string;
    /** 应用名称 */
    name: string;
    /** 应用描述 */
    description?: string;
    /** 状态(-1禁用 1启用) */
    status: number;
  }

  /** 更新自应用请求参数 */
  export interface UpdateSelfAppReq {
    /** ID */
    id: string;
    /** 包名 */
    packageName: string;
    /** 应用名称 */
    name: string;
    /** 应用描述 */
    description?: string;
    /** 状态(-1禁用 1启用) */
    status: number;
  }

  /** 更新自应用状态请求参数 */
  export interface UpdateSelfAppStatusReq {
    /** ID */
    id: string;
    /** 状态(-1禁用 1启用) */
    status: number;
  }

  /** 删除自应用请求参数 */
  export interface DeleteSelfAppReq {
    /** ID */
    id: string;
  }

  /** 获取自应用信息响应 */
  export interface GetSelfAppInfoReply {
    info: SelfAppInfo;
  }

  /** 创建自应用响应 */
  export interface CreateSelfAppReply {
    id: string;
  }
}

/** 自应用列表查询参数 */
export interface GetSelfAppListReq extends PageReq {
  /** 包名 */
  packageName?: string;
  /** 应用名称 */
  name?: string;
  /** 状态 */
  status?: number;
}

/** 查询自应用列表 */
export function getSelfAppList(params: GetSelfAppListReq) {
  return requestClient.get<PageReply<SelfAppApi.SelfAppInfo>>(
    '/admin/v1/self_app/list',
    {
      params,
    },
  );
}

/** 查询自应用详情 */
export function getSelfAppInfo(id: string) {
  return requestClient.get<SelfAppApi.GetSelfAppInfoReply>(
    `/admin/v1/self_app/info?id=${id}`,
  );
}

/** 新增自应用 */
export function createSelfApp(data: SelfAppApi.CreateSelfAppReq) {
  return requestClient.post<SelfAppApi.CreateSelfAppReply>(
    '/admin/v1/self_app/create',
    data,
  );
}

/** 修改自应用 */
export function updateSelfApp(data: SelfAppApi.UpdateSelfAppReq) {
  return requestClient.post('/admin/v1/self_app/update', data);
}

/** 自应用状态修改 */
export function updateSelfAppStatus(data: SelfAppApi.UpdateSelfAppStatusReq) {
  return requestClient.post('/admin/v1/self_app/update/status', data);
}

/** 删除自应用 */
export function deleteSelfApp(data: SelfAppApi.DeleteSelfAppReq) {
  return requestClient.post('/admin/v1/self_app/delete', data);
}
