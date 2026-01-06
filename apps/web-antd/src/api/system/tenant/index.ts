import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemTenantApi {
  /** 租户信息 */
  export interface Tenant {
    id: string;
    name: string;
    remark: string;
    adminId: string;
    expireTime: Date;
    menuIds: string[];
    status: number;
    createdAt: Date;
    updatedAt: Date;
    adminName?: string;
  }
}

interface TenantInfo {
  info: SystemTenantApi.Tenant;
}

/** 租户列表 */
export function getTenantList(params: PageReq) {
  return requestClient.get<PageReply<SystemTenantApi.Tenant>>(
    '/admin/v1/sys_tenant/list',
    { params },
  );
}

/** 查询租户详情 */
export function getTenantInfo(id: string) {
  return requestClient.get<TenantInfo>(`/admin/v1/sys_tenant/info?id=${id}`);
}

/** 新增租户 */
export function createTenant(data: SystemTenantApi.Tenant) {
  return requestClient.post('/admin/v1/sys_tenant/create', data);
}

/** 修改租户 */
export function updateTenant(data: SystemTenantApi.Tenant) {
  return requestClient.post('/admin/v1/sys_tenant/update', data);
}

/** 删除租户 */
export function deleteTenant(id: string) {
  return requestClient.post(`/admin/v1/sys_tenant/delete`, { id });
}
