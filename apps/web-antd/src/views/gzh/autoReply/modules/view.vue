<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { formatDateTime } from '@vben/utils';

import { Descriptions, Tag } from 'ant-design-vue';

import { getAutoReplyInfo, MpAutoReplyApi } from '#/api/gzh/autoReply';
import { $t } from '#/locales';
import { CommonStatusEnum } from '#/utils/constants';

const autoReplyData = ref<MpAutoReplyApi.AutoReply>();

const getTitle = computed(() => {
  return $t('ui.actionTitle.view', ['自动回复']);
});

// 获取回复类型文本
const getTypeText = computed(() => {
  if (!autoReplyData.value) return '';
  switch (autoReplyData.value.type) {
    case MpAutoReplyApi.AutoReplyType.KEYWORD: {
      return '关键词回复';
    }
    case MpAutoReplyApi.AutoReplyType.MESSAGE: {
      return '收到消息回复';
    }
    case MpAutoReplyApi.AutoReplyType.SUBSCRIBE: {
      return '被关注回复';
    }
    default: {
      return '';
    }
  }
});

// 获取匹配类型文本
const getMatchTypeText = computed(() => {
  if (
    !autoReplyData.value ||
    autoReplyData.value.type !== MpAutoReplyApi.AutoReplyType.KEYWORD
  ) {
    return '-';
  }
  switch (autoReplyData.value.requestKeywordMatch) {
    case MpAutoReplyApi.KeywordMatchType.EXACT: {
      return '全匹配';
    }
    case MpAutoReplyApi.KeywordMatchType.PARTIAL: {
      return '半匹配';
    }
    default: {
      return '-';
    }
  }
});

// 获取消息类型文本
const getMessageTypeText = computed(() => {
  if (!autoReplyData.value) return '';
  switch (autoReplyData.value.responseMessageType) {
    case MpAutoReplyApi.ResponseMessageType.IMAGE: {
      return '图片消息';
    }
    case MpAutoReplyApi.ResponseMessageType.TEXT: {
      return '文本消息';
    }
    case MpAutoReplyApi.ResponseMessageType.VIDEO: {
      return '视频消息';
    }
    case MpAutoReplyApi.ResponseMessageType.VOICE: {
      return '音频消息';
    }
    default: {
      return autoReplyData.value.responseMessageType || '-';
    }
  }
});

// 获取状态标签
const getStatusTag = computed(() => {
  if (!autoReplyData.value) return null;
  return autoReplyData.value.status === CommonStatusEnum.ENABLE
    ? { color: 'green', text: '启用' }
    : { color: 'red', text: '禁用' };
});

const [Modal, modalApi] = useVbenModal({
  showConfirmButton: false, // 隐藏确认按钮
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      autoReplyData.value = undefined;
      return;
    }

    // 加载数据
    const data = modalApi.getData<MpAutoReplyApi.AutoReply>();
    if (!data || !data.id) {
      return;
    }

    modalApi.lock();
    try {
      const res = await getAutoReplyInfo(data.id);
      autoReplyData.value = res.info;
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal class="w-3/5" :title="getTitle">
    <div class="p-4">
      <Descriptions
        v-if="autoReplyData"
        :column="2"
        bordered
        size="middle"
        :label-style="{ width: '120px', fontWeight: 'bold' }"
      >
        <Descriptions.Item label="回复类型">
          <Tag color="blue">{{ getTypeText }}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="状态">
          <Tag :color="getStatusTag?.color">{{ getStatusTag?.text }}</Tag>
        </Descriptions.Item>

        <Descriptions.Item
          v-if="autoReplyData.type === MpAutoReplyApi.AutoReplyType.KEYWORD"
          label="请求关键字"
        >
          {{ autoReplyData.requestKeyword || '-' }}
        </Descriptions.Item>

        <Descriptions.Item
          v-if="autoReplyData.type === MpAutoReplyApi.AutoReplyType.KEYWORD"
          label="匹配类型"
        >
          <Tag color="orange">{{ getMatchTypeText }}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="回复消息类型">
          <Tag color="purple">{{ getMessageTypeText }}</Tag>
        </Descriptions.Item>

        <Descriptions.Item
          v-if="
            autoReplyData.responseMessageType ===
            MpAutoReplyApi.ResponseMessageType.TEXT
          "
          label="回复内容"
          :span="2"
        >
          <div class="max-h-32 overflow-y-auto rounded border bg-gray-50 p-2">
            {{ autoReplyData.responseContent || '-' }}
          </div>
        </Descriptions.Item>

        <Descriptions.Item
          v-if="
            autoReplyData.responseMessageType !==
            MpAutoReplyApi.ResponseMessageType.TEXT
          "
          label="媒体文件ID"
          :span="2"
        >
          {{ autoReplyData.responseMediaId || '-' }}
        </Descriptions.Item>

        <Descriptions.Item label="创建时间">
          {{ formatDateTime(autoReplyData.createdAt) || '-' }}
        </Descriptions.Item>

        <Descriptions.Item label="更新时间">
          {{ formatDateTime(autoReplyData.updatedAt) || '-' }}
        </Descriptions.Item>
      </Descriptions>

      <div v-else class="py-8 text-center text-gray-500">加载中...</div>
    </div>
  </Modal>
</template>

<style scoped>
:deep(.ant-descriptions-item-label) {
  background-color: #fafafa;
}

:deep(.ant-descriptions-item-content) {
  word-break: break-all;
}
</style>
