import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace AiChatRoleApi {
  // AI 聊天角色表信息
  export interface AiChatRoleInfo {
    id: string; // 角色编号
    tenantId: string; // 租户编号
    adminId?: string; // 用户编号
    modelId?: string; // 模型编号
    name: string; // 角色名称
    avatar: string; // 头像
    category?: string; // 角色类别
    sort: number; // 角色排序
    description: string; // 角色描述
    systemMessage?: string; // 角色上下文
    knowledgeIds?: string; // 关联的知识库编号数组
    toolIds?: string; // 关联的工具编号数组
    publicStatus: boolean; // 是否公开
    status: number; // 状态
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  // 创建 AI 聊天角色请求
  export interface CreateAiChatRoleReq {
    tenantId: string; // 租户编号
    adminId?: string; // 用户编号
    modelId?: string; // 模型编号
    name: string; // 角色名称
    avatar: string; // 头像
    category?: string; // 角色类别
    sort: number; // 角色排序
    description: string; // 角色描述
    systemMessage?: string; // 角色上下文
    knowledgeIds?: string; // 关联的知识库编号数组
    toolIds?: string; // 关联的工具编号数组
    publicStatus: boolean; // 是否公开
    status: number; // 状态
  }

  // 创建 AI 聊天角色响应
  export interface CreateAiChatRoleReply {
    id: string; // 角色编号
  }

  // 更新 AI 聊天角色请求
  export interface UpdateAiChatRoleReq {
    id: string; // 角色编号
    tenantId: string; // 租户编号
    adminId?: string; // 用户编号
    modelId?: string; // 模型编号
    name: string; // 角色名称
    avatar: string; // 头像
    category?: string; // 角色类别
    sort: number; // 角色排序
    description: string; // 角色描述
    systemMessage?: string; // 角色上下文
    knowledgeIds?: string; // 关联的知识库编号数组
    toolIds?: string; // 关联的工具编号数组
    publicStatus: boolean; // 是否公开
    status: number; // 状态
  }

  // 删除 AI 聊天角色请求
  export interface DeleteAiChatRoleReq {
    id: string; // 角色编号
  }

  // 更新 AI 聊天角色状态请求
  export interface UpdateAiChatRoleStatusReq {
    id: string; // 角色编号
    status: number; // 状态
  }

  // 获取 AI 聊天角色信息响应
  export interface GetAiChatRoleInfoReply {
    info: AiChatRoleInfo;
  }

  // 获取 AI 聊天角色列表响应
  export interface GetAiChatRoleListReply {
    total: number; // 总数
    list: AiChatRoleInfo[]; // 列表数据
  }
}

// 创建 AI 聊天角色
export function createAiChatRole(data: AiChatRoleApi.CreateAiChatRoleReq) {
  return requestClient.post<AiChatRoleApi.CreateAiChatRoleReply>(
    '/admin/v1/ai_chat_role/create',
    data,
  );
}

// 删除 AI 聊天角色
export function deleteAiChatRole(data: AiChatRoleApi.DeleteAiChatRoleReq) {
  return requestClient.post('/admin/v1/ai_chat_role/delete', data);
}

// 获取 AI 聊天角色信息
export function getAiChatRoleInfo(id: string) {
  return requestClient.get<AiChatRoleApi.GetAiChatRoleInfoReply>(
    '/admin/v1/ai_chat_role/info',
    { params: { id } },
  );
}

// 获取 AI 聊天角色列表
export function getAiChatRoleList(params: PageReq) {
  return requestClient.get<PageReply<AiChatRoleApi.AiChatRoleInfo>>(
    '/admin/v1/ai_chat_role/list',
    { params },
  );
}

// 更新 AI 聊天角色
export function updateAiChatRole(data: AiChatRoleApi.UpdateAiChatRoleReq) {
  return requestClient.post('/admin/v1/ai_chat_role/update', data);
}

// 更新 AI 聊天角色状态
export function updateAiChatRoleStatus(
  data: AiChatRoleApi.UpdateAiChatRoleStatusReq,
) {
  return requestClient.post('/admin/v1/ai_chat_role/update/status', data);
}
