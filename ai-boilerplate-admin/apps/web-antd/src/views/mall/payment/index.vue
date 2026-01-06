<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { PaymentApi } from '#/api/mall/payment';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getPaymentRecordListByOrderId } from '#/api/mall/payment';

import { useGridColumns, useGridFormSchema } from './data';
import DetailModal from './modules/detail.vue';

const [DetailModalComponent, detailModalApi] = useVbenModal({
  connectedComponent: DetailModal,
  destroyOnClose: true,
});

/** 查看支付记录详情 */
function onView(row: PaymentApi.PaymentRecordInfo) {
  detailModalApi.setData(row).open();
}

/** 表格操作按钮的回调函数 */
function onActionClick({
  code,
  row,
}: OnActionClickParams<PaymentApi.PaymentRecordInfo>) {
  switch (code) {
    case 'view': {
      onView(row);
      break;
    }
  }
}

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page: _page }, formValues) => {
          // For demo purposes, using existing API if orderId is provided
          if (formValues.orderId) {
            return await getPaymentRecordListByOrderId(formValues.orderId);
          }
          // Return empty result for now
          return { list: [], total: 0 };
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    showOverflow: 'tooltip',
    size: 'small',
    stripe: true,
    border: true,
    toolbarConfig: {
      refresh: { code: 'query' },
      search: true,
    },
  } as VxeTableGridOptions<PaymentApi.PaymentRecordInfo>,
});
</script>

<template>
  <Page
    auto-content-height
    description="支付记录管理用于根据订单ID查询相关的支付记录信息。"
  >
    <DetailModalComponent />

    <Grid table-title="支付记录列表" />
  </Page>
</template>
