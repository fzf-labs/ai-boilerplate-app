import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { useAccess } from '@vben/access';

import { getAccountSelector } from '#/api/gzh/account';
import { MpAutoReplyApi } from '#/api/gzh/autoReply';
import { CommonStatusEnum } from '#/utils/constants';

const { hasAccessByCodes } = useAccess();

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'appId',
      label: '公众号',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'type',
      label: '回复类型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '关键词回复', value: MpAutoReplyApi.AutoReplyType.KEYWORD },
          {
            label: '收到消息回复',
            value: MpAutoReplyApi.AutoReplyType.MESSAGE,
          },
          {
            label: '被关注回复',
            value: MpAutoReplyApi.AutoReplyType.SUBSCRIBE,
          },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      dependencies: {
        triggerFields: ['id'],
        componentProps: (values) => ({
          disabled: !!values.id, // 有id表示编辑模式，禁用类型选择
        }),
      },
      rules: 'required',
      defaultValue: MpAutoReplyApi.AutoReplyType.KEYWORD,
      help: '提示：被关注回复和收到消息回复每个公众号只能设置一个，关键词回复可以设置多个。编辑时不能修改回复类型。',
    },
    {
      fieldName: 'requestKeyword',
      label: '请求关键字',
      component: 'Input',
      componentProps: {
        placeholder: '请输入关键字',
      },
      help: '用户发送此关键字时触发自动回复',
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type === MpAutoReplyApi.AutoReplyType.KEYWORD,
      },
      rules: 'required',
    },
    {
      fieldName: 'requestKeywordMatch',
      label: '关键字匹配类型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '全匹配', value: MpAutoReplyApi.KeywordMatchType.EXACT },
          { label: '半匹配', value: MpAutoReplyApi.KeywordMatchType.PARTIAL },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type === MpAutoReplyApi.AutoReplyType.KEYWORD,
      },
      rules: 'required',
      defaultValue: MpAutoReplyApi.KeywordMatchType.EXACT,
    },
    {
      fieldName: 'responseMessageType',
      label: '回复消息类型',
      component: 'Select',
      componentProps: {
        placeholder: '请选择回复消息类型',
        options: [
          { label: '文本消息', value: MpAutoReplyApi.ResponseMessageType.TEXT },
          {
            label: '图片消息',
            value: MpAutoReplyApi.ResponseMessageType.IMAGE,
          },
          {
            label: '音频消息',
            value: MpAutoReplyApi.ResponseMessageType.VOICE,
          },
          {
            label: '视频消息',
            value: MpAutoReplyApi.ResponseMessageType.VIDEO,
          },
        ],
      },
      rules: 'required',
      defaultValue: MpAutoReplyApi.ResponseMessageType.TEXT,
    },
    {
      fieldName: 'responseContent',
      label: '回复内容',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入回复内容',
        rows: 4,
        maxlength: 500,
        showCount: true,
      },
      dependencies: {
        triggerFields: ['responseMessageType'],
        show: (values) =>
          values.responseMessageType ===
          MpAutoReplyApi.ResponseMessageType.TEXT,
      },
      rules: 'required',
    },
    {
      fieldName: 'responseMediaId',
      label: '媒体文件ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入媒体文件ID',
      },
      help: '图片、语音、视频、音乐、图文消息需要提供媒体文件ID',
      dependencies: {
        triggerFields: ['responseMessageType'],
        show: (values) =>
          values.responseMessageType !==
          MpAutoReplyApi.ResponseMessageType.TEXT,
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '启用', value: CommonStatusEnum.ENABLE },
          { label: '禁用', value: CommonStatusEnum.DISABLE },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      defaultValue: CommonStatusEnum.ENABLE,
    },
  ];
}

/** 搜索表单配置 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'appId',
      label: '公众号',
      component: 'ApiSelect',
      componentProps: () => ({
        api: async () => await getAccountSelector(),
        resultField: 'list',
        labelField: 'name',
        valueField: 'appId',
        placeholder: '请选择公众号',
        autoSelect: 'first',
      }),
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: '回复类型',
      component: 'Select',
      componentProps: {
        placeholder: '请选择回复类型',
        options: [
          { label: '关键词回复', value: MpAutoReplyApi.AutoReplyType.KEYWORD },
          {
            label: '收到消息回复',
            value: MpAutoReplyApi.AutoReplyType.MESSAGE,
          },
          {
            label: '被关注回复',
            value: MpAutoReplyApi.AutoReplyType.SUBSCRIBE,
          },
        ],
      },
    },
  ];
}

/** 表格列配置 */
export function useGridColumns<T = MpAutoReplyApi.AutoReply>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      title: '回复类型',
      field: 'type',
      width: 120,
      formatter: ({ cellValue }) => {
        switch (cellValue) {
          case 1: {
            return '关键词回复';
          }
          case 2: {
            return '收到消息回复';
          }
          case 3: {
            return '被关注回复';
          }
          default: {
            return '';
          }
        }
      },
    },
    {
      title: '请求关键字',
      field: 'requestKeyword',
      width: 150,
      formatter: ({ cellValue, row }) => {
        if (row.type === MpAutoReplyApi.AutoReplyType.KEYWORD) {
          return cellValue || '-';
        }
        return '-';
      },
    },
    {
      title: '匹配类型',
      field: 'requestKeywordMatch',
      width: 100,
      formatter: ({ cellValue, row }) => {
        if (row.type === MpAutoReplyApi.AutoReplyType.KEYWORD) {
          switch (cellValue) {
            case 1: {
              return '全匹配';
            }
            case 2: {
              return '半匹配';
            }
            default: {
              return '-';
            }
          }
        }
        return '-';
      },
    },
    {
      title: '消息类型',
      field: 'responseMessageType',
      width: 120,
      formatter: ({ cellValue }) => {
        switch (cellValue) {
          case 'image': {
            return '图片消息';
          }
          case 'text': {
            return '文本消息';
          }
          case 'video': {
            return '视频消息';
          }
          case 'voice': {
            return '音频消息';
          }
          default: {
            return cellValue || '-';
          }
        }
      },
    },
    {
      field: 'status',
      title: '状态',
      minWidth: 100,
      formatter: (row) => {
        return row.cellValue === 1 ? '启用' : '禁用';
      },
    },
    {
      title: '创建时间',
      field: 'createdAt',
      width: 180,
      formatter: 'formatDateTime',
    },
    {
      title: '更新时间',
      field: 'updatedAt',
      width: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'operation',
      title: '操作',
      minWidth: 180,
      fixed: 'right',
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'id',
          nameTitle: '自动回复',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'view',
            text: '查看',
            show: hasAccessByCodes(['gzh:auto-reply:query']),
          },
          {
            code: 'edit',
            text: '编辑',
            show: hasAccessByCodes(['gzh:auto-reply:update']),
          },
          {
            code: 'delete',
            text: '删除',
            show: hasAccessByCodes(['gzh:auto-reply:delete']),
          },
        ],
      },
    },
  ];
}
