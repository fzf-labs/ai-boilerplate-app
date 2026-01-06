import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemOperateLogApi {
  /** 操作日志信息 */
  export interface OperateLog {
    id: number;
    traceId: string;
    adminId: number;
    ip: string;
    URI: string;
    header: string;
    useragent: string;
    req: string;
    resp: string;
    createdAt: Date;
    nickname: string;
  }
}

/** 查询操作日志列表 */
export function getOperateLogList(params: PageReq) {
  return requestClient.get<PageReply<SystemOperateLogApi.OperateLog>>(
    '/admin/v1/sys_operate_log/list',
    { params },
  );
}
