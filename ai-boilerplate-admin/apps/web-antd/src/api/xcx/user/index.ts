import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace WxXcxUserApi {
  /** 小程序用户信息 */
  export interface WxXcxUser {
    id: string; // 编号
    appId: string; // 微信小程序 appid
    openid: string; // 用户标识
    unionid?: string; // 微信生态唯一标识
    nickname?: string; // 昵称
    avatarURL?: string; // 头像地址
    language?: string; // 语言
    country?: string; // 国家
    province?: string; // 省份
    city?: string; // 城市
    remark?: string; // 备注
    createdAt?: string; // 创建时间
    updatedAt?: string; // 更新时间
  }

  /** 小程序用户分页查询参数 */
  export interface WxXcxUserListReq extends PageReq {
    appId?: string; // 微信小程序 appid
    openid?: string; // 用户标识
    nickname?: string; // 昵称
  }

  /** 删除小程序用户请求 */
  export interface DeleteWxXcxUserReq {
    id: string; // 编号
  }
}

interface WxXcxUserInfoReply {
  info: WxXcxUserApi.WxXcxUser;
}

interface DeleteWxXcxUserReply {
  // 删除操作响应为空对象
  [key: string]: any;
}

/** 获取小程序用户详情 */
export function getWxXcxUserInfo(id: string) {
  return requestClient.get<WxXcxUserInfoReply>('/admin/v1/wx_xcx_user/info', {
    params: { id },
  });
}

/** 获取小程序用户列表 */
export function getWxXcxUserList(params: WxXcxUserApi.WxXcxUserListReq) {
  return requestClient.get<PageReply<WxXcxUserApi.WxXcxUser>>(
    '/admin/v1/wx_xcx_user/list',
    {
      params,
    },
  );
}

/** 删除小程序用户 */
export function deleteWxXcxUser(data: WxXcxUserApi.DeleteWxXcxUserReq) {
  return requestClient.post<DeleteWxXcxUserReply>(
    '/admin/v1/wx_xcx_user/delete',
    data,
  );
}
