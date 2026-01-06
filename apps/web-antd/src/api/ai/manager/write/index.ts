import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiWriteRecordApi {
  /** AI 写作表信息 */
  export interface AiWriteRecordInfo {
    id: string; // 编号
    adminId: string; // 用户编号
    type: number; // 写作类型
    platform: string; // 平台
    modelId: string; // 模型编号
    model: string; // 模型
    prompt: string; // 生成内容提示
    generatedContent: string; // 生成的内容
    originalContent: string; // 原文
    length: number; // 长度提示词
    format: number; // 格式提示词
    tone: number; // 语气提示词
    language: number; // 语言提示词
    errorMessage: string; // 错误信息
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  /** 请求-AI 写作表-创建一条数据 */
  export interface CreateAiWriteRecordReq {
    adminId: string; // 用户编号
    type?: number; // 写作类型
    platform: string; // 平台
    modelId: string; // 模型编号
    model: string; // 模型
    prompt: string; // 生成内容提示
    generatedContent?: string; // 生成的内容
    originalContent?: string; // 原文
    length?: number; // 长度提示词
    format?: number; // 格式提示词
    tone?: number; // 语气提示词
    language?: number; // 语言提示词
    errorMessage?: string; // 错误信息
  }

  /** 响应-AI 写作表-创建一条数据 */
  export interface CreateAiWriteRecordReply {
    id: string; // 编号
  }

  /** 请求-AI 写作表-更新一条数据 */
  export interface UpdateAiWriteRecordReq {
    id: string; // 编号
    adminId: string; // 用户编号
    type?: number; // 写作类型
    platform: string; // 平台
    modelId: string; // 模型编号
    model: string; // 模型
    prompt: string; // 生成内容提示
    generatedContent?: string; // 生成的内容
    originalContent?: string; // 原文
    length?: number; // 长度提示词
    format?: number; // 格式提示词
    tone?: number; // 语气提示词
    language?: number; // 语言提示词
    errorMessage?: string; // 错误信息
  }

  /** 响应-AI 写作表-更新一条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiWriteRecordReply {}

  /** 请求-AI 写作表-删除多条数据 */
  export interface DeleteAiWriteRecordReq {
    id: string; // 编号
  }

  /** 响应-AI 写作表-删除多条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DeleteAiWriteRecordReply {}

  /** 响应-AI 写作表-单条数据查询 */
  export interface GetAiWriteRecordInfoReply {
    info: AiWriteRecordInfo;
  }

  /** 响应-AI 写作表-列表数据查询 */
  export interface GetAiWriteRecordListReply {
    total: number; // 总数
    list: AiWriteRecordInfo[]; // 列表数据
  }

  /** 请求-AI 写作表-列表数据查询 */
  export interface GetAiWriteRecordListReq {
    page: number; // 页码
    pageSize: number; // 页数
  }
}

/**
 * AI 写作表-创建一条数据
 */
export async function createAiWriteRecord(
  data: AiWriteRecordApi.CreateAiWriteRecordReq,
) {
  return requestClient.post<AiWriteRecordApi.CreateAiWriteRecordReply>(
    '/admin/v1/ai_write_record/create',
    data,
  );
}

/**
 * AI 写作表-更新一条数据
 */
export async function updateAiWriteRecord(
  data: AiWriteRecordApi.UpdateAiWriteRecordReq,
) {
  return requestClient.post<AiWriteRecordApi.UpdateAiWriteRecordReply>(
    '/admin/v1/ai_write_record/update',
    data,
  );
}

/**
 * AI 写作表-删除多条数据
 */
export async function deleteAiWriteRecord(id: string) {
  return requestClient.post<AiWriteRecordApi.DeleteAiWriteRecordReply>(
    '/admin/v1/ai_write_record/delete',
    { id },
  );
}

/**
 * AI 写作表-单条数据查询
 */
export async function getAiWriteRecordInfo(id: string) {
  return requestClient.get<AiWriteRecordApi.GetAiWriteRecordInfoReply>(
    '/admin/v1/ai_write_record/info',
    { params: { id } },
  );
}

/**
 * AI 写作表-列表数据查询
 */
export async function getAiWriteRecordList(
  params: AiWriteRecordApi.GetAiWriteRecordListReq,
) {
  return requestClient.get<PageReply<AiWriteRecordApi.AiWriteRecordInfo>>(
    '/admin/v1/ai_write_record/list',
    { params },
  );
}
