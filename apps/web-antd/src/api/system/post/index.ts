import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemPostApi {
  /** 岗位信息 */
  export interface Post {
    id: string;
    name: string;
    code: string;
    remark: string;
    sort: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
  }
}

interface PostInfo {
  info: SystemPostApi.Post;
}

/** 获取岗位精简信息列表 */
export function getPostSelector() {
  return requestClient.get<SystemPostApi.Post[]>('/admin/v1/sys_post/selector');
}

/** 查询岗位列表 */
export function getPostList(params: PageReq) {
  return requestClient.get<PageReply<SystemPostApi.Post>>(
    '/admin/v1/sys_post/list',
    {
      params,
    },
  );
}

/** 查询岗位详情 */
export function getPostInfo(id: string) {
  return requestClient.get<PostInfo>(`/admin/v1/sys_post/info?id=${id}`);
}

/** 新增岗位 */
export function createPost(data: SystemPostApi.Post) {
  return requestClient.post('/admin/v1/sys_post/create', data);
}

/** 修改岗位 */
export function updatePost(data: SystemPostApi.Post) {
  return requestClient.post('/admin/v1/sys_post/update', data);
}

/** 删除岗位 */
export function deletePost(id: string) {
  return requestClient.post(`/admin/v1/sys_post/delete`, { id });
}
