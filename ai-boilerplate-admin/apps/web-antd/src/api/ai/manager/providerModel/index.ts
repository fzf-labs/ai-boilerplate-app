import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiProviderModelApi {
  // AI 配置模型表信息
  export interface AiProviderModelInfo {
    id: string; // 编号
    platformId: string; // 平台编号
    modelType: string; // 模型类型
    modelId: string; // 模型ID
    modelName: string; // 模型名字
    config?: string; // 配置
    sort: number; // 排序
    status: number; // 状态
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  // 创建 AI 配置模型请求
  export interface CreateAiProviderModelReq {
    platformId: string; // 平台编号
    modelType: string; // 模型类型
    modelId: string; // 模型ID
    modelName: string; // 模型名字
    config?: string; // 配置
    sort: number; // 排序
    status: number; // 状态
  }

  // 创建 AI 配置模型响应
  export interface CreateAiProviderModelReply {
    id: string; // 编号
  }

  // 更新 AI 配置模型请求
  export interface UpdateAiProviderModelReq {
    id: string; // 编号
    platformId: string; // 平台编号
    modelType: string; // 模型类型
    modelId: string; // 模型ID
    modelName: string; // 模型名字
    config?: string; // 配置
    sort: number; // 排序
    status: number; // 状态
  }

  // 删除 AI 配置模型请求
  export interface DeleteAiProviderModelReq {
    id: string; // 编号
  }

  // 更新 AI 配置模型状态请求
  export interface UpdateAiProviderModelStatusReq {
    id: string; // 编号
    status: number; // 状态
  }

  // 获取 AI 配置模型信息响应
  export interface GetAiProviderModelInfoReply {
    info: AiProviderModelInfo;
  }

  // 获取 AI 配置模型列表响应
  export interface GetAiProviderModelListReply {
    total: number; // 总数
    list: AiProviderModelInfo[]; // 列表数据
  }

  // 获取 AI 配置模型列表请求
  export interface GetAiProviderModelListReq extends PageReq {
    platformId?: string; // 平台编号
    modelType?: string; // 模型类型
    status?: number; // 状态
  }
}

// 创建 AI 配置模型
export function createAiProviderModel(
  data: AiProviderModelApi.CreateAiProviderModelReq,
) {
  return requestClient.post<AiProviderModelApi.CreateAiProviderModelReply>(
    '/admin/v1/ai_provider_model/create',
    data,
  );
}

// 删除 AI 配置模型
export function deleteAiProviderModel(
  data: AiProviderModelApi.DeleteAiProviderModelReq,
) {
  return requestClient.post('/admin/v1/ai_provider_model/delete', data);
}

// 获取 AI 配置模型信息
export function getAiProviderModelInfo(id: string) {
  return requestClient.get<AiProviderModelApi.GetAiProviderModelInfoReply>(
    '/admin/v1/ai_provider_model/info',
    { params: { id } },
  );
}

// 获取 AI 配置模型列表
export function getAiProviderModelList(
  params: AiProviderModelApi.GetAiProviderModelListReq,
) {
  return requestClient.get<PageReply<AiProviderModelApi.AiProviderModelInfo>>(
    '/admin/v1/ai_provider_model/list',
    { params },
  );
}

// 更新 AI 配置模型
export function updateAiProviderModel(
  data: AiProviderModelApi.UpdateAiProviderModelReq,
) {
  return requestClient.post('/admin/v1/ai_provider_model/update', data);
}

// 更新 AI 配置模型状态
export function updateAiProviderModelStatus(
  data: AiProviderModelApi.UpdateAiProviderModelStatusReq,
) {
  return requestClient.post('/admin/v1/ai_provider_model/update/status', data);
}
