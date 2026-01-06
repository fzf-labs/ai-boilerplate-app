import type { PageReply, PageReq } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OrderApi {
  /** 订单信息 */
  export interface OrderInfo {
    /** ID */
    id: string;
    /** 用户ID */
    userId: string;
    /** 商品类型(membership:会员,service:服务,goods:商品) */
    productType: string;
    /** 商品ID */
    productId: string;
    /** 原价 */
    originalAmount: number;
    /** 优惠金额 */
    discountAmount: number;
    /** 实付金额 */
    actualAmount: number;
    /** 退款金额 */
    refundAmount: number;
    /** 币种 */
    currency: string;
    /** 支付方式(微信,支付宝) */
    paymentMethod: string;
    /** 支付状态(0待支付,1已支付,2支付失败,3已退款) */
    paymentStatus: number;
    /** 支付时间 */
    paymentTime?: string;
    /** 确认时间 */
    deliveryTime?: string;
    /** 订单过期时间 */
    expiredTime?: string;
    /** 备注 */
    remark?: string;
    /** 状态(待付款pendingPayment,待发货pendingDelivery,待收货pendingReceipt,已完成completed,已取消canceled,已退款refunded) */
    status: string;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  }

  /** 获取订单信息响应 */
  export interface GetOrderInfoReply {
    info: OrderInfo;
  }
}

/** 订单列表查询参数 */
export interface GetOrderListReq extends PageReq {
  /** 用户ID */
  userId?: string;
  /** 订单ID */
  orderId?: string;
  /** 商品类型(membership:会员,service:服务,goods:商品) */
  productType?: string;
  /** 商品ID */
  productId?: string;
}

/** 查询订单列表 */
export function getOrderList(params: GetOrderListReq) {
  return requestClient.get<PageReply<OrderApi.OrderInfo>>(
    '/admin/v1/mall_order/list',
    {
      params,
    },
  );
}

/** 查询订单详情 */
export function getOrderInfo(id: string) {
  return requestClient.get<OrderApi.GetOrderInfoReply>(
    '/admin/v1/mall_order/info',
    {
      params: { id },
    },
  );
}
