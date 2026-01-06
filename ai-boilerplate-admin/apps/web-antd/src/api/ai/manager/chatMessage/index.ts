import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiChatMessageApi {
  /** AI 聊天消息表信息 */
  export interface AiChatMessageInfo {
    id: string; // 消息编号
    conversationId: string; // 对话编号
    replyId: string; // 回复编号
    adminId: string; // 用户编号
    roleId: string; // 角色编号
    type: string; // 消息类型
    model: string; // 模型标识
    modelId: string; // 模型编号
    content: string; // 消息内容
    useContext: boolean; // 是否携带上下文
    segmentIds: string; // 段落编号数组
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  /** 请求-AI 聊天消息表-创建一条数据 */
  export interface CreateAiChatMessageReq {
    conversationId: string; // 对话编号
    replyId?: string; // 回复编号
    adminId: string; // 用户编号
    roleId?: string; // 角色编号
    type: string; // 消息类型
    model: string; // 模型标识
    modelId: string; // 模型编号
    content: string; // 消息内容
    useContext: boolean; // 是否携带上下文
    segmentIds?: string; // 段落编号数组
  }

  /** 响应-AI 聊天消息表-创建一条数据 */
  export interface CreateAiChatMessageReply {
    id: string; // 消息编号
  }

  /** 请求-AI 聊天消息表-更新一条数据 */
  export interface UpdateAiChatMessageReq {
    id: string; // 消息编号
    conversationId: string; // 对话编号
    replyId?: string; // 回复编号
    adminId: string; // 用户编号
    roleId?: string; // 角色编号
    type: string; // 消息类型
    model: string; // 模型标识
    modelId: string; // 模型编号
    content: string; // 消息内容
    useContext: boolean; // 是否携带上下文
    segmentIds?: string; // 段落编号数组
  }

  /** 响应-AI 聊天消息表-更新一条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiChatMessageReply {}

  /** 请求-AI 聊天消息表-删除多条数据 */
  export interface DeleteAiChatMessageReq {
    id: string; // 消息编号
  }

  /** 响应-AI 聊天消息表-删除多条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DeleteAiChatMessageReply {}

  /** 响应-AI 聊天消息表-单条数据查询 */
  export interface GetAiChatMessageInfoReply {
    info: AiChatMessageInfo;
  }

  /** 响应-AI 聊天消息表-列表数据查询 */
  export interface GetAiChatMessageListReply {
    total: number; // 总数
    list: AiChatMessageInfo[]; // 列表数据
  }

  /** 请求-AI 聊天消息表-列表数据查询 */
  export interface GetAiChatMessageListReq {
    page: number; // 页码
    pageSize: number; // 页数
  }
}

/**
 * AI 聊天消息表-创建一条数据
 */
export async function createAiChatMessage(
  data: AiChatMessageApi.CreateAiChatMessageReq,
) {
  return requestClient.post<AiChatMessageApi.CreateAiChatMessageReply>(
    '/admin/v1/ai_chat_message/create',
    data,
  );
}

/**
 * AI 聊天消息表-更新一条数据
 */
export async function updateAiChatMessage(
  data: AiChatMessageApi.UpdateAiChatMessageReq,
) {
  return requestClient.post<AiChatMessageApi.UpdateAiChatMessageReply>(
    '/admin/v1/ai_chat_message/update',
    data,
  );
}

/**
 * AI 聊天消息表-删除多条数据
 */
export async function deleteAiChatMessage(id: string) {
  return requestClient.post<AiChatMessageApi.DeleteAiChatMessageReply>(
    '/admin/v1/ai_chat_message/delete',
    { id },
  );
}

/**
 * AI 聊天消息表-单条数据查询
 */
export async function getAiChatMessageInfo(id: string) {
  return requestClient.get<AiChatMessageApi.GetAiChatMessageInfoReply>(
    '/admin/v1/ai_chat_message/info',
    { params: { id } },
  );
}

/**
 * AI 聊天消息表-列表数据查询
 */
export async function getAiChatMessageList(
  params: AiChatMessageApi.GetAiChatMessageListReq,
) {
  return requestClient.get<PageReply<AiChatMessageApi.AiChatMessageInfo>>(
    '/admin/v1/ai_chat_message/list',
    { params },
  );
}
