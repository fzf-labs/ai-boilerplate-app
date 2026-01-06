<script lang="ts" setup>
import type { SystemMenuApi } from '#/api/system/menu';
import type { SystemRoleApi } from '#/api/system/role';

import { computed, ref } from 'vue';

import { useVbenModal, VbenTree } from '@vben/common-ui';
import { handleTree } from '@vben/utils';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getMenuList } from '#/api/system/menu';
import { createRole, getRoleInfo, updateRole } from '#/api/system/role';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<SystemRoleApi.Role>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['角色'])
    : $t('ui.actionTitle.create', ['角色']);
});

const menuTree = ref<SystemMenuApi.Menu[]>([]); // 菜单树
const menuLoading = ref(false); // 加载菜单列表

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
    const data = (await formApi.getValues()) as SystemRoleApi.Role;
    try {
      await (formData.value?.id ? updateRole(data) : createRole(data));
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
    // 加载菜单列表
    await loadMenuTree();
    // 加载数据
    const data = modalApi.getData<SystemRoleApi.Role>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      const res = await getRoleInfo(data.id);
      formData.value = res.info;
      // 设置到 values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.lock(false);
    }
  },
});

/** 加载菜单树 */
async function loadMenuTree() {
  menuLoading.value = true;
  try {
    const data = await getMenuList();
    menuTree.value = handleTree(data.list) as SystemMenuApi.Menu[];
  } finally {
    menuLoading.value = false;
  }
}
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4">
      <template #menuIds="slotProps">
        <VbenTree
          class="max-h-[400px] overflow-y-auto"
          :loading="menuLoading"
          :tree-data="menuTree"
          multiple
          bordered
          v-bind="slotProps"
          value-field="id"
          label-field="name"
        />
      </template>
    </Form>
  </Modal>
</template>
