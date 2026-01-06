<script lang="ts" setup>
import type { ProductApi } from '#/api/mall/product';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createProduct,
  getProductInfo,
  updateProduct,
} from '#/api/mall/product';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<ProductApi.ProductInfo>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['商品'])
    : $t('ui.actionTitle.create', ['商品']);
});

const [Form, formApi] = useVbenForm({
  layout: 'horizontal',
  schema: useFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    // 提交表单
    const rawData = (await formApi.getValues()) as any;

    // 处理数据格式转换
    const data: ProductApi.CreateProductReq | ProductApi.UpdateProductReq = {
      ...rawData,
      // 确保数字类型字段正确
      originalPrice: Number(rawData.originalPrice),
      currentPrice: Number(rawData.currentPrice),
      stockQuantity: rawData.stockQuantity
        ? Number(rawData.stockQuantity)
        : undefined,
      soldQuantity: rawData.soldQuantity
        ? Number(rawData.soldQuantity)
        : undefined,
      sort: rawData.sort ? Number(rawData.sort) : undefined,
      status: Number(rawData.status),
    };

    try {
      await (formData.value?.id
        ? updateProduct(data as ProductApi.UpdateProductReq)
        : createProduct(data as ProductApi.CreateProductReq));
      // 关闭并提示
      await modalApi.close();
      emit('success');
      message.success({
        content: $t('ui.actionMessage.operationSuccess'),
        key: 'action_process_msg',
      });
    } finally {
      modalApi.lock(false);
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    // 加载数据
    const data = modalApi.getData<ProductApi.ProductInfo>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      const res = await getProductInfo(data.id);
      formData.value = res.info;
      // 处理数据格式，转换为表单可用的格式
      const formValues = {
        ...formData.value,
        // 确保数字类型字段正确转换
        originalPrice: Number(formData.value.originalPrice),
        currentPrice: Number(formData.value.currentPrice),
        stockQuantity: formData.value.stockQuantity
          ? Number(formData.value.stockQuantity)
          : undefined,
        soldQuantity: formData.value.soldQuantity
          ? Number(formData.value.soldQuantity)
          : undefined,
        sort: formData.value.sort ? Number(formData.value.sort) : undefined,
        status: Number(formData.value.status),
      };

      // 设置到 values
      await formApi.setValues(formValues);
    } finally {
      modalApi.lock(false);
    }
  },
});
</script>

<template>
  <Modal :title="getTitle" :width="1000">
    <Form class="mx-4" />
  </Modal>
</template>
