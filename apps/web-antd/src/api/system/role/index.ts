import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemRoleApi {
  /** 角色信息 */
  export interface Role {
    id: string;
    name: string;
    remark: string;
    dataScope: number;
    menuIds: string[];
    sort: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
  }
}

interface RoleInfo {
  info: SystemRoleApi.Role;
}

/** 查询角色（精简)列表 */
export function getRoleSelector() {
  return requestClient.get<SystemRoleApi.Role[]>('/admin/v1/sys_role/selector');
}

/** 查询角色列表 */
export function getRoleList(params: PageReq) {
  return requestClient.get<PageReply<SystemRoleApi.Role>>(
    '/admin/v1/sys_role/list',
    { params },
  );
}

/** 查询角色详情 */
export function getRoleInfo(id: string) {
  return requestClient.get<RoleInfo>(`/admin/v1/sys_role/info?id=${id}`);
}

/** 新增角色 */
export function createRole(data: SystemRoleApi.Role) {
  return requestClient.post('/admin/v1/sys_role/create', data);
}

/** 修改角色 */
export function updateRole(data: SystemRoleApi.Role) {
  return requestClient.post('/admin/v1/sys_role/update', data);
}

/** 删除角色 */
export function deleteRole(id: string) {
  return requestClient.post(`/admin/v1/sys_role/delete`, { id });
}
