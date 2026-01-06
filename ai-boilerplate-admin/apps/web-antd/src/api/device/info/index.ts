import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace DeviceApi {
  /** 设备推送信息 */
  export interface DevicePush {
    channelID: string; // 推送通道ID
  }
  /** 设备信息 */
  export interface DeviceInfo {
    id: string; // ID
    sn: string; // 设备ID
    name: string; // 设备名称
    desc: string; // 描述
    brand: string; // 设备品牌
    model: string; // 设备型号
    network: string; // 入网型号
    imei: string; // IMEI
    CPU: string; // cpu型号
    mac: string; // mac地址
    appVersion: string; // app版本
    androidVersion: string; // 安卓版本
    RAMSize: number; // RAM大小
    ddrSize: number; // DDR大小
    certificate: string; // 设备证书
    secureKey: string; // 设备密钥
    registryTime: string; // 激活时间
    push: DevicePush; // 推送
    status: number; // 状态
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
    online: boolean; // 是否在线
  }
  /** 更新设备状态请求 */
  export interface UpdateDeviceStatusReq {
    sn: string; // 设备序列号
    status: number; // 状态
  }

  /** 获取设备信息响应 */
  export interface GetDeviceInfoReply {
    info: DeviceInfo;
  }

  /** 获取在线设备数量响应 */
  export interface GetOnlineDeviceCountReply {
    count: string; // 在线设备数量
  }
}

/** 注册设备 */
export function registerDevice(sn: string) {
  return requestClient.post('/admin/v1/device/register', { sn });
}

/** 获取设备信息 */
export function getDeviceInfo(sn: string) {
  return requestClient.get<DeviceApi.GetDeviceInfoReply>(
    `/admin/v1/device/info?sn=${sn}`,
  );
}

/** 获取设备列表 */
export function getDeviceList(data: PageReq) {
  return requestClient.post<PageReply<DeviceApi.DeviceInfo>>(
    '/admin/v1/device/list',
    data,
  );
}
/** 删除设备 */
export function deleteDevice(sn: string) {
  return requestClient.post('/admin/v1/device/delete', { sn });
}

/** 更新设备状态 */
export function updateDeviceStatus(data: DeviceApi.UpdateDeviceStatusReq) {
  return requestClient.post('/admin/v1/device/update/status', data);
}

/** 获取在线设备数量 */
export function getOnlineDeviceCount() {
  return requestClient.get<DeviceApi.GetOnlineDeviceCountReply>(
    '/admin/v1/device/online/count',
  );
}
