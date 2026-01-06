import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemDictDataApi {
  /** 字典数据 */
  export interface DictData {
    id: string;
    type: string;
    label: string;
    key: string;
    value: string;
    cssClass: string;
    cssColor: string;
    remark: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

interface DictDataInfo {
  info: SystemDictDataApi.DictData;
}

// 查询字典数据选择器
export function getDictDataSelector() {
  return requestClient.get('/admin/v1/dict_data/selector');
}

// 查询字典数据列表
export function getDictDataList(params: PageReq) {
  return requestClient.get<PageReply<SystemDictDataApi.DictData>>(
    '/admin/v1/dict_data/list',
    { params },
  );
}

// 查询字典数据详情
export function getDictDataInfo(id: string) {
  return requestClient.get<DictDataInfo>(`/admin/v1/dict_data/info?id=${id}`);
}

// 新增字典数据
export function createDictData(data: SystemDictDataApi.DictData) {
  return requestClient.post('/admin/v1/dict_data/create', data);
}

// 修改字典数据
export function updateDictData(data: SystemDictDataApi.DictData) {
  return requestClient.post('/admin/v1/dict_data/update', data);
}

// 删除字典数据
export function deleteDictData(id: string) {
  return requestClient.post('/admin/v1/dict_data/delete', { id });
}
