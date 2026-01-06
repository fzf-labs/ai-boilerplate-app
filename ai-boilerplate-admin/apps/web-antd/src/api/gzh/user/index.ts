import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace WxGzhUserApi {
  /** 公众号粉丝信息 */
  export interface WxGzhUser {
    id: string; // 编号
    appId: string; // 微信公众号 appid
    openid: string; // 用户标识
    unionid?: string; // 微信生态唯一标识
    subscribeStatus: number; // 关注状态
    subscribeTime?: string; // 关注时间
    unsubscribeTime?: string; // 取消关注时间
    nickname?: string; // 昵称
    headImageURL?: string; // 头像地址
    language?: string; // 语言
    country?: string; // 国家
    province?: string; // 省份
    city?: string; // 城市
    tagIds?: string; // 标签编号数组
    remark?: string; // 备注
    createdAt?: string; // 创建时间
    updatedAt?: string; // 更新时间
  }

  /** 公众号粉丝分页查询参数 */
  export interface WxGzhUserListReq extends PageReq {
    appId?: string; // 微信公众号 appid
    openid?: string; // 用户标识
    nickname?: string; // 昵称
    subscribeStatus?: number; // 关注状态
  }
}

/** 获取公众号粉丝详情 */
export function getWxGzhUserInfo(id: string) {
  return requestClient.get<{ info: WxGzhUserApi.WxGzhUser }>(
    '/admin/v1/wx_gzh_user/info',
    {
      params: { id },
    },
  );
}

/** 获取公众号粉丝列表 */
export function getWxGzhUserList(params: WxGzhUserApi.WxGzhUserListReq) {
  return requestClient.get<PageReply<WxGzhUserApi.WxGzhUser>>(
    '/admin/v1/wx_gzh_user/list',
    {
      params,
    },
  );
}
