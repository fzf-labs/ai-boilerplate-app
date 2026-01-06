import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraConfigApi {
  /** 参数配置信息 */
  export interface Config {
    id: string;
    name: string;
    key: string;
    value: string;
    remark: string;
    status: number;
    createdAt?: Date;
    updateAt?: Date;
  }

  export interface ConfigInfoReply {
    info: Config;
  }
}

/** 查询参数列表 */
export function getConfigList(params: PageReq) {
  return requestClient.get<PageReply<InfraConfigApi.Config>>(
    '/admin/v1/config_data/list',
    {
      params,
    },
  );
}

/** 查询参数详情 */
export function getConfigInfo(id: string) {
  return requestClient.get<InfraConfigApi.ConfigInfoReply>(
    `/admin/v1/config_data/info?id=${id}`,
  );
}

/** 新增参数 */
export function createConfig(data: InfraConfigApi.Config) {
  return requestClient.post('/admin/v1/config_data/create', data);
}

/** 修改参数 */
export function updateConfig(data: InfraConfigApi.Config) {
  return requestClient.post('/admin/v1/config_data/update', data);
}

/** 删除参数 */
export function deleteConfig(id: string) {
  return requestClient.post(`/admin/v1/config_data/delete`, { id });
}
