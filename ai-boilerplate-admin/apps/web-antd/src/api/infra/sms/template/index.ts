import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SmsTemplateApi {
  /** 短信模板信息 */
  export interface SmsTemplate {
    id: string;
    smsChannelId: string;
    templateType: number;
    templateCode: string;
    templateName: string;
    templateContent: string;
    templateParams: string;
    apiTemplateId: string;
    remark: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    smsChannelName: string;
  }
  /** 短信模板详情 */
  export interface SmsTemplateInfoReply {
    info: SmsTemplateApi.SmsTemplate;
  }
  /** 发送短信请求 */
  export interface SendSmsTemplateMsgReq {
    id: string;
    phone: string;
    params: Record<string, string>;
  }
}

/** 查询短信模板列表 */
export function getSmsTemplateList(params: PageReq) {
  return requestClient.get<PageReply<SmsTemplateApi.SmsTemplate>>(
    '/admin/v1/sms_template/list',
    { params },
  );
}

/** 查询短信模板详情 */
export function getSmsTemplateInfo(id: string) {
  return requestClient.get<SmsTemplateApi.SmsTemplateInfoReply>(
    `/admin/v1/sms_template/info?id=${id}`,
  );
}

/** 新增短信模板 */
export function createSmsTemplate(data: SmsTemplateApi.SmsTemplate) {
  return requestClient.post('/admin/v1/sms_template/create', data);
}

/** 修改短信模板 */
export function updateSmsTemplate(data: SmsTemplateApi.SmsTemplate) {
  return requestClient.post('/admin/v1/sms_template/update', data);
}

/** 删除短信模板 */
export function deleteSmsTemplate(id: string) {
  return requestClient.post(`/admin/v1/sms_template/delete`, { id });
}

/** 发送短信 */
export function sendSms(data: SmsTemplateApi.SendSmsTemplateMsgReq) {
  return requestClient.post('/admin/v1/sms_template/send/msg', data);
}
