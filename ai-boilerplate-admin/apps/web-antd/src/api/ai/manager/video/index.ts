import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiVideoRecordApi {
  /** AI 视频表信息 */
  export interface AiVideoRecordInfo {
    id: string; // 编号
    adminId: string; // 用户编号
    prompt: string; // 提示词
    platform: string; // 平台
    modelId: string; // 模型编号
    model: string; // 模型
    status: number; // 状态
    finishTime: string; // 完成时间
    errorMessage: string; // 错误信息
    publicStatus: boolean; // 是否发布
    videoURL: string; // 视频地址
    options: string; // 绘制参数
    taskId: string; // 任务编号
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  /** 请求-AI 视频表-创建一条数据 */
  export interface CreateAiVideoRecordReq {
    adminId: string; // 用户编号
    prompt: string; // 提示词
    platform: string; // 平台
    modelId?: string; // 模型编号
    model: string; // 模型
    status: number; // 状态
    finishTime?: string; // 完成时间
    errorMessage?: string; // 错误信息
    publicStatus: boolean; // 是否发布
    videoURL?: string; // 视频地址
    options?: string; // 绘制参数
    taskId?: string; // 任务编号
  }

  /** 响应-AI 视频表-创建一条数据 */
  export interface CreateAiVideoRecordReply {
    id: string; // 编号
  }

  /** 请求-AI 视频表-更新一条数据 */
  export interface UpdateAiVideoRecordReq {
    id: string; // 编号
    adminId: string; // 用户编号
    prompt: string; // 提示词
    platform: string; // 平台
    modelId?: string; // 模型编号
    model: string; // 模型
    status: number; // 状态
    finishTime?: string; // 完成时间
    errorMessage?: string; // 错误信息
    publicStatus: boolean; // 是否发布
    videoURL?: string; // 视频地址
    options?: string; // 绘制参数
    taskId?: string; // 任务编号
  }

  /** 响应-AI 视频表-更新一条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiVideoRecordReply {}

  /** 请求-AI 视频表-更新状态 */
  export interface UpdateAiVideoRecordStatusReq {
    id: string; // 编号
    status: number; // 状态
  }

  /** 响应-AI 视频表-更新状态 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiVideoRecordStatusReply {}

  /** 请求-AI 视频表-删除多条数据 */
  export interface DeleteAiVideoRecordReq {
    id: string; // 编号
  }

  /** 响应-AI 视频表-删除多条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DeleteAiVideoRecordReply {}

  /** 响应-AI 视频表-单条数据查询 */
  export interface GetAiVideoRecordInfoReply {
    info: AiVideoRecordInfo;
  }

  /** 响应-AI 视频表-列表数据查询 */
  export interface GetAiVideoRecordListReply {
    total: number; // 总数
    list: AiVideoRecordInfo[]; // 列表数据
  }

  /** 请求-AI 视频表-列表数据查询 */
  export interface GetAiVideoRecordListReq {
    page: number; // 页码
    pageSize: number; // 页数
  }
}

/**
 * AI 视频表-创建一条数据
 */
export async function createAiVideoRecord(
  data: AiVideoRecordApi.CreateAiVideoRecordReq,
) {
  return requestClient.post<AiVideoRecordApi.CreateAiVideoRecordReply>(
    '/admin/v1/ai_video_record/create',
    data,
  );
}

/**
 * AI 视频表-更新一条数据
 */
export async function updateAiVideoRecord(
  data: AiVideoRecordApi.UpdateAiVideoRecordReq,
) {
  return requestClient.post<AiVideoRecordApi.UpdateAiVideoRecordReply>(
    '/admin/v1/ai_video_record/update',
    data,
  );
}

/**
 * AI 视频表-更新状态
 */
export async function updateAiVideoRecordStatus(
  data: AiVideoRecordApi.UpdateAiVideoRecordStatusReq,
) {
  return requestClient.post<AiVideoRecordApi.UpdateAiVideoRecordStatusReply>(
    '/admin/v1/ai_video_record/update/status',
    data,
  );
}

/**
 * AI 视频表-删除多条数据
 */
export async function deleteAiVideoRecord(id: string) {
  return requestClient.post<AiVideoRecordApi.DeleteAiVideoRecordReply>(
    '/admin/v1/ai_video_record/delete',
    { id },
  );
}

/**
 * AI 视频表-单条数据查询
 */
export async function getAiVideoRecordInfo(id: string) {
  return requestClient.get<AiVideoRecordApi.GetAiVideoRecordInfoReply>(
    '/admin/v1/ai_video_record/info',
    { params: { id } },
  );
}

/**
 * AI 视频表-列表数据查询
 */
export async function getAiVideoRecordList(
  params: AiVideoRecordApi.GetAiVideoRecordListReq,
) {
  return requestClient.get<PageReply<AiVideoRecordApi.AiVideoRecordInfo>>(
    '/admin/v1/ai_video_record/list',
    { params },
  );
}
