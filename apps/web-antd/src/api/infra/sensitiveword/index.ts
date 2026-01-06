import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SensitiveWordApi {
  /** 敏感词信息 */
  export interface SensitiveWordInfo {
    /** ID */
    id: string;
    /** 敏感词 */
    word: string;
    /** 标签 */
    labs: string;
    /** 描述 */
    desc: string;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
  }

  /** 敏感词标签选择器 */
  export interface SensitiveWordLabsSelector {
    /** 标签键 */
    key: string;
    /** 标签值 */
    value: string;
  }

  /** 创建敏感词请求参数 */
  export interface CreateSensitiveWordReq {
    /** 敏感词 */
    word: string;
    /** 标签 */
    labs: string;
    /** 描述 */
    desc: string;
  }

  /** 创建敏感词响应 */
  export interface CreateSensitiveWordReply {
    /** ID */
    id: string;
  }

  /** 更新敏感词请求参数 */
  export interface UpdateSensitiveWordReq {
    /** ID */
    id: string;
    /** 敏感词 */
    word: string;
    /** 标签 */
    labs: string;
    /** 描述 */
    desc: string;
  }

  /** 获取敏感词信息响应 */
  export interface GetSensitiveWordInfoReply {
    info: SensitiveWordInfo;
  }
  /** 获取敏感词标签选择器响应 */
  export interface GetSensitiveWordLabsSelectorReply {
    /** 标签 */
    list: SensitiveWordLabsSelector[];
  }
}

/** 查询敏感词列表 */
export function getSensitiveWordList(params: PageReq) {
  return requestClient.get<PageReply<SensitiveWordApi.SensitiveWordInfo>>(
    '/admin/v1/sensitive_word/list',
    { params },
  );
}

/** 查询敏感词详情 */
export function getSensitiveWordInfo(id: string) {
  return requestClient.get<SensitiveWordApi.GetSensitiveWordInfoReply>(
    `/admin/v1/sensitive_word/info?id=${id}`,
  );
}

/** 新增敏感词 */
export function createSensitiveWord(
  data: SensitiveWordApi.CreateSensitiveWordReq,
) {
  return requestClient.post<SensitiveWordApi.CreateSensitiveWordReply>(
    '/admin/v1/sensitive_word/create',
    data,
  );
}

/** 修改敏感词 */
export function updateSensitiveWord(
  data: SensitiveWordApi.UpdateSensitiveWordReq,
) {
  return requestClient.post('/admin/v1/sensitive_word/update', data);
}

/** 删除敏感词 */
export function deleteSensitiveWord(id: string) {
  return requestClient.post(`/admin/v1/sensitive_word/delete`, { id });
}

/** 获取敏感词标签选择器 */
export function getSensitiveWordLabsSelector() {
  return requestClient.get<SensitiveWordApi.GetSensitiveWordLabsSelectorReply>(
    '/admin/v1/sensitive_word/labs/selector',
  );
}
