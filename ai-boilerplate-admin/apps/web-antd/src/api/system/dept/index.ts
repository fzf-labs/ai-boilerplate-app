import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemDeptApi {
  /** 部门信息 */
  export interface Dept {
    id: string;
    pid: string;
    name: string;
    adminId: string;
    sort: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    children?: Dept[];
  }
}

interface DeptInfo {
  info: SystemDeptApi.Dept;
}

/** 部门列表 */
export function getDeptList() {
  return requestClient.get<PageReply<SystemDeptApi.Dept>>(
    '/admin/v1/sys_dept/list',
  );
}

/** 查询部门详情 */
export async function getDeptInfo(id: string) {
  return requestClient.get<DeptInfo>(`/admin/v1/sys_dept/info?id=${id}`);
}

/** 新增部门 */
export async function createDept(data: SystemDeptApi.Dept) {
  return requestClient.post('/admin/v1/sys_dept/create', data);
}

/** 修改部门 */
export async function updateDept(data: SystemDeptApi.Dept) {
  return requestClient.post('/admin/v1/sys_dept/update', data);
}

/** 删除部门 */
export async function deleteDept(id: string) {
  return requestClient.post(`/admin/v1/sys_dept/delete`, { id });
}
