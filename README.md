# AI Boilerplate Frontend

## 项目介绍

AI Boilerplate Frontend 是一个基于 Vue 3 和 Ant Design Vue 的现代化管理系统前端框架，专为企业级中后台应用设计。项目基于 Monorepo 架构，采用 pnpm workspace 管理多包结构，具有高度的可扩展性、可维护性和性能优势。

本项目支持多语言国际化、动态路由、权限管理、组件封装等企业级应用所需的核心功能，并且提供了良好的开发体验和代码组织结构。

## 技术栈

- **核心框架**: Vue 3 + TypeScript
- **UI 组件库**: Ant Design Vue
- **状态管理**: Pinia
- **构建工具**: Vite
- **包管理**: pnpm + workspace (Monorepo)
- **HTTP 客户端**: 基于 Axios 的封装
- **路由管理**: Vue Router
- **国际化**: i18n
- **工具库**: VueUse, dayjs
- **CSS 预处理器**: PostCSS

## 功能特性

- **用户认证**: 登录、登出、刷新令牌、权限验证
- **多语言支持**: 中文、英语等多语言动态切换
- **动态路由**: 基于权限的动态菜单和路由生成
- **权限管理**: 细粒度的按钮/功能点权限控制
- **主题定制**: 可配置的界面主题与布局
- **组件封装**: 表单、表格、上传、弹窗等高频组件的二次封装
- **系统管理**:
  - 用户管理
  - 角色权限
  - 部门管理
  - 菜单管理
  - 字典管理
  - 系统配置
  - 操作日志
  - 登录日志
- **通知中心**: 站内信、公告、邮件、短信等通知管理
- **租户管理**: 多租户支持
- **第三方集成**: OAuth2 认证、社交账号登录

## 项目结构

```
ai-boilerplate-frontend/
├── apps/                # 应用目录
│   └── web-antd/        # 基于Ant Design Vue的Web应用
│
├── packages/            # 共享包
│   ├── @core/           # 核心功能模块
│   ├── constants/       # 常量定义
│   ├── effects/         # 副作用相关功能 (UI组件、布局、钩子等)
│   ├── icons/           # 图标库
│   ├── locales/         # 国际化文件
│   ├── preferences/     # 应用偏好设置
│   ├── stores/          # 状态管理
│   ├── styles/          # 样式库
│   ├── types/           # 类型定义
│   └── utils/           # 工具函数
│
├── internal/            # 内部开发工具
│   ├── lint-configs/    # 代码规范配置
│   ├── node-utils/      # Node工具函数
│   ├── tailwind-config/ # Tailwind配置
│   ├── tsconfig/        # TypeScript配置
│   └── vite-config/     # Vite构建配置
│
└── scripts/             # 脚本工具
    ├── deploy/          # 部署相关脚本
    ├── turbo-run/       # Turbo运行脚本
    └── vsh/             # 开发辅助脚本
```

## 快速开始

### 环境准备

- Node.js 16.0+
- pnpm 7.0+

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 开发指南

### 项目配置

项目配置位于 `packages/preferences/src` 目录，支持多环境配置。

### 新增页面

1. 在 `apps/web-antd/src/views` 目录下创建页面组件
2. 在 `apps/web-antd/src/router/routes/modules` 添加路由配置
3. 配置对应的API请求和数据处理逻辑

### 权限控制

项目支持基于角色的访问控制(RBAC)，具体配置在 `apps/web-antd/src/router/access.ts`，使用 `v-access` 指令控制元素的显示权限。

### 国际化

1. 在 `packages/locales/src/langs` 目录下添加语言包
2. 使用 `$t('key')` 函数进行文本翻译

## 贡献指南

欢迎提交Issue和Pull Request，请确保代码符合项目的代码规范和提交规范。

## 许可证

[MIT](LICENSE)
