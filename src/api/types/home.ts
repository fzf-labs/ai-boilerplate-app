/**
 * 首页相关接口类型定义
 */

/**
 * 轮播图项
 */
export interface IBannerItem {
  /** 轮播图ID */
  id: number
  /** 图片URL */
  imageUrl: string
  /** 跳转链接 */
  linkUrl?: string
  /** 标题 */
  title?: string
  /** 排序 */
  sort: number
}

/**
 * 获取轮播图列表响应
 */
export interface IGetBannerListRes {
  list: IBannerItem[]
}

/**
 * 内容项
 */
export interface IContentItem {
  /** 内容ID */
  id: number
  /** 标题 */
  title: string
  /** 摘要 */
  summary: string
  /** 封面图 */
  coverImage: string
  /** 发布时间 */
  publishTime: string
  /** 标签 */
  tags?: string[]
  /** 是否推荐 */
  isRecommend?: boolean
  /** 是否热门 */
  isHot?: boolean
}

/**
 * 获取内容列表请求参数
 */
export interface IGetContentListReq {
  /** 页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

/**
 * 获取内容列表响应
 */
export interface IGetContentListRes {
  /** 内容列表 */
  list: IContentItem[]
  /** 总数 */
  total: number
  /** 当前页 */
  page: number
  /** 每页数量 */
  pageSize: number
}
