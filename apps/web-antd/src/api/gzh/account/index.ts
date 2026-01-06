import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace MpAccountApi {
  /** 公众号账号信息 */
  export interface Account {
    id: string;
    name: string;
    account: string;
    appId: string;
    appSecret: string;
    URL: string;
    token: string;
    encodingAesKey: string;
    qrCodeURL?: string;
    remark?: string;
    createdAt?: Date;
    updateAt?: Date;
  }
  export interface AccountSimple {
    id: string;
    name: string;
    appId: string;
  }
  export interface InfoReply {
    info: Account;
  }
  export interface SimpleAccountListReply {
    list: AccountSimple[];
  }
}

/** 查询公众号账号列表 */
export function getAccountList(params: PageReq) {
  return requestClient.get<PageReply<MpAccountApi.Account>>(
    '/admin/v1/wx_gzh_account/list',
    {
      params,
    },
  );
}

/** 查询公众号账号选择器 */
export function getAccountSelector() {
  return requestClient.get<MpAccountApi.SimpleAccountListReply>(
    '/admin/v1/wx_gzh_account/selector',
  );
}

/** 查询公众号账号详情 */
export function getAccountInfo(id: string) {
  return requestClient.get<MpAccountApi.InfoReply>(
    `/admin/v1/wx_gzh_account/info?id=${id}`,
  );
}

/** 新增公众号账号 */
export function createAccount(data: MpAccountApi.Account) {
  return requestClient.post('/admin/v1/wx_gzh_account/create', data);
}

/** 修改公众号账号 */
export function updateAccount(data: MpAccountApi.Account) {
  return requestClient.post('/admin/v1/wx_gzh_account/update', data);
}

/** 删除公众号账号 */
export function deleteAccount(id: string) {
  return requestClient.post(`/admin/v1/wx_gzh_account/delete`, {
    id,
  });
}

/** 生成公众号账号二维码 */
export function generateAccountQrCode(id: string) {
  return requestClient.post(`/admin/v1/wx_gzh_account/generate-qr-code`, {
    id,
  });
}

/** 清空公众号账号 API 配额 */
export function clearAccountQuota(id: string) {
  return requestClient.post(`/admin/v1/wx_gzh_account/clear-quota`, {
    id,
  });
}
