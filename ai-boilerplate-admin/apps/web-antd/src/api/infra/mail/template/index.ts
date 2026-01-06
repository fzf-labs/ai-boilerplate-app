import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace MailTemplateApi {
  /** 邮件模版信息 */
  export interface MailTemplate {
    id: string;
    name: string;
    code: string;
    accountId: number;
    nickname: string;
    title: string;
    content: string;
    params: string[];
    status: number;
    remark: string;
    createdAt: Date;
  }

  export interface MailTemplateInfoReply {
    info: MailTemplate;
  }

  /** 邮件发送信息 */
  export interface MailSendReqVO {
    mail: string;
    templateCode: string;
    templateParams: Record<string, any>;
  }
}

/** 查询邮件模版列表 */
export function getSimpleMailTemplateSelector(accountId: string) {
  return requestClient.get<PageReply<MailTemplateApi.MailTemplate>>(
    `/admin/v1/mail_template/selector?accountId=${accountId}`,
  );
}

/** 查询邮件模版列表 */
export function getMailTemplateList(params: PageReq) {
  return requestClient.get<PageReply<MailTemplateApi.MailTemplate>>(
    '/admin/v1/mail_template/list',
    { params },
  );
}

/** 查询邮件模版详情 */
export function getMailTemplateInfo(id: string) {
  return requestClient.get<MailTemplateApi.MailTemplateInfoReply>(
    `/admin/v1/mail_template/info?id=${id}`,
  );
}

/** 新增邮件模版 */
export function createMailTemplate(data: MailTemplateApi.MailTemplate) {
  return requestClient.post('/admin/v1/mail_template/create', data);
}

/** 修改邮件模版 */
export function updateMailTemplate(data: MailTemplateApi.MailTemplate) {
  return requestClient.post('/admin/v1/mail_template/update', data);
}

/** 删除邮件模版 */
export function deleteMailTemplate(id: string) {
  return requestClient.post(`/admin/v1/mail_template/delete`, { id });
}

/** 发送邮件 */
export function sendMail(data: MailTemplateApi.MailSendReqVO) {
  return requestClient.post('/admin/v1/mail_template/send-mail', data);
}
