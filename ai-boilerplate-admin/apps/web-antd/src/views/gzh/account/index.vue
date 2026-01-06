<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { MpAccountApi } from '#/api/gzh/account';

import { Page, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  clearAccountQuota,
  deleteAccount,
  generateAccountQrCode,
  getAccountList,
} from '#/api/gzh/account';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Detail from './modules/detail.vue';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: Detail,
  destroyOnClose: true,
});

/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 创建账号 */
function onCreate() {
  formModalApi.setData(null).open();
}

/** 查看详情 */
function onDetail(row: MpAccountApi.Account) {
  detailModalApi.setData(row).open();
}

/** 编辑账号 */
function onEdit(row: MpAccountApi.Account) {
  formModalApi.setData(row).open();
}

/** 删除账号 */
async function onDelete(row: MpAccountApi.Account) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  try {
    await deleteAccount(row.id);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [row.name]),
      key: 'action_process_msg',
    });
    onRefresh();
  } catch {
    hideLoading();
  }
}

/** 生成二维码 */
async function onGenerateQrCode(row: MpAccountApi.Account) {
  const hideLoading = message.loading({
    content: '生成二维码',
    duration: 0,
    key: 'action_process_msg',
  });
  try {
    await generateAccountQrCode(row.id);
    message.success({
      content: '生成二维码成功',
      key: 'action_process_msg',
    });
    onRefresh();
  } catch {
    hideLoading();
  }
}

/** 清空 API 配额 */
async function onClearQuota(row: MpAccountApi.Account) {
  const hideLoading = message.loading({
    content: '清空 API 配额',
    duration: 0,
    key: 'action_process_msg',
  });
  try {
    await clearAccountQuota(row.id);
    message.success({
      content: '清空 API 配额成功',
      key: 'action_process_msg',
    });
  } catch {
    hideLoading();
  }
}

/** 表格操作按钮的回调函数 */
function onActionClick({
  code,
  row,
}: OnActionClickParams<MpAccountApi.Account>) {
  switch (code) {
    case 'clearQuota': {
      onClearQuota(row);
      break;
    }
    case 'delete': {
      onDelete(row);
      break;
    }
    case 'detail': {
      onDetail(row);
      break;
    }
    case 'edit': {
      onEdit(row);
      break;
    }
    case 'generateQrCode': {
      onGenerateQrCode(row);
      break;
    }
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getAccountList({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
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
  } as VxeTableGridOptions<MpAccountApi.Account>,
});
</script>

<template>
  <Page auto-content-height description="公众号账号管理">
    <FormModal @success="onRefresh" />
    <DetailModal />

    <Grid>
      <template #toolbar-tools>
        <Button
          type="primary"
          @click="onCreate"
          v-access:code="['gzh:account:create']"
        >
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', ['公众号账号']) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
