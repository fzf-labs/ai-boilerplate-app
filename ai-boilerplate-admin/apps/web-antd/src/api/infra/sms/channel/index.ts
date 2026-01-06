import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SmsChannelApi {
  /** 短信渠道信息 */
  export interface SmsChannel {
    id: string;
    channelName: string;
    channelCode: string;
    remark: string;
    APIKey: string;
    APISecret: string;
    callbackURL: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
  }
  /** 短信渠道运营商 */
  export interface SmsChannelOperator {
    code: string;
    operator: string;
  }
}

interface SmsChannelInfo {
  info: SmsChannelApi.SmsChannel;
}

/** 查询短信渠道运营商列表 */
export function getSmsChannelOperator() {
  return requestClient.get<PageReply<SmsChannelApi.SmsChannelOperator>>(
    '/admin/v1/sms_channel/operator',
  );
}

/** 查询短信渠道下拉列表 */
export function getSmsChannelSelector() {
  return requestClient.get<PageReply<SmsChannelApi.SmsChannel>>(
    '/admin/v1/sms_channel/selector',
  );
}

/** 查询短信渠道列表 */
export function getSmsChannelList(params: PageReq) {
  return requestClient.get<PageReply<SmsChannelApi.SmsChannel>>(
    '/admin/v1/sms_channel/list',
    { params },
  );
}

/** 查询短信渠道详情 */
export function getSmsChannelInfo(id: string) {
  return requestClient.get<SmsChannelInfo>(
    `/admin/v1/sms_channel/info?id=${id}`,
  );
}

/** 新增短信渠道 */
export function createSmsChannel(data: SmsChannelApi.SmsChannel) {
  return requestClient.post('/admin/v1/sms_channel/create', data);
}

/** 修改短信渠道 */
export function updateSmsChannel(data: SmsChannelApi.SmsChannel) {
  return requestClient.post('/admin/v1/sms_channel/update', data);
}

/** 删除短信渠道 */
export function deleteSmsChannel(id: string) {
  return requestClient.post(`/admin/v1/sms_channel/delete`, { id });
}
