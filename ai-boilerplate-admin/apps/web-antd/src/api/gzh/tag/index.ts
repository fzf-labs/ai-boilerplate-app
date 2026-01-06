import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace WxGzhTagApi {
  /** 公众号标签信息 */
  export interface WxGzhTagInfo {
    id: string; // 主键
    appId: string; // 公众号 appId
    tagId: number; // 公众号标签 id
    name: string; // 标签名称
    count: number; // 粉丝数量
    createdAt: Date; // 创建时间
    updatedAt: Date; // 更新时间
  }

  /** 公众号标签选择器信息 */
  export interface WxGzhTagSelector {
    id: string; // 主键
    tagId: number; // 公众号标签 id
    name: string; // 标签名称
  }

  /** 创建标签请求 */
  export interface CreateWxGzhTagReq {
    appId: string; // 公众号 appId
    tagId?: number; // 公众号标签 id
    name?: string; // 标签名称
  }

  /** 创建标签响应 */
  export interface CreateWxGzhTagReply {
    id: string; // 主键
  }

  /** 更新标签请求 */
  export interface UpdateWxGzhTagReq {
    id: string; // 主键
    appId: string; // 公众号 appId
    tagId?: number; // 公众号标签 id
    name?: string; // 标签名称
  }

  /** 删除标签请求 */
  export interface DeleteWxGzhTagReq {
    id: string; // 主键
  }

  /** 获取标签信息请求 */
  export interface GetWxGzhTagInfoReq {
    id: string; // 主键
  }

  /** 获取标签信息响应 */
  export interface GetWxGzhTagInfoReply {
    info: WxGzhTagInfo;
  }

  /** 获取标签列表请求 */
  export interface GetWxGzhTagListReq extends PageReq {
    appId?: string; // 公众号appId
  }

  /** 获取标签列表响应 */
  export type GetWxGzhTagListReply = PageReply<WxGzhTagInfo>;

  /** 获取标签选择器请求 */
  export interface GetWxGzhTagSelectorReq {
    appId: string; // 公众号 appId
  }

  /** 获取标签选择器响应 */
  export interface GetWxGzhTagSelectorReply {
    list: WxGzhTagSelector[]; // 列表数据
  }
}

/** 创建公众号标签 */
export function createWxGzhTag(data: WxGzhTagApi.CreateWxGzhTagReq) {
  return requestClient.post<WxGzhTagApi.CreateWxGzhTagReply>(
    '/admin/v1/wx_gzh_tag/create',
    data,
  );
}

/** 更新公众号标签 */
export function updateWxGzhTag(data: WxGzhTagApi.UpdateWxGzhTagReq) {
  return requestClient.post('/admin/v1/wx_gzh_tag/update', data);
}

/** 同步公众号标签 */
export function syncWxGzhTag(appId: string) {
  return requestClient.post('/admin/v1/wx_gzh_tag/sync', {
    appId,
  });
}

/** 删除公众号标签 */
export function deleteWxGzhTag(data: WxGzhTagApi.DeleteWxGzhTagReq) {
  return requestClient.post('/admin/v1/wx_gzh_tag/delete', data);
}

/** 获取公众号标签详情 */
export function getWxGzhTagInfo(id: string) {
  return requestClient.get<WxGzhTagApi.GetWxGzhTagInfoReply>(
    '/admin/v1/wx_gzh_tag/info',
    {
      params: { id },
    },
  );
}

/** 获取公众号标签列表 */
export function getWxGzhTagList(params: WxGzhTagApi.GetWxGzhTagListReq) {
  return requestClient.get<WxGzhTagApi.GetWxGzhTagListReply>(
    '/admin/v1/wx_gzh_tag/list',
    {
      params,
    },
  );
}

/** 获取公众号标签选择器 */
export function getWxGzhTagSelector(
  params: WxGzhTagApi.GetWxGzhTagSelectorReq,
) {
  return requestClient.get<WxGzhTagApi.GetWxGzhTagSelectorReply>(
    '/admin/v1/wx_gzh_tag/selector',
    {
      params,
    },
  );
}
