# API Generator

从 Swagger/OpenAPI 文件生成 TypeScript API 代码。

## 功能特性

- 🔄 自动将 Swagger 2.0 转换为 OpenAPI 3.0
- 📁 保持输出目录结构与输入目录结构一致
- 🧹 自动清理命名空间前缀（如 `admin.v1.` 或 `v1`）
- ⚡ 使用自定义 HTTP 客户端（`requestClient`）
- 📦 生成完整的类型定义和 API 函数

## 使用方法

### 命令行

```bash
tsx scripts/api-generator/src/index.ts --input <swagger目录> --output <输出目录>
```

### 参数

| 参数 | 简写 | 说明 |
|------|------|------|
| `--input` | `-i` | Swagger 文件所在目录 |
| `--output` | `-o` | 生成的 API 代码输出目录 |

### 示例

在 `apps/web-antd` 中使用：

```bash
pnpm api:generate
```

这会执行：

```bash
tsx ../../scripts/api-generator/src/index.ts \
  --input ../../../ai-boilerplate-backend/doc/swagger \
  --output ./src/api/generated
```

## 输出结构

输入目录结构：
```
doc/swagger/
└── admin/
    └── v1/
        ├── sys_admin.swagger.json
        ├── sys_role.swagger.json
        └── ...
```

输出目录结构：
```
src/api/generated/
├── custom-instance.ts    # 自定义 HTTP 客户端适配器
├── index.ts              # 导出入口
└── admin/
    ├── index.ts
    └── v1/
        ├── index.ts
        ├── sys-admin.ts
        ├── sys-role.ts
        └── ...
```

## 生成的代码使用示例

```typescript
import { sysAdminGetSysAdminList, type SysAdminInfo } from '#/api/generated';

// 调用 API
const result = await sysAdminGetSysAdminList({
  page: 1,
  pageSize: 10,
});

// 使用类型
const admin: SysAdminInfo = result.list?.[0];
```

## 注意事项

- ⚠️ 生成的代码不要手动修改，每次运行会覆盖
- `custom-instance.ts` 在首次生成后不会被覆盖，可以根据项目需要修改
