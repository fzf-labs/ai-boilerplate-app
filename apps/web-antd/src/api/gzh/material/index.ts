import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

/** 素材类型枚举 */
export enum MaterialType {
  IMAGE = 'image', // 图片
  VIDEO = 'video', // 视频
  VOICE = 'voice', // 语音
}

/** 素材类型标签映射 */
export const MaterialTypeLabels = {
  [MaterialType.IMAGE]: '图片',
  [MaterialType.VOICE]: '音频',
  [MaterialType.VIDEO]: '视频',
};

export namespace MpMaterialApi {
  /** 素材信息 */
  export interface Material {
    id: string;
    appId: string;
    type: MaterialType;
    mediaId: string;
    tags: string[];
    updateTime: Date;
    name: string;
    URL: string;
    coverURL: string;
    description: string;
    newcat: string;
    newsubcat: string;
    vid: string;
    createdAt: Date;
    updatedAt: Date;
  }

  /** 素材上传参数 */
  export interface MaterialUploadReq {
    appId: string;
    type: MaterialType;
    file: File;
    name?: string;
    remark?: string;
  }

  /** 素材上传响应 */
  export interface MaterialUploadReply {
    id: string;
    mediaId: string;
    url: string;
  }

  /** 素材统计信息 */
  export interface MaterialStats {
    totalCount: number;
    imageCount: number;
    voiceCount: number;
    videoCount: number;
    newsCount: number;
  }
}

/** 查询素材列表 */
export function getMaterialList(params: PageReq) {
  return requestClient.get<PageReply<MpMaterialApi.Material>>(
    '/admin/v1/wx_gzh_material/list',
    {
      params,
    },
  );
}

/** 获取素材详情 */
export function getMaterialInfo(id: string) {
  return requestClient.get<{ info: MpMaterialApi.Material }>(
    `/admin/v1/wx_gzh_material/info?id=${id}`,
  );
}

/** 上传永久素材 */
export function uploadMaterial(data: FormData) {
  return requestClient.post<MpMaterialApi.MaterialUploadReply>(
    '/admin/v1/wx_gzh_material/upload',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

/** 删除永久素材 */
export function deleteMaterial(ids: string[]) {
  return requestClient.post('/admin/v1/wx_gzh_material/delete', {
    ids,
  });
}

/** 获取素材统计信息 */
export function getMaterialStats(appId: string) {
  return requestClient.get<MpMaterialApi.MaterialStats>(
    '/admin/v1/wx_gzh_material/stats',
    {
      params: { appId },
    },
  );
}

/** 同步微信素材 */
export function syncWechatMaterial(appId: string) {
  return requestClient.post('/admin/v1/wx_gzh_material/sync', {
    appId,
  });
}
