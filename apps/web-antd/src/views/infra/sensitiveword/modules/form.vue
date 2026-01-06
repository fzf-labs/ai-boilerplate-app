<script lang="ts" setup>
import type { SensitiveWordApi } from '#/api/infra/sensitiveword';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createSensitiveWord,
  getSensitiveWordInfo,
  updateSensitiveWord,
} from '#/api/infra/sensitiveword';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<SensitiveWordApi.SensitiveWordInfo>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['敏感词'])
    : $t('ui.actionTitle.create', ['敏感词']);
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
    const data =
      (await formApi.getValues()) as SensitiveWordApi.SensitiveWordInfo;
    try {
      await (formData.value?.id
        ? updateSensitiveWord(data)
        : createSensitiveWord(data));
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
    const data = modalApi.getData<SensitiveWordApi.SensitiveWordInfo>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      const { info } = await getSensitiveWordInfo(data.id);
      formData.value = info;
      // 设置到 values
      await formApi.setValues(formData.value as Record<string, any>);
    } finally {
      modalApi.lock(false);
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
