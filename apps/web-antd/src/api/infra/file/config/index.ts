import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraFileConfigApi {
  /** 阿里云存储配置 */
  export interface AliyunConfig {
    accessKey: string; // 访问密钥
    secretKey: string; // 密钥
    bucket: string; // 桶
    endpoint: string; // 端点
    host: string; // 主机
    prefix?: string; // 前缀
    salt?: string; // 盐
  }

  /** 腾讯云存储配置 */
  export interface TencentConfig {
    accessKey: string; // 访问密钥
    secretKey: string; // 密钥
    endpoint: string; // 端点
    region: string; // 区域
    bucket: string; // 桶
  }

  /** 七牛云存储配置 */
  export interface QiniuConfig {
    accessKey: string; // 访问密钥
    secretKey: string; // 密钥
    bucket: string; // 桶
    action?: string;
  }

  /** 火山云存储配置 */
  export interface VolcengineConfig {
    accessKey: string; // 访问密钥
    secretKey: string; // 密钥
    endpoint: string; // 端点
    region: string; // 区域
    bucket: string; // 桶
    accountID: string; // 账号ID
    roleName: string; // 角色名称
  }

  /** 存储配置联合类型 */
  export interface StorageConfig {
    volcengine?: VolcengineConfig;
    aliyun?: AliyunConfig;
    tencent?: TencentConfig;
    qiniu?: QiniuConfig;
  }

  /** 文件配置信息 */
  export interface FileConfig {
    id?: string;
    name: string;
    storage: string;
    master?: boolean;
    config: StorageConfig;
    remark?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  /** 文件配置存储器选项 */
  export interface FileConfigStorage {
    label: string;
    value: string;
  }

  /** 创建文件配置请求 */
  export interface CreateFileConfigReq {
    name: string;
    storage: string;
    remark?: string;
    config: StorageConfig;
  }

  /** 更新文件配置请求 */
  export interface UpdateFileConfigReq {
    id: string;
    name: string;
    storage: string;
    remark?: string;
    config: StorageConfig;
  }

  /** 删除文件配置请求 */
  export interface DeleteFileConfigReq {
    id: string;
  }

  /** 设置主配置请求 */
  export interface SetFileConfigMasterReq {
    id: string;
  }

  /** 查询文件配置列表请求 */
  export interface GetFileConfigListReq extends PageReq {
    name?: string;
    storage?: string;
  }
}

/** 查询文件配置列表 */
export function getFileConfigList(
  params: InfraFileConfigApi.GetFileConfigListReq,
) {
  return requestClient.get<PageReply<InfraFileConfigApi.FileConfig>>(
    '/admin/v1/file_config/list',
    {
      params,
    },
  );
}

/** 查询文件配置详情 */
export function getFileConfigInfo(id: string) {
  return requestClient.get<{ info: InfraFileConfigApi.FileConfig }>(
    '/admin/v1/file_config/info',
    {
      params: { id },
    },
  );
}

/** 新增文件配置 */
export function createFileConfig(data: InfraFileConfigApi.CreateFileConfigReq) {
  return requestClient.post<{ id: string }>(
    '/admin/v1/file_config/create',
    data,
  );
}

/** 修改文件配置 */
export function updateFileConfig(data: InfraFileConfigApi.UpdateFileConfigReq) {
  return requestClient.post('/admin/v1/file_config/update', data);
}

/** 设置文件配置为主配置 */
export function setFileConfigMaster(
  data: InfraFileConfigApi.SetFileConfigMasterReq,
) {
  return requestClient.post('/admin/v1/file_config/set_master', data);
}

/** 删除文件配置 */
export function deleteFileConfig(data: InfraFileConfigApi.DeleteFileConfigReq) {
  return requestClient.post('/admin/v1/file_config/delete', data);
}

/** 获取存储器选择器 */
export function getFileConfigStorageSelect() {
  return requestClient.get<{ list: InfraFileConfigApi.FileConfigStorage[] }>(
    '/admin/v1/file_config/storage/select',
  );
}

/** 获取文件配置选择器 */
export function getFileConfigSelector() {
  return requestClient.get<{ list: InfraFileConfigApi.FileConfig[] }>(
    '/admin/v1/file_config/select',
  );
}
