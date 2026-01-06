import type { AxiosRequestConfig, PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

/** Axios 上传进度事件 */
export type AxiosProgressEvent = AxiosRequestConfig['onUploadProgress'];

export namespace InfraFileApi {
  /** 文件信息 */
  export interface File {
    id: string;
    configId: string;
    path: string;
    name: string;
    URL: string; // 注意：Swagger中是URL大写
    ext: string; // 文件类型
    size: number;
    status: number; // 状态（-1失败,1未知,2成功）
    createdAt: string;
    updatedAt: string;
  }

  /** 阿里云上传策略 */
  export interface AliyunPolicy {
    policy: string;
    securityToken: string;
    signatureVersion: string;
    credential: string;
    date: string;
    signature: string;
    host: string;
    dir: string;
    callback: string;
  }

  /** 腾讯云上传策略 */
  export interface TencentPolicy {
    tmpSecretId: string;
    tmpSecretKey: string;
    sessionToken: string;
  }

  /** 七牛云上传策略 */
  export interface QiniuPolicy {
    token: string;
  }

  /** 火山云上传策略 */
  export interface VolcenginePolicy {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    endpoint: string;
    region: string;
    bucket: string;
    customDomain: string;
  }

  /** OSS默认上传策略响应 */
  export interface UploadFileOSSDefaultPolicyReply {
    fileId: string;
    storage: string; // 存储引擎 volcengine | tencent | aliyun | qiniu
    volcengine?: VolcenginePolicy;
    tencent?: TencentPolicy;
    aliyun?: AliyunPolicy;
    qiniu?: QiniuPolicy;
  }

  /** 上传文件请求 */
  export interface FileUploadReqVO {
    file: globalThis.File;
    path?: string;
  }

  /** 删除文件请求 */
  export interface DeleteFileDatumReq {
    id: string;
  }

  /** 获取文件列表请求 */
  export interface GetFileDatumListReq extends PageReq {
    configId?: string; // 配置编号
    name?: string; // 文件名搜索
    path?: string; // 文件路径
    status?: number; // 状态（-1失败,1未知,2成功）
  }
}

/** 查询文件列表 */
export function getFileList(params: InfraFileApi.GetFileDatumListReq) {
  return requestClient.get<PageReply<InfraFileApi.File>>(
    '/admin/v1/file_data/list',
    {
      params,
    },
  );
}

/** 删除文件 */
export function deleteFile(data: InfraFileApi.DeleteFileDatumReq) {
  return requestClient.post('/admin/v1/file_data/delete', data);
}

/** 获取文件信息 */
export function getFileInfo(id: string) {
  return requestClient.get<{ info: InfraFileApi.File }>(
    '/admin/v1/file_data/info',
    {
      params: { id },
    },
  );
}

/** 获取OSS默认上传策略 */
export function getOSSDefaultPolicy(name: string, path: string, size?: number) {
  return requestClient.get<InfraFileApi.UploadFileOSSDefaultPolicyReply>(
    '/admin/v1/file_data/upload/oss_default_policy',
    {
      params: { name, path, size },
    },
  );
}
