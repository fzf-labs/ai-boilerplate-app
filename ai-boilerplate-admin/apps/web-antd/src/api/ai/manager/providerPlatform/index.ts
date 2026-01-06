import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiProviderPlatformApi {
  // AI 配置平台表-平台选择器-选项
  export interface AiProviderPlatformSelectorItem {
    label: string; // 标签
    value: string; // 值
  }

  // AI 配置平台表信息
  export interface AiProviderPlatformInfo {
    id: string; // 编号
    tenantId: string; // 租户编号
    platform: string; // 平台
    name: string; // 名称
    APIURL?: string; // API 地址
    APIKey?: string; // API KEY
    docURL?: string; // 文档地址
    sort: number; // 排序
    status: number; // 状态
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  // 创建 AI 配置平台请求
  export interface CreateAiProviderPlatformReq {
    tenantId: string; // 租户编号
    platform: string; // 平台
    name: string; // 名称
    APIURL?: string; // API 地址
    APIKey?: string; // API KEY
    docURL?: string; // 文档地址
    sort?: number; // 排序
    status: number; // 状态
  }

  // 创建 AI 配置平台响应
  export interface CreateAiProviderPlatformReply {
    id: string; // 编号
  }

  // 更新 AI 配置平台请求
  export interface UpdateAiProviderPlatformReq {
    id: string; // 编号
    tenantId: string; // 租户编号
    platform: string; // 平台
    name: string; // 名称
    APIURL?: string; // API 地址
    APIKey?: string; // API KEY
    docURL?: string; // 文档地址
    sort?: number; // 排序
    status: number; // 状态
  }

  // 删除 AI 配置平台请求
  export interface DeleteAiProviderPlatformReq {
    id: string; // 编号
  }

  // 更新 AI 配置平台状态请求
  export interface UpdateAiProviderPlatformStatusReq {
    id: string; // 编号
    status: number; // 状态
  }

  // 获取 AI 配置平台信息响应
  export interface GetAiProviderPlatformInfoReply {
    info: AiProviderPlatformInfo;
  }

  // 获取 AI 配置平台列表响应
  export interface GetAiProviderPlatformListReply {
    total: number; // 总数
    list: AiProviderPlatformInfo[]; // 列表数据
  }

  // 获取 AI 配置平台列表请求
  export interface GetAiProviderPlatformListReq extends PageReq {
    platform?: string; // 平台
    status?: number; // 状态
  }

  // 获取 AI 配置平台选择器响应
  export interface GetAiProviderPlatformSelectorReply {
    list: AiProviderPlatformSelectorItem[]; // 列表数据
  }
}

// 创建 AI 配置平台
export function createAiProviderPlatform(
  data: AiProviderPlatformApi.CreateAiProviderPlatformReq,
) {
  return requestClient.post<AiProviderPlatformApi.CreateAiProviderPlatformReply>(
    '/admin/v1/ai_provider_platform/create',
    data,
  );
}

// 删除 AI 配置平台
export function deleteAiProviderPlatform(
  data: AiProviderPlatformApi.DeleteAiProviderPlatformReq,
) {
  return requestClient.post('/admin/v1/ai_provider_platform/delete', data);
}

// 获取 AI 配置平台信息
export function getAiProviderPlatformInfo(id: string) {
  return requestClient.get<AiProviderPlatformApi.GetAiProviderPlatformInfoReply>(
    '/admin/v1/ai_provider_platform/info',
    { params: { id } },
  );
}

// 获取 AI 配置平台列表
export function getAiProviderPlatformList(
  params: AiProviderPlatformApi.GetAiProviderPlatformListReq,
) {
  return requestClient.get<
    PageReply<AiProviderPlatformApi.AiProviderPlatformInfo>
  >('/admin/v1/ai_provider_platform/list', { params });
}

// 更新 AI 配置平台
export function updateAiProviderPlatform(
  data: AiProviderPlatformApi.UpdateAiProviderPlatformReq,
) {
  return requestClient.post('/admin/v1/ai_provider_platform/update', data);
}

// 更新 AI 配置平台状态
export function updateAiProviderPlatformStatus(
  data: AiProviderPlatformApi.UpdateAiProviderPlatformStatusReq,
) {
  return requestClient.post(
    '/admin/v1/ai_provider_platform/update/status',
    data,
  );
}

// 获取 AI 配置平台选择器
export function getAiProviderPlatformSelector() {
  return requestClient.get<AiProviderPlatformApi.GetAiProviderPlatformSelectorReply>(
    '/admin/v1/ai_provider_platform/selector',
  );
}
