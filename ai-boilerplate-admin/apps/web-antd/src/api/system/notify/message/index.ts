import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemNotifyMessageApi {
  /** 站内信消息信息 */
  export interface NotifyMessage {
    id: string;
    tenantId: string;
    type: string;
    subject: string;
    content: string;
    sender: string;
    receiver: string;
    sendTime: string;
    readTime: string;
    extend: string;
    senderName: string;
    senderAvatar: string;
    receiverName: string;
    receiverAvatar: string;
  }
}

interface SystemNotifyMessageInfo {
  info: SystemNotifyMessageApi.NotifyMessage;
}

interface SystemNotifyMessageCount {
  count: number;
}

/** 获得当前用户的所有站内信列表 */
export function getMyNotifyMessagePage(params: PageReq) {
  return requestClient.get<PageReply<SystemNotifyMessageApi.NotifyMessage>>(
    '/admin/v1/sys_notify_message/my/list',
    { params },
  );
}

/** 获取当前用户的未读的站内信列表 */
export function getMyUnreadNotifyMessageList() {
  return requestClient.get<PageReply<SystemNotifyMessageApi.NotifyMessage>>(
    '/admin/v1/sys_notify_message/my/unread_list',
  );
}

/** 获得当前用户的未读站内信数量 */
export function getMyUnreadNotifyMessageCount() {
  return requestClient.get<SystemNotifyMessageCount>(
    '/admin/v1/sys_notify_message/my/unread_count',
  );
}

/** 批量标记当前用户的站内信为已读 */
export function updateMyNotifyMessageRead(ids: string[]) {
  return requestClient.post('/admin/v1/sys_notify_message/my/update_read', {
    ids,
  });
}

/** 标记当前用户的所有站内信为已读 */
export function updateMyAllNotifyMessageRead() {
  return requestClient.post(
    '/admin/v1/sys_notify_message/my/update_all_read',
    {},
  );
}

/** 查询站内信消息列表 */
export function getNotifyMessageList(params: PageReq) {
  return requestClient.get<PageReply<SystemNotifyMessageApi.NotifyMessage>>(
    '/admin/v1/sys_notify_message/list',
    { params },
  );
}

/** 查询站内信消息详情 */
export function getNotifyMessageInfo(id: string) {
  return requestClient.get<SystemNotifyMessageInfo>(
    `/admin/v1/sys_notify_message/info?id=${id}`,
  );
}
