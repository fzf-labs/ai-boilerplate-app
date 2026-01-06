import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiChatConversationApi {
  /** AI 聊天对话表信息 */
  export interface AiChatConversationInfo {
    id: string; // 对话编号
    adminId: string; // 用户编号
    roleId: string; // 聊天角色
    title: string; // 对话标题
    modelId: string; // 模型编号
    model: string; // 模型标识
    pinned: boolean; // 是否置顶
    pinnedTime: string; // 置顶时间
    systemMessage: string; // 角色设定
    temperature: number; // 温度参数
    maxTokens: number; // 单条回复的最大 Token 数量
    maxContexts: number; // 上下文的最大 Message 数量
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  /** 请求-AI 聊天对话表-创建一条数据 */
  export interface CreateAiChatConversationReq {
    adminId: string; // 用户编号
    roleId?: string; // 聊天角色
    title: string; // 对话标题
    modelId: string; // 模型编号
    model: string; // 模型标识
    pinned: boolean; // 是否置顶
    pinnedTime?: string; // 置顶时间
    systemMessage?: string; // 角色设定
    temperature: number; // 温度参数
    maxTokens: number; // 单条回复的最大 Token 数量
    maxContexts: number; // 上下文的最大 Message 数量
  }

  /** 响应-AI 聊天对话表-创建一条数据 */
  export interface CreateAiChatConversationReply {
    id: string; // 对话编号
  }

  /** 请求-AI 聊天对话表-更新一条数据 */
  export interface UpdateAiChatConversationReq {
    id: string; // 对话编号
    adminId: string; // 用户编号
    roleId?: string; // 聊天角色
    title: string; // 对话标题
    modelId: string; // 模型编号
    model: string; // 模型标识
    pinned: boolean; // 是否置顶
    pinnedTime?: string; // 置顶时间
    systemMessage?: string; // 角色设定
    temperature: number; // 温度参数
    maxTokens: number; // 单条回复的最大 Token 数量
    maxContexts: number; // 上下文的最大 Message 数量
  }

  /** 响应-AI 聊天对话表-更新一条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UpdateAiChatConversationReply {}

  /** 请求-AI 聊天对话表-删除多条数据 */
  export interface DeleteAiChatConversationReq {
    id: string; // 对话编号
  }

  /** 响应-AI 聊天对话表-删除多条数据 */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DeleteAiChatConversationReply {}

  /** 响应-AI 聊天对话表-单条数据查询 */
  export interface GetAiChatConversationInfoReply {
    info: AiChatConversationInfo;
  }

  /** 响应-AI 聊天对话表-列表数据查询 */
  export interface GetAiChatConversationListReply {
    total: number; // 总数
    list: AiChatConversationInfo[]; // 列表数据
  }

  /** 请求-AI 聊天对话表-列表数据查询 */
  export interface GetAiChatConversationListReq {
    page: number; // 页码
    pageSize: number; // 页数
  }
}

/**
 * AI 聊天对话表-创建一条数据
 */
export async function createAiChatConversation(
  data: AiChatConversationApi.CreateAiChatConversationReq,
) {
  return requestClient.post<AiChatConversationApi.CreateAiChatConversationReply>(
    '/admin/v1/ai_chat_conversation/create',
    data,
  );
}

/**
 * AI 聊天对话表-更新一条数据
 */
export async function updateAiChatConversation(
  data: AiChatConversationApi.UpdateAiChatConversationReq,
) {
  return requestClient.post<AiChatConversationApi.UpdateAiChatConversationReply>(
    '/admin/v1/ai_chat_conversation/update',
    data,
  );
}

/**
 * AI 聊天对话表-删除多条数据
 */
export async function deleteAiChatConversation(id: string) {
  return requestClient.post<AiChatConversationApi.DeleteAiChatConversationReply>(
    '/admin/v1/ai_chat_conversation/delete',
    { id },
  );
}

/**
 * AI 聊天对话表-单条数据查询
 */
export async function getAiChatConversationInfo(id: string) {
  return requestClient.get<AiChatConversationApi.GetAiChatConversationInfoReply>(
    '/admin/v1/ai_chat_conversation/info',
    { params: { id } },
  );
}

/**
 * AI 聊天对话表-列表数据查询
 */
export async function getAiChatConversationList(
  params: AiChatConversationApi.GetAiChatConversationListReq,
) {
  return requestClient.get<
    PageReply<AiChatConversationApi.AiChatConversationInfo>
  >('/admin/v1/ai_chat_conversation/list', { params });
}
