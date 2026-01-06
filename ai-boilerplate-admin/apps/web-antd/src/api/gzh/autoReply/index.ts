import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace MpAutoReplyApi {
  /** 自动回复信息 */
  export interface AutoReply {
    id: string; // 主键
    appId: string; // 公众号 appId
    type: number; // 回复类型(关键词回复,收到消息回复,被关注回复)
    requestKeyword: string; // 请求的关键字
    requestKeywordMatch: number; // 请求的关键字匹配类型
    responseMessageType: string; // 回复的消息类型
    responseContent: string; // 回复的消息内容
    responseMediaId: string; // 回复的媒体文件 id
    status: number; // 状态(-1禁用,1开启)
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
  }

  /** 自动回复详情响应 */
  export interface InfoReply {
    info: AutoReply;
  }

  /** 自动回复类型枚举 */
  export enum AutoReplyType {
    KEYWORD = 1, // 关键词回复
    MESSAGE = 2, // 收到消息回复
    SUBSCRIBE = 3, // 被关注回复
  }

  /** 关键字匹配类型枚举 */
  export enum KeywordMatchType {
    EXACT = 1, // 全匹配
    PARTIAL = 2, // 半匹配
  }

  /** 回复消息类型枚举 */
  export enum ResponseMessageType {
    IMAGE = 'image', // 图片消息
    TEXT = 'text', // 文本消息
    VIDEO = 'video', // 视频消息
    VOICE = 'voice', // 音频消息
  }

  /** 自动回复状态枚举 */
  export enum AutoReplyStatus {
    DISABLE = -1, // 禁用
    ENABLE = 1, // 启用
  }
}

/** 查询自动回复列表 */
export function getAutoReplyList(params: PageReq) {
  return requestClient.get<PageReply<MpAutoReplyApi.AutoReply>>(
    '/admin/v1/wx_gzh_auto_reply/list',
    {
      params,
    },
  );
}

/** 查询自动回复详情 */
export function getAutoReplyInfo(id: string) {
  return requestClient.get<MpAutoReplyApi.InfoReply>(
    `/admin/v1/wx_gzh_auto_reply/info?id=${id}`,
  );
}

/** 新增自动回复 */
export function createAutoReply(data: MpAutoReplyApi.AutoReply) {
  return requestClient.post('/admin/v1/wx_gzh_auto_reply/create', data);
}

/** 修改自动回复 */
export function updateAutoReply(data: MpAutoReplyApi.AutoReply) {
  return requestClient.post('/admin/v1/wx_gzh_auto_reply/update', data);
}

/** 更新自动回复状态 */
export function updateAutoReplyStatus(id: string, status: number) {
  return requestClient.post('/admin/v1/wx_gzh_auto_reply/update/status', {
    id,
    status,
  });
}

/** 删除自动回复 */
export function deleteAutoReply(id: string) {
  return requestClient.post('/admin/v1/wx_gzh_auto_reply/delete', {
    id,
  });
}
