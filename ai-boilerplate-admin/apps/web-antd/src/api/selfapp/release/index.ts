import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SelfAppReleaseApi {
  /** 自应用版本发布信息 */
  export interface SelfAppReleaseInfo {
    /** ID */
    id: string;
    /** 发布渠道 */
    channel: string;
    /** 包名 */
    packageName: string;
    /** build值 */
    buildNum: number;
    /** 版本号 */
    version?: string;
    /** 更新类型(1强制 2提示 3静默) */
    updateType: number;
    /** 更新标题 */
    title: string;
    /** 更新日志 */
    changelog?: string;
    /** 安装包地址 */
    packageURL: string;
    /** 安装包大小 */
    packageSize?: number;
    /** 安装包MD5 */
    packageMd5?: string;
    /** 最低系统版本 */
    minOsVersion?: string;
    /** 发布时间 */
    publishTime?: string;
    /** 灰度策略(1全量 2自定义设备) */
    grayStrategy: number;
    /** 灰度设备 */
    graySns?: string[];
    /** 状态(-1禁用 1启用) */
    status: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  }

  /** 创建自应用版本发布请求参数 */
  export interface CreateSelfAppReleaseReq {
    /** 发布渠道 */
    channel: string;
    /** 包名 */
    packageName: string;
    /** build值 */
    buildNum: number;
    /** 版本号 */
    version?: string;
    /** 更新类型(1强制 2提示 3静默) */
    updateType: number;
    /** 更新标题 */
    title: string;
    /** 更新日志 */
    changelog?: string;
    /** 安装包地址 */
    packageURL: string;
    /** 安装包大小 */
    packageSize?: number;
    /** 安装包MD5 */
    packageMd5?: string;
    /** 最低系统版本 */
    minOsVersion?: string;
    /** 灰度策略(1全量 2自定义设备) */
    grayStrategy: number;
    /** 灰度设备 */
    graySns?: string[];
    /** 发布时间 */
    publishTime?: string;
    /** 状态(-1禁用 1启用) */
    status: number;
  }

  /** 更新自应用版本发布请求参数 */
  export interface UpdateSelfAppReleaseReq {
    /** ID */
    id: string;
    /** 发布渠道 */
    channel: string;
    /** 包名 */
    packageName: string;
    /** build值 */
    buildNum: number;
    /** 版本号 */
    version?: string;
    /** 更新类型(1强制 2提示 3静默) */
    updateType: number;
    /** 更新标题 */
    title: string;
    /** 更新日志 */
    changelog?: string;
    /** 安装包地址 */
    packageURL: string;
    /** 安装包大小 */
    packageSize?: number;
    /** 安装包MD5 */
    packageMd5?: string;
    /** 最低系统版本 */
    minOsVersion?: string;
    /** 发布时间 */
    publishTime?: string;
    /** 灰度策略(1全量 2自定义设备) */
    grayStrategy: number;
    /** 灰度设备 */
    graySns?: string[];
    /** 状态(-1禁用 1启用) */
    status: number;
  }

  /** 更新自应用版本发布状态请求参数 */
  export interface UpdateSelfAppReleaseStatusReq {
    /** ID */
    id: string;
    /** 状态(-1禁用 1启用) */
    status: number;
  }

  /** 删除自应用版本发布请求参数 */
  export interface DeleteSelfAppReleaseReq {
    /** ID */
    id: string;
  }

  /** 获取自应用版本发布信息响应 */
  export interface GetSelfAppReleaseInfoReply {
    info: SelfAppReleaseInfo;
  }

  /** 创建自应用版本发布响应 */
  export interface CreateSelfAppReleaseReply {
    id: string;
  }
}

/** 自应用版本发布列表查询参数 */
export interface GetSelfAppReleaseListReq extends PageReq {
  /** 包名 */
  packageName?: string;
  /** 发布渠道 */
  channel?: string;
  /** build值 */
  buildNum?: string;
}

/** 查询自应用版本发布列表 */
export function getSelfAppReleaseList(params: GetSelfAppReleaseListReq) {
  return requestClient.get<PageReply<SelfAppReleaseApi.SelfAppReleaseInfo>>(
    '/admin/v1/self_app_release/list',
    {
      params,
    },
  );
}

/** 查询自应用版本发布详情 */
export function getSelfAppReleaseInfo(id: string) {
  return requestClient.get<SelfAppReleaseApi.GetSelfAppReleaseInfoReply>(
    '/admin/v1/self_app_release/info',
    {
      params: { id },
    },
  );
}

/** 新增自应用版本发布 */
export function createSelfAppRelease(
  data: SelfAppReleaseApi.CreateSelfAppReleaseReq,
) {
  return requestClient.post<SelfAppReleaseApi.CreateSelfAppReleaseReply>(
    '/admin/v1/self_app_release/create',
    data,
  );
}

/** 修改自应用版本发布 */
export function updateSelfAppRelease(
  data: SelfAppReleaseApi.UpdateSelfAppReleaseReq,
) {
  return requestClient.post('/admin/v1/self_app_release/update', data);
}

/** 自应用版本发布状态修改 */
export function updateSelfAppReleaseStatus(
  data: SelfAppReleaseApi.UpdateSelfAppReleaseStatusReq,
) {
  return requestClient.post('/admin/v1/self_app_release/update/status', data);
}

/** 删除自应用版本发布 */
export function deleteSelfAppRelease(
  data: SelfAppReleaseApi.DeleteSelfAppReleaseReq,
) {
  return requestClient.post('/admin/v1/self_app_release/delete', data);
}
