import { requestClient } from '#/api/request';

export namespace PaymentApi {
  /** 支付记录信息 */
  export interface PaymentRecordInfo {
    /** ID */
    id: string;
    /** 订单ID */
    orderId: string;
    /** 交易流水号 */
    transactionId: string;
    /** 支付渠道(wechat,alipay) */
    paymentChannel: string;
    /** 支付方式(mini_program,h5,native,jsapi) */
    paymentMethod: string;
    /** 支付金额 */
    amount: number;
    /** 币种 */
    currency: string;
    /** 支付状态(0待支付,1支付成功,2支付失败,3已退款) */
    paymentStatus: number;
    /** 第三方订单号 */
    thirdPartyOrderNo: string;
    /** 第三方交易号 */
    thirdPartyTransactionId: string;
    /** 回调数据 */
    callbackData?: string;
    /** 回调时间 */
    callbackTime?: string;
    /** 错误代码 */
    errorCode?: string;
    /** 错误信息 */
    errorMessage?: string;
    /** 状态(-1无效,1正常) */
    status: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  }

  /** 根据订单ID获取支付记录列表响应 */
  export interface GetPaymentRecordListByOrderIdReply {
    list: PaymentRecordInfo[];
  }

  /** 根据订单ID获取成功支付记录响应 */
  export interface GetPaymentRecordSuccessByOrderIdReply {
    info: PaymentRecordInfo;
  }
}

/** 根据订单ID查询支付记录列表 */
export function getPaymentRecordListByOrderId(orderId: string) {
  return requestClient.get<PaymentApi.GetPaymentRecordListByOrderIdReply>(
    '/admin/v1/mall_payment_record/success/list/order_id',
    {
      params: { orderId },
    },
  );
}

/** 根据订单ID查询成功支付记录 */
export function getPaymentRecordSuccessByOrderId(orderId: string) {
  return requestClient.get<PaymentApi.GetPaymentRecordSuccessByOrderIdReply>(
    '/admin/v1/mall_payment_record/success/order_id',
    {
      params: { orderId },
    },
  );
}
