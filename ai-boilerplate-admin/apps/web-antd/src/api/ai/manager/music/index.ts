import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiMusicRecordApi {
  /** AI 音乐表信息 */
  export interface AiMusicRecordInfo {
    id: string; // 编号
    adminId: string; // 用户编号
    title: string; // 音乐名称
    lyric: string; // 歌词
    imageURL: string; // 图片地址
    audioURL: string; // 音频地址
    videoURL: string; // 视频地址
    status: number; // 音乐状态
    description: string; // 描述词
    prompt: string; // 提示词
    platform: string; // 模型平台
    modelId: string; // 模型编号
    model: string; // 模型
    generateMode: number; // 生成模式
    tags: string; // 音乐风格标签
    duration: number; // 音乐时长
    publicStatus: boolean; // 是否发布
    taskId: string; // 任务编号
    errorMessage: string; // 错误信息
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  /** 请求-AI 音乐表-创建一条数据 */
  export interface CreateAiMusicRecordReq {
    adminId: string; // 用户编号
    title: string; // 音乐名称
    lyric?: string; // 歌词
    imageURL?: string; // 图片地址
    audioURL?: string; // 音频地址
    videoURL?: string; // 视频地址
    status: number; // 音乐状态
    description?: string; // 描述词
    prompt?: string; // 提示词
    platform: string; // 模型平台
    modelId: string; // 模型编号
    model: string; // 模型
    generateMode: number; // 生成模式
    tags?: string; // 音乐风格标签
    duration?: number; // 音乐时长
    publicStatus: boolean; // 是否发布
    taskId?: string; // 任务编号
    errorMessage?: string; // 错误信息
  }

  /** 响应-AI 音乐表-创建一条数据 */
  export interface CreateAiMusicRecordReply {
    id: string; // 编号
  }

  /** 请求-AI 音乐表-更新一条数据 */
  export interface UpdateAiMusicRecordReq {
    id: string; // 编号
    adminId: string; // 用户编号
    title: string; // 音乐名称
    lyric?: string; // 歌词
    imageURL?: string; // 图片地址
    audioURL?: string; // 音频地址
    videoURL?: string; // 视频地址
    status: number; // 音乐状态
    description?: string; // 描述词
    prompt?: string; // 提示词
    platform: string; // 模型平台
    modelId: string; // 模型编号
    model: string; // 模型
    generateMode: number; // 生成模式
    tags?: string; // 音乐风格标签
    duration?: number; // 音乐时长
    publicStatus: boolean; // 是否发布
    taskId?: string; // 任务编号
    errorMessage?: string; // 错误信息
  }

  /** 响应-AI 音乐表-更新一条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiMusicRecordReply {}

  /** 请求-AI 音乐表-更新状态 */
  export interface UpdateAiMusicRecordStatusReq {
    id: string; // 编号
    status: number; // 音乐状态
  }

  /** 响应-AI 音乐表-更新状态 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiMusicRecordStatusReply {}

  /** 请求-AI 音乐表-删除多条数据 */
  export interface DeleteAiMusicRecordReq {
    id: string; // 编号
  }

  /** 响应-AI 音乐表-删除多条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DeleteAiMusicRecordReply {}

  /** 响应-AI 音乐表-单条数据查询 */
  export interface GetAiMusicRecordInfoReply {
    info: AiMusicRecordInfo;
  }

  /** 响应-AI 音乐表-列表数据查询 */
  export interface GetAiMusicRecordListReply {
    total: number; // 总数
    list: AiMusicRecordInfo[]; // 列表数据
  }

  /** 请求-AI 音乐表-列表数据查询 */
  export interface GetAiMusicRecordListReq {
    page: number; // 页码
    pageSize: number; // 页数
  }
}

/**
 * AI 音乐表-创建一条数据
 */
export async function createAiMusicRecord(
  data: AiMusicRecordApi.CreateAiMusicRecordReq,
) {
  return requestClient.post<AiMusicRecordApi.CreateAiMusicRecordReply>(
    '/admin/v1/ai_music_record/create',
    data,
  );
}

/**
 * AI 音乐表-更新一条数据
 */
export async function updateAiMusicRecord(
  data: AiMusicRecordApi.UpdateAiMusicRecordReq,
) {
  return requestClient.post<AiMusicRecordApi.UpdateAiMusicRecordReply>(
    '/admin/v1/ai_music_record/update',
    data,
  );
}

/**
 * AI 音乐表-更新状态
 */
export async function updateAiMusicRecordStatus(
  data: AiMusicRecordApi.UpdateAiMusicRecordStatusReq,
) {
  return requestClient.post<AiMusicRecordApi.UpdateAiMusicRecordStatusReply>(
    '/admin/v1/ai_music_record/update/status',
    data,
  );
}

/**
 * AI 音乐表-删除多条数据
 */
export async function deleteAiMusicRecord(id: string) {
  return requestClient.post<AiMusicRecordApi.DeleteAiMusicRecordReply>(
    '/admin/v1/ai_music_record/delete',
    { id },
  );
}

/**
 * AI 音乐表-单条数据查询
 */
export async function getAiMusicRecordInfo(id: string) {
  return requestClient.get<AiMusicRecordApi.GetAiMusicRecordInfoReply>(
    '/admin/v1/ai_music_record/info',
    { params: { id } },
  );
}

/**
 * AI 音乐表-列表数据查询
 */
export async function getAiMusicRecordList(
  params: AiMusicRecordApi.GetAiMusicRecordListReq,
) {
  return requestClient.get<PageReply<AiMusicRecordApi.AiMusicRecordInfo>>(
    '/admin/v1/ai_music_record/list',
    { params },
  );
}
