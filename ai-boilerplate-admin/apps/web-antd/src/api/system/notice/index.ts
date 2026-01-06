import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemNoticeApi {
  /** 公告信息 */
  export interface Notice {
    id: string;
    type: string;
    title: string;
    content: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
  }
}
interface SystemNoticeInfo {
  info: SystemNoticeApi.Notice;
}

/** 查询公告列表 */
export function getNoticeList(params: PageReq) {
  return requestClient.get<PageReply<SystemNoticeApi.Notice>>(
    '/admin/v1/sys_notice/list',
    { params },
  );
}

/** 查询公告详情 */
export function getNoticeInfo(id: string) {
  return requestClient.get<SystemNoticeInfo>(
    `/admin/v1/sys_notice/info?id=${id}`,
  );
}

/** 新增公告 */
export function createNotice(data: SystemNoticeApi.Notice) {
  return requestClient.post('/admin/v1/sys_notice/create', data);
}

/** 修改公告 */
export function updateNotice(data: SystemNoticeApi.Notice) {
  return requestClient.post('/admin/v1/sys_notice/update', data);
}

/** 删除公告 */
export function deleteNotice(id: string) {
  return requestClient.post(`/admin/v1/sys_notice/delete`, { id });
}

/** 推送公告 */
export function pushNotice(id: string) {
  return requestClient.post(`/admin/v1/sys_notice/push`, { id });
}
