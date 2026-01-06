import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SmsLogApi {
  /** 短信日志信息 */
  export interface SmsLog {
    id: string;
    smsChannelId: string;
    smsTemplateId: string;
    smsParamsContent: string;
    mobile: string;
    userId: string;
    sendStatus: string;
    sendTime: string;
    receiveStatus: string;
    receiveTime: string;
    apiSendCode: string;
    apiSendMsg: string;
    apiRequestId: string;
    apiSerialNo: string;
    apiReceiveCode: string;
    apiReceiveMsg: string;
    createdAt: string;
  }
}

/** 查询短信日志列表 */
export function getSmsLogList(params: PageReq) {
  return requestClient.get<PageReply<SmsLogApi.SmsLog>>(
    '/admin/v1/sms_log/list',
    { params },
  );
}
