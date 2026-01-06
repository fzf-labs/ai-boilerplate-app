import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiImageRecordApi {
  /** AI 绘画表信息 */
  export interface AiImageRecordInfo {
    id: string; // 编号
    adminId: string; // 用户编号
    prompt: string; // 提示词
    platform: string; // 平台
    modelId: string; // 模型编号
    model: string; // 模型
    width: number; // 图片宽度
    height: number; // 图片高度
    status: number; // 绘画状态
    finishTime: string; // 完成时间
    errorMessage: string; // 错误信息
    publicStatus: boolean; // 是否发布
    picURL: string; // 图片地址
    options: string; // 绘制参数
    taskId: string; // 任务编号
    buttons: string; // mj buttons 按钮
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  /** 请求-AI 绘画表-创建一条数据 */
  export interface CreateAiImageRecordReq {
    adminId: string; // 用户编号
    prompt: string; // 提示词
    platform: string; // 平台
    modelId?: string; // 模型编号
    model: string; // 模型
    width: number; // 图片宽度
    height: number; // 图片高度
    status: number; // 绘画状态
    finishTime?: string; // 完成时间
    errorMessage?: string; // 错误信息
    publicStatus: boolean; // 是否发布
    picURL?: string; // 图片地址
    options?: string; // 绘制参数
    taskId?: string; // 任务编号
    buttons?: string; // mj buttons 按钮
  }

  /** 响应-AI 绘画表-创建一条数据 */
  export interface CreateAiImageRecordReply {
    id: string; // 编号
  }

  /** 请求-AI 绘画表-更新一条数据 */
  export interface UpdateAiImageRecordReq {
    id: string; // 编号
    adminId: string; // 用户编号
    prompt: string; // 提示词
    platform: string; // 平台
    modelId?: string; // 模型编号
    model: string; // 模型
    width: number; // 图片宽度
    height: number; // 图片高度
    status: number; // 绘画状态
    finishTime?: string; // 完成时间
    errorMessage?: string; // 错误信息
    publicStatus: boolean; // 是否发布
    picURL?: string; // 图片地址
    options?: string; // 绘制参数
    taskId?: string; // 任务编号
    buttons?: string; // mj buttons 按钮
  }

  /** 响应-AI 绘画表-更新一条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiImageRecordReply {}

  /** 请求-AI 绘画表-更新状态 */
  export interface UpdateAiImageRecordStatusReq {
    id: string; // 编号
    status: number; // 绘画状态
  }

  /** 响应-AI 绘画表-更新状态 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiImageRecordStatusReply {}

  /** 请求-AI 绘画表-删除多条数据 */
  export interface DeleteAiImageRecordReq {
    id: string; // 编号
  }

  /** 响应-AI 绘画表-删除多条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DeleteAiImageRecordReply {}

  /** 响应-AI 绘画表-单条数据查询 */
  export interface GetAiImageRecordInfoReply {
    info: AiImageRecordInfo;
  }

  /** 响应-AI 绘画表-列表数据查询 */
  export interface GetAiImageRecordListReply {
    total: number; // 总数
    list: AiImageRecordInfo[]; // 列表数据
  }

  /** 请求-AI 绘画表-列表数据查询 */
  export interface GetAiImageRecordListReq {
    page: number; // 页码
    pageSize: number; // 页数
  }
}

/**
 * AI 绘画表-创建一条数据
 */
export async function createAiImageRecord(
  data: AiImageRecordApi.CreateAiImageRecordReq,
) {
  return requestClient.post<AiImageRecordApi.CreateAiImageRecordReply>(
    '/admin/v1/ai_image_record/create',
    data,
  );
}

/**
 * AI 绘画表-更新一条数据
 */
export async function updateAiImageRecord(
  data: AiImageRecordApi.UpdateAiImageRecordReq,
) {
  return requestClient.post<AiImageRecordApi.UpdateAiImageRecordReply>(
    '/admin/v1/ai_image_record/update',
    data,
  );
}

/**
 * AI 绘画表-更新状态
 */
export async function updateAiImageRecordStatus(
  data: AiImageRecordApi.UpdateAiImageRecordStatusReq,
) {
  return requestClient.post<AiImageRecordApi.UpdateAiImageRecordStatusReply>(
    '/admin/v1/ai_image_record/update/status',
    data,
  );
}

/**
 * AI 绘画表-删除多条数据
 */
export async function deleteAiImageRecord(id: string) {
  return requestClient.post<AiImageRecordApi.DeleteAiImageRecordReply>(
    '/admin/v1/ai_image_record/delete',
    { id },
  );
}

/**
 * AI 绘画表-单条数据查询
 */
export async function getAiImageRecordInfo(id: string) {
  return requestClient.get<AiImageRecordApi.GetAiImageRecordInfoReply>(
    '/admin/v1/ai_image_record/info',
    { params: { id } },
  );
}

/**
 * AI 绘画表-列表数据查询
 */
export async function getAiImageRecordList(
  params: AiImageRecordApi.GetAiImageRecordListReq,
) {
  return requestClient.get<PageReply<AiImageRecordApi.AiImageRecordInfo>>(
    '/admin/v1/ai_image_record/list',
    { params },
  );
}
