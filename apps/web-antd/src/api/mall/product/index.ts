import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ProductApi {
  /** 会员配置 */
  export interface MembershipConfig {
    /** 会员类型编码(normal,vip,svip) */
    membershipType: string;
    /** 时长天数 */
    durationDays: number;
  }
  /** 商品配置 */
  export interface ProductConfig {
    /** 会员配置 */
    membership?: MembershipConfig;
  }

  /** 商品信息 */
  export interface ProductInfo {
    /** ID */
    id: string;
    /** 商品类型(membership:会员,service:服务,goods:商品) */
    productType: string;
    /** 商品名称 */
    productName: string;
    /** 商品描述 */
    productDesc?: string;
    /** 商品图片(多个用逗号分隔) */
    productImages?: string[];
    /** 商品详情(JSON格式,包含特色功能等) */
    productDetail?: string[];
    /** 商品配置(JSON格式) */
    productConfig?: ProductConfig;
    /** 原价 */
    originalPrice: number;
    /** 现价 */
    currentPrice: number;
    /** 库存数量(-1表示无限库存) */
    stockQuantity?: number;
    /** 已售数量 */
    soldQuantity?: number;
    /** 排序 */
    sort?: number;
    /** 状态(-1下架,0待上架,1在售,2售罄) */
    status: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  }
  /** 创建商品请求参数 */
  export interface CreateProductReq {
    /** 商品类型(membership:会员,service:服务,goods:商品) */
    productType: string;
    /** 商品名称 */
    productName: string;
    /** 商品描述 */
    productDesc?: string;
    /** 商品图片(多个用逗号分隔) */
    productImages?: string[];
    /** 商品详情(JSON格式,包含特色功能等) */
    productDetail?: string[];
    /** 商品配置(JSON格式) */
    productConfig?: ProductConfig;
    /** 原价 */
    originalPrice: number;
    /** 现价 */
    currentPrice: number;
    /** 库存数量(-1表示无限库存) */
    stockQuantity?: number;
    /** 已售数量 */
    soldQuantity?: number;
    /** 排序 */
    sort?: number;
    /** 状态(-1下架,0待上架,1在售,2售罄) */
    status: number;
  }

  /** 更新商品请求参数 */
  export interface UpdateProductReq {
    /** ID */
    id: string;
    /** 商品类型(membership:会员,service:服务,goods:商品) */
    productType: string;
    /** 商品名称 */
    productName: string;
    /** 商品描述 */
    productDesc?: string;
    /** 商品图片(多个用逗号分隔) */
    productImages?: string[];
    /** 商品详情(JSON格式,包含特色功能等) */
    productDetail?: string[];
    /** 商品配置(JSON格式) */
    productConfig?: ProductConfig;
    /** 原价 */
    originalPrice: number;
    /** 现价 */
    currentPrice: number;
    /** 库存数量(-1表示无限库存) */
    stockQuantity?: number;
    /** 已售数量 */
    soldQuantity?: number;
    /** 排序 */
    sort?: number;
    /** 状态(-1下架,0待上架,1在售,2售罄) */
    status: number;
  }

  /** 更新商品状态请求参数 */
  export interface UpdateProductStatusReq {
    /** ID */
    id: string;
    /** 状态(-1下架,0待上架,1在售,2售罄) */
    status: number;
  }

  /** 删除商品请求参数 */
  export interface DeleteProductReq {
    /** ID */
    id: string;
  }

  /** 获取商品信息响应 */
  export interface GetProductInfoReply {
    info: ProductInfo;
  }

  /** 创建商品响应 */
  export interface CreateProductReply {
    id: string;
  }

  /** 商品选择器 */
  export interface ProductSelector {
    /** ID */
    id: string;
    /** 商品名称 */
    productName: string;
  }

  /** 获取商品选择器响应 */
  export interface GetProductSelectorReply {
    list: ProductSelector[];
  }
}

/** 商品列表查询参数 */
export interface GetProductListReq extends PageReq {
  /** 商品类型(membership:会员,service:服务,goods:商品) */
  productType?: string;
  /** 商品名称 */
  productName?: string;
}

/** 查询商品列表 */
export function getProductList(params: GetProductListReq) {
  return requestClient.get<PageReply<ProductApi.ProductInfo>>(
    '/admin/v1/mall_product/list',
    {
      params,
    },
  );
}

/** 查询商品详情 */
export function getProductInfo(id: string) {
  return requestClient.get<ProductApi.GetProductInfoReply>(
    '/admin/v1/mall_product/info',
    {
      params: { id },
    },
  );
}

/** 新增商品 */
export function createProduct(data: ProductApi.CreateProductReq) {
  return requestClient.post<ProductApi.CreateProductReply>(
    '/admin/v1/mall_product/create',
    data,
  );
}

/** 修改商品 */
export function updateProduct(data: ProductApi.UpdateProductReq) {
  return requestClient.post('/admin/v1/mall_product/update', data);
}

/** 商品状态修改 */
export function updateProductStatus(data: ProductApi.UpdateProductStatusReq) {
  return requestClient.post('/admin/v1/mall_product/update/status', data);
}

/** 删除商品 */
export function deleteProduct(data: ProductApi.DeleteProductReq) {
  return requestClient.post('/admin/v1/mall_product/delete', data);
}

/** 商品选择器查询参数 */
export interface GetProductSelectorReq {
  /** 搜索商品名称 */
  searchName?: string;
}

/** 查询商品选择器 */
export function getProductSelector(params?: GetProductSelectorReq) {
  return requestClient.get<ProductApi.GetProductSelectorReply>(
    '/admin/v1/mall_product/selector',
    {
      params,
    },
  );
}
