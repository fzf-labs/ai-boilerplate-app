# AI Boilerplate App

移动端应用，基于 UniApp + Vue3 + TypeScript + Vite 构建的跨平台应用。

## 技术栈

- **框架**: UniApp 3.x + Vue 3 + TypeScript
- **构建工具**: Vite 5
- **UI 组件**: wot-design-uni
- **状态管理**: Pinia + pinia-plugin-persistedstate
- **网络请求**: Alova
- **样式方案**: UnoCSS + Sass
- **国际化**: vue-i18n
- **分页组件**: z-paging

## 平台支持

| H5  | iOS | Android | 微信小程序 | 支付宝 | 百度 | 字节 | 快手 | 钉钉 |
| --- | --- | ------- | ---------- | ------ | ---- | ---- | ---- | ---- |
| ✓   | ✓   | ✓       | ✓          | ✓      | ✓    | ✓    | ✓    | ✓    |

## 环境要求

- Node.js >= 20
- pnpm >= 9

## 快速开始

```bash
# 安装依赖
pnpm install

# H5 开发
pnpm dev

# 微信小程序开发
pnpm dev:mp

# App 开发
pnpm dev:app
```

## 开发命令

### H5 平台
```bash
pnpm dev:h5          # 开发环境
pnpm dev:h5:test     # 测试环境
pnpm dev:h5:prod     # 生产环境
pnpm build:h5        # 构建生产版本
```

### 微信小程序
```bash
pnpm dev:mp          # 开发环境
pnpm dev:mp:test     # 测试环境
pnpm dev:mp:prod     # 生产环境
pnpm build:mp        # 构建生产版本
```

打包后在微信开发者工具中导入 `dist/dev/mp-weixin` 或 `dist/build/mp-weixin` 目录。

### App 平台
```bash
pnpm dev:app         # 开发环境
pnpm dev:app:test    # 测试环境
pnpm dev:app:prod    # 生产环境
pnpm build:app       # 构建生产版本
```

使用 HBuilderX 导入 `dist/dev/app` 或 `dist/build/app` 目录进行真机调试或云打包。

### 其他小程序平台
```bash
pnpm dev:mp-alipay      # 支付宝小程序
pnpm dev:mp-baidu       # 百度小程序
pnpm dev:mp-toutiao     # 字节小程序
pnpm dev:mp-kuaishou    # 快手小程序
```

## 项目结构

```
ai-boilerplate-app/
├── src/
│   ├── pages/          # 页面文件
│   ├── components/     # 组件
│   ├── api/            # API 接口
│   ├── store/          # 状态管理
│   ├── utils/          # 工具函数
│   ├── static/         # 静态资源
│   └── App.vue         # 应用入口
├── env/                # 环境配置
├── vite.config.ts      # Vite 配置
├── manifest.config.ts  # 应用配置
├── pages.config.ts     # 页面路由配置
└── uno.config.ts       # UnoCSS 配置
```

## 代码规范

```bash
pnpm lint            # 检查代码规范
pnpm lint:fix        # 自动修复代码规范
pnpm type-check      # TypeScript 类型检查
```

## License

MIT
