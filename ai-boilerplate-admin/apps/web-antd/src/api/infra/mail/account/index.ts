import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace MailAccountApi {
  /** 邮箱账号 */
  export interface MailAccount {
    id: string;
    mail: string;
    username: string;
    password: string;
    host: string;
    port: number;
    sslEnable: boolean;
    remark: string;
    status: number;
    createdAt: Date;
    updateAt: Date;
  }
  /** 邮箱账号详情 */
  export interface MailAccountInfoReply {
    info: MailAccount;
  }
}

/** 查询邮箱账号详情 */
export function getMailAccountInfo(id: string) {
  return requestClient.get<MailAccountApi.MailAccountInfoReply>(
    `/admin/v1/mail_account/info?id=${id}`,
  );
}

/** 新增邮箱账号 */
export function createMailAccount(data: MailAccountApi.MailAccount) {
  return requestClient.post('/admin/v1/mail_account/create', data);
}

/** 修改邮箱账号 */
export function updateMailAccount(data: MailAccountApi.MailAccount) {
  return requestClient.post('/admin/v1/mail_account/update', data);
}

/** 删除邮箱账号 */
export function deleteMailAccount(id: string) {
  return requestClient.post(`/admin/v1/mail_account/delete`, {
    id,
  });
}

/** 获得邮箱账号精简列表 */
export function getSimpleMailAccountSelector() {
  return requestClient.get<PageReply<MailAccountApi.MailAccount>>(
    '/admin/v1/mail_account/selector',
  );
}

/** 查询邮箱账号列表 */
export function getMailAccountList(params: PageReq) {
  return requestClient.get<PageReply<MailAccountApi.MailAccount>>(
    '/admin/v1/mail_account/list',
    { params },
  );
}
