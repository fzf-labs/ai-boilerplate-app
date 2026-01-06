import { requestClient } from '#/api/request';

export namespace MpMenuApi {
  /** 新闻条目 */
  export interface NewsItem {
    title: string; // 标题
    author: string; // 作者
    digest: string; // 摘要
    show_cover: number; // 是否显示封面
    cover_url: string; // 封面URL
    content_url: string; // 内容URL
    source_url: string; // 来源URL
  }
  /** 新闻信息 */
  export interface NewsInfo {
    list: NewsItem[];
  }
  /** 按钮项 */
  export interface ButtonItem {
    type: string; // 按钮类型
    name: string; // 按钮名称
    url?: string; // URL（可选）
    appid?: string; // 小程序appid（可选）
    pagepath?: string; // 小程序页面路径（可选）
    key?: string; // 按钮key（可选）
    value?: string; // 按钮值（可选）
    news_info?: NewsInfo; // 新闻信息（可选）
  }

  /** 子按钮 */
  export interface SubButton {
    list: ButtonItem[];
  }

  /** 自定义按钮 */
  export interface SelfButton {
    type: string; // 按钮类型
    name: string; // 按钮名称
    key?: string; // 按钮key
    value?: string; // 按钮值（可选）
    url?: string; // URL（可选）
    sub_button?: SubButton; // 子按钮（可选）
  }
  /** 自定义按钮列表 */
  export interface SelfmenuInfo {
    button: SelfButton[];
  }
  /** 菜单信息 */
  export interface Menu {
    id: string;
    appId: string;
    isMenuOpen: number;
    selfmenuInfo: SelfmenuInfo;
    createdAt: string;
    updateAt: string;
  }
  /** 保存菜单信息 */
  export interface StoreMenuInfoReq {
    appId: string;
    selfmenuInfo: SelfmenuInfo;
  }
  export interface GetMenuInfoReply {
    info: Menu;
  }
}

/** 查询菜单信息 */
export function getMenuInfo(appId: string) {
  return requestClient.get<MpMenuApi.GetMenuInfoReply>(
    '/admin/v1/wx_gzh_menu/info',
    {
      params: { appId },
    },
  );
}

/** 保存菜单 */
export function storeMenu(req: MpMenuApi.StoreMenuInfoReq) {
  return requestClient.post('/admin/v1/wx_gzh_menu/store', req);
}

/** 删除菜单 */
export function deleteMenu(appId: string) {
  return requestClient.post('/admin/v1/wx_gzh_menu/delete', {
    params: { appId },
  });
}
