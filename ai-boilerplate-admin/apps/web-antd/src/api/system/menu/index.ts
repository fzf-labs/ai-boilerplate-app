import type { PageReply } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemMenuApi {
  /** 菜单信息 */
  export interface Menu {
    id: string; // 菜单id
    pid: string; // 父级菜单id
    name: string; // 菜单名称
    type: string; // 菜单类型 dir menu button
    path: string; // 菜单路径
    permission: string; // 菜单权限
    icon: string; // 菜单图标
    component: string; // 菜单组件
    componentName: string; // 菜单组件名称
    sort: number; // 菜单排序
    status: number; // 菜单状态
    children?: Menu[]; // 子菜单
  }
}

interface MenuInfo {
  info: SystemMenuApi.Menu;
}

/** 查询菜单列表 */
export function getMenuList() {
  return requestClient.get<PageReply<SystemMenuApi.Menu>>(
    '/admin/v1/sys_menu/list',
  );
}

/** 获取菜单详情 */
export async function getMenuInfo(id: string) {
  return requestClient.get<MenuInfo>(`/admin/v1/sys_menu/info?id=${id}`);
}

/** 新增菜单 */
export async function createMenu(data: SystemMenuApi.Menu) {
  return requestClient.post('/admin/v1/sys_menu/create', data);
}

/** 修改菜单 */
export async function updateMenu(data: SystemMenuApi.Menu) {
  return requestClient.post('/admin/v1/sys_menu/update', data);
}

/** 删除菜单 */
export async function deleteMenu(id: string) {
  return requestClient.post(`/admin/v1/sys_menu/delete`, { id });
}
