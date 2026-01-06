import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemDictTypeApi {
  /** 字典类型 */
  export interface DictType {
    id: string;
    type: string;
    name: string;
    remark: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
  }
}

interface DictTypeInfo {
  info: SystemDictTypeApi.DictType;
}

// 查询字典类型选择器
export function getDictTypeSelector() {
  return requestClient.get('/admin/v1/dict_type/selector');
}

// 查询字典列表
export function getDictTypeList(params: PageReq) {
  return requestClient.get<PageReply<SystemDictTypeApi.DictType>>(
    '/admin/v1/dict_type/list',
    { params },
  );
}

// 查询字典详情
export function getDictTypeInfo(id: string) {
  return requestClient.get<DictTypeInfo>(`/admin/v1/dict_type/info?id=${id}`);
}

// 新增字典
export function createDictType(data: SystemDictTypeApi.DictType) {
  return requestClient.post('/admin/v1/dict_type/create', data);
}

// 修改字典
export function updateDictType(data: SystemDictTypeApi.DictType) {
  return requestClient.post('/admin/v1/dict_type/update', data);
}

// 删除字典
export function deleteDictType(id: string) {
  return requestClient.post('/admin/v1/dict_type/delete', { id });
}
