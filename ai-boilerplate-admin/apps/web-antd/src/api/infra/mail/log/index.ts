import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace MailLogApi {
  /** 邮件日志 */
  export interface MailLog {
    id: string;
    accountId: number;
    fromMail: string;
    toMail: string;
    templateId: number;
    templateCode: string;
    templateNickname: string;
    templateTitle: string;
    templateContent: string;
    templateParams: string;
    sendStatus: number;
    sendTime: string;
    sendMessageId: string;
    sendException: string;
    createdAt: string;
  }
  /** 邮件日志详情 */
  export interface MailLogInfoReply {
    info: MailLog;
  }
}

/** 查询邮件日志列表 */
export function getMailLogList(params: PageReq) {
  return requestClient.get<PageReply<MailLogApi.MailLog>>(
    '/admin/v1/mail_log/list',
    { params },
  );
}

/** 查询邮件日志详情 */
export function getMailLogInfo(id: string) {
  return requestClient.get<MailLogApi.MailLog>(
    `/admin/v1/mail_log/info?id=${id}`,
  );
}
