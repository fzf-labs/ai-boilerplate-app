<script lang="ts" setup>
import type { WxGzhTagApi } from '#/api/gzh/tag';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createWxGzhTag, getWxGzhTagInfo, updateWxGzhTag } from '#/api/gzh/tag';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

interface Props {
  appId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['success']);

const formData = ref<WxGzhTagApi.WxGzhTagInfo>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['标签'])
    : $t('ui.actionTitle.create', ['标签']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 120,
  },
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
    const data = (await formApi.getValues()) as WxGzhTagApi.WxGzhTagInfo;
    // 设置 appId
    if (props.appId) {
      data.appId = props.appId;
    }
    try {
      await (formData.value?.id ? updateWxGzhTag(data) : createWxGzhTag(data));
      // 关闭并提示
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    // 加载数据
    const data = modalApi.getData<{
      appId: string;
      row?: WxGzhTagApi.WxGzhTagInfo;
    }>();
    if (!data || !data.appId) {
      return;
    }

    // 设置 appId 到表单
    await formApi.setValues({ appId: data.appId });

    // 如果有 row 数据，说明是编辑模式
    if (data.row) {
      modalApi.lock();
      try {
        const res = await getWxGzhTagInfo(data.row.id);
        formData.value = res.info;
        // 设置到 values
        await formApi.setValues(formData.value);
      } finally {
        modalApi.unlock();
      }
    }
  },
});
</script>

<template>
  <Modal class="w-2/5" :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
