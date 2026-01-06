import type { IGetBannerListRes, IGetContentListReq, IGetContentListRes } from './types/home'
import { http } from '@/http/http'

/**
 * 获取首页轮播图列表
 */
export function getBannerList() {
  return http.get<IGetBannerListRes>('/home/banner/list')
}

/**
 * 获取首页内容列表
 * @param params 分页参数
 */
export function getContentList(params: IGetContentListReq) {
  return http.get<IGetContentListRes>('/home/content/list', { params })
}

/**
 * 获取内容详情
 * @param id 内容ID
 */
export function getContentDetail(id: number) {
  return http.get(`/home/content/detail/${id}`)
}
