---
name: backend-database
description: PostgreSQL 数据库表设计技能。当用户需要设计新的数据库表、添加字段、创建索引、或询问表结构相关问题时使用此技能。触发场景包括：(1) 创建新表结构 (2) 修改现有表 (3) 设计表关联关系 (4) 创建索引策略 (5) 字段类型选择 (6) 命名规范咨询
---

# 数据库表设计技能

本技能提供 PostgreSQL 数据库表设计指南和交互式工作流程。

## 项目结构

- SQL 文件位置：`ai-boilerplate-backend/doc/sql/ai_boilerplate/`
- MCP 工具：`mcp__dbhub__execute_sql`、`mcp__dbhub__search_objects`

## 核心工作流程

### 流程 A：创建新表

#### 第 1 步：需求收集与参考分析

**询问用户：**
- 表的用途和所属模块（系统管理、用户、AI、商城等）
- 需要哪些业务字段及其用途
- 是否需要多租户支持（tenant_id）
- 是否关联其他表（外键）
- 特殊需求（状态、排序、软删除等）

**同时自动执行：**
- 使用 Glob 查看 `ai-boilerplate-backend/doc/sql/ai_boilerplate/*.sql` 中的现有表
- 找到相同模块前缀的表作为参考
- 分析相似表的字段命名和索引策略

#### 第 2 步：生成 SQL 设计

根据收集的信息生成完整的 SQL，包括：
- CREATE TABLE 语句（包含所有必需字段）
- 所有字段和表的 COMMENT
- 主键约束
- 必要的索引（外键、唯一、查询优化）

**内部自动验证（不展示给用户）：**
- ✓ 表名使用正确的模块前缀
- ✓ 包含必需字段（id, created_at, updated_at, deleted_at）
- ✓ 所有字段都有 COMMENT
- ✓ 外键字段有索引
- ✓ 唯一字段有唯一索引
- ✓ 字段顺序正确
- ✓ 数据类型选择合理

**向用户展示：**
1. 完整的 SQL 代码
2. 设计说明（数据类型选择、索引策略、关联关系）
3. 等待用户确认

#### 第 3 步：保存并执行

用户确认后：

1. **保存 SQL 文件**
   - 在 `ai-boilerplate-backend/doc/sql/ai_boilerplate/{table_name}.sql` 创建文件
   - 文件名与表名完全一致

2. **自动执行 SQL（如果 MCP 可用）**
   - 检测是否有 `mcp__dbhub__execute_sql` 工具
   - 如果可用：
     - 执行完整的 SQL（CREATE TABLE + COMMENT + INDEX）
     - 使用 `mcp__dbhub__search_objects` 验证表已创建
     - 显示执行结果
   - 如果不可用：
     - 提示用户手动执行 SQL 文件

---

### 流程 B：修改现有表

#### 第 1 步：读取并分析

1. 使用 Read 读取 `ai-boilerplate-backend/doc/sql/ai_boilerplate/{table_name}.sql`
2. 分析现有表结构
3. 询问用户需要做什么修改

#### 第 2 步：生成修改方案

根据用户需求生成：
- ALTER TABLE 语句（添加/修改字段、索引）
- 新增字段的 COMMENT 语句
- 更新后的完整 CREATE TABLE 语句（用于更新 SQL 文件）

**向用户展示：**
1. ALTER TABLE 语句
2. 修改说明
3. 等待用户确认

#### 第 3 步：更新并执行

用户确认后：

1. **更新 SQL 文件**
   - 用完整的 CREATE TABLE 替换原文件内容

2. **自动执行 ALTER TABLE（如果 MCP 可用）**
   - 检测是否有 `mcp__dbhub__execute_sql` 工具
   - 如果可用：
     - 执行 ALTER TABLE 语句
     - 执行新增字段的 COMMENT
     - 执行新增的索引
     - 验证修改成功
   - 如果不可用：
     - 提示用户手动执行 ALTER TABLE 语句

---

### 流程 C：查询表结构

当用户询问表结构或字段信息时：

1. **优先使用 MCP（如果可用）**
   - 使用 `mcp__dbhub__search_objects` 查询表、字段、索引
   - 实时获取数据库中的表结构

2. **备选方案：读取 SQL 文件**
   - 使用 Read 读取 `ai-boilerplate-backend/doc/sql/ai_boilerplate/{table_name}.sql`
   - 解析 SQL 文件内容

3. **展示结果**
   - 表结构概览
   - 字段列表（名称、类型、注释）
   - 索引列表
   - 关联关系

---

## 命名规范

### 表名前缀

| 前缀 | 模块 | 示例 |
|------|------|------|
| `sys_` | 系统管理 | sys_admin, sys_role, sys_menu |
| `user_` | 用户相关 | user, user_membership |
| `ai_` | AI功能 | ai_chat_message, ai_image_record |
| `mall_` | 商城模块 | mall_order, mall_product |
| `wx_gzh_` | 微信公众号 | wx_gzh_user, wx_gzh_menu |
| `wx_xcx_` | 微信小程序 | wx_xcx_user |
| `dict_` | 字典数据 | dict_type, dict_data |
| `file_` | 文件管理 | file_config, file_data |
| `mail_` | 邮件模块 | mail_account, mail_template |
| `sms_` | 短信模块 | sms_channel, sms_template |
| `self_` | 自有应用 | self_app, self_app_release |

### 字段命名规则

- 使用 `snake_case`
- 外键使用 `{关联表}_id` 格式（如：`user_id`, `tenant_id`）
- 布尔值避免 `is_` 前缀，直接使用语义名称（如：`pinned`, `public_status`）
- 时间字段使用 `_at` 或 `_time` 后缀（如：`created_at`, `payment_time`）

### 索引命名规则

- 普通索引：`{table}_{column}_idx`
- 唯一索引：`{table}_{column}_idx`（使用 UNIQUE）
- 复合索引：`{table}_{column1}_{column2}_idx`
- 主键约束：`{table}_pkey`

---

## SQL 文件格式

每个表对应一个独立的 `.sql` 文件，命名与表名一致。

### 标准 SQL 模板

```sql
CREATE TABLE public.{table_name} (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    -- 业务字段在这里
    status integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

-- 表注释
COMMENT ON TABLE public.{table_name} IS '{表名中文描述}';

-- 字段注释（每个字段必须有注释）
COMMENT ON COLUMN public.{table_name}.id IS 'id';
COMMENT ON COLUMN public.{table_name}.status IS '状态';
COMMENT ON COLUMN public.{table_name}.created_at IS '创建时间';
COMMENT ON COLUMN public.{table_name}.updated_at IS '更新时间';
COMMENT ON COLUMN public.{table_name}.deleted_at IS '删除时间';

-- 主键约束
ALTER TABLE ONLY public.{table_name} ADD CONSTRAINT {table_name}_pkey PRIMARY KEY (id);

-- 索引（根据需要添加）
CREATE INDEX {table_name}_{column}_idx ON public.{table_name} USING btree ({column});
CREATE UNIQUE INDEX {table_name}_{column}_idx ON public.{table_name} USING btree ({column});
```

---

## 常用字段模式

### 必需字段（每个表都必须有）

```sql
id uuid DEFAULT gen_random_uuid() NOT NULL,     -- 主键
created_at timestamp with time zone NOT NULL,   -- 创建时间
updated_at timestamp with time zone NOT NULL,   -- 更新时间
deleted_at timestamp with time zone             -- 软删除时间
```

### 多租户字段

```sql
tenant_id character varying(64) NOT NULL,       -- 租户ID
```

### 状态字段

```sql
status integer DEFAULT 1 NOT NULL,              -- 1启用 -1禁用
status smallint DEFAULT 1 NOT NULL,             -- 同上，更省空间
```

### 排序字段

```sql
sort integer DEFAULT 0 NOT NULL,                -- 排序值
sort bigint NOT NULL,                           -- 大范围排序
```

### 用户关联

```sql
admin_id character varying(64) NOT NULL,        -- 管理员ID
user_id character varying(64) NOT NULL,         -- 用户ID
```

---

## 常用数据类型

| 用途 | 类型 | 说明 |
|------|------|------|
| 主键 | `uuid DEFAULT gen_random_uuid()` | UUID自动生成 |
| 短文本 | `character varying(N)` | N为最大长度 |
| 长文本 | `text` | 无长度限制 |
| 整数 | `integer` / `bigint` / `smallint` | 根据范围选择 |
| 布尔 | `boolean` | true/false |
| 时间戳 | `timestamp with time zone` | 带时区 |
| 金额 | `numeric(10,2)` | 精确小数 |
| JSON | `jsonb` | 二进制JSON，支持索引 |
| 浮点 | `double precision` | 非精确小数 |

**常用长度参考：**
- 用户名/昵称：`varchar(64)` 或 `varchar(100)`
- 手机号：`varchar(20)`
- 邮箱：`varchar(128)`
- 密码哈希：`varchar(128)`
- URL：`varchar(512)` 或 `varchar(2048)`
- 标题：`varchar(256)`
- 备注：`varchar(500)` 或 `text`

---

## 索引策略

### 必建索引

- 主键自动创建唯一索引
- 外键字段：`{table}_{fk_column}_idx`
- 唯一约束字段：`{table}_{column}_idx`（UNIQUE）

### 常见索引场景

```sql
-- 外键索引（提升关联查询性能）
CREATE INDEX {table}_user_id_idx ON public.{table} USING btree (user_id);
CREATE INDEX {table}_tenant_id_idx ON public.{table} USING btree (tenant_id);
CREATE INDEX {table}_admin_id_idx ON public.{table} USING btree (admin_id);

-- 唯一索引（保证数据唯一性）
CREATE UNIQUE INDEX {table}_username_idx ON public.{table} USING btree (username);
CREATE UNIQUE INDEX {table}_phone_idx ON public.{table} USING btree (phone);
CREATE UNIQUE INDEX {table}_email_idx ON public.{table} USING btree (email);

-- 复合唯一索引（组合唯一性）
CREATE UNIQUE INDEX {table}_type_key_idx ON public.{table} USING btree (type, key);

-- 时间索引（查询优化）
CREATE INDEX {table}_created_at_idx ON public.{table} USING btree (created_at);

-- 状态索引（高频查询）
CREATE INDEX {table}_status_idx ON public.{table} USING btree (status);
```

### 索引设计原则

- 外键字段必须建索引
- 唯一约束字段必须建唯一索引
- 高频查询字段建索引
- 时间范围查询字段建索引
- 避免过多索引（影响写入性能）

---

## 表关系设计模式

### 一对多关系

```sql
-- 父表
CREATE TABLE public.dict_type (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    type character varying(100) NOT NULL,
    ...
);

-- 子表
CREATE TABLE public.dict_data (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    type character varying(100) NOT NULL,  -- 关联 dict_type.type
    ...
);
CREATE INDEX dict_data_type_idx ON public.dict_data USING btree (type);
```

### 多对多关系（JSON方式）

```sql
-- 角色表存储菜单ID数组
CREATE TABLE public.sys_role (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "menuIds" jsonb,  -- 菜单ID数组 ["id1", "id2", ...]
    ...
);
```

**注意：** 本项目倾向使用 jsonb 存储关联 ID 数组，而不是创建中间表。

---

## 常见问题处理

### Q: 如何处理枚举类型？

A: 使用 integer 或 varchar，在注释中说明枚举值：

```sql
status integer DEFAULT 1 NOT NULL,
-- COMMENT: 状态(0待处理,1处理中,2已完成,3已取消)

product_type character varying(20) NOT NULL,
-- COMMENT: 商品类型(membership:会员,service:服务,goods:商品)
```

### Q: 什么时候使用 text，什么时候使用 varchar？

A:
- 固定格式、有明确长度限制的用 `varchar(n)`
- 用户输入的长文本、不确定长度的用 `text`
- 提示词、正文内容、描述等用 `text`

### Q: 金额字段用什么类型？

A: 使用 `numeric(10,2)`，精确到分：

```sql
original_amount numeric(10,2) NOT NULL,  -- 原价
discount_amount numeric(10,2) DEFAULT 0.00,  -- 优惠金额
actual_amount numeric(10,2) NOT NULL,  -- 实付金额
```

### Q: 如何设计软删除？

A: 使用 `deleted_at` 字段（可为空）：

```sql
deleted_at timestamp with time zone  -- NULL表示未删除，有值表示删除时间
```

GORM 会自动处理软删除逻辑。

### Q: 是否需要创建外键约束？

A: 本项目**不使用数据库外键约束**，而是：
- 在应用层维护关联关系
- 为外键字段创建普通索引（不是外键约束）
- 在注释中说明关联关系

---

## MCP 工具使用

### 可用的 MCP 工具

1. **mcp__dbhub__execute_sql**
   - 执行 SQL 语句（CREATE TABLE、ALTER TABLE、COMMENT、INDEX）
   - 用于自动化表创建和修改

2. **mcp__dbhub__search_objects**
   - 查询数据库对象（schema、table、column、procedure、index）
   - 用于验证表是否创建成功、查询表结构

### 使用示例

```javascript
// 执行 CREATE TABLE
mcp__dbhub__execute_sql({
  sql: "CREATE TABLE public.test_table (...)"
})

// 执行 COMMENT
mcp__dbhub__execute_sql({
  sql: "COMMENT ON TABLE public.test_table IS '测试表'"
})

// 验证表存在
mcp__dbhub__search_objects({
  object_type: "table",
  pattern: "test_table"
})

// 查询表的所有字段
mcp__dbhub__search_objects({
  object_type: "column",
  schema: "public",
  table: "test_table",
  detail_level: "full"
})
```

### 何时使用 MCP

**推荐使用：**
- 开发环境快速迭代
- 需要立即验证 SQL 语法
- 想要自动化整个流程
- 需要快速查看表结构

**不推荐使用：**
- 生产环境（应该通过迁移脚本）
- 需要审批流程的变更
- 复杂的数据迁移操作
- 涉及敏感数据的操作

---

## 设计检查清单

在创建或修改表时，确保：

- [ ] 表名使用正确的模块前缀
- [ ] 使用 UUID 主键：`id uuid DEFAULT gen_random_uuid() NOT NULL`
- [ ] 包含时间戳字段：`created_at`, `updated_at`, `deleted_at`
- [ ] 如需多租户：添加 `tenant_id` 字段
- [ ] 如需状态管理：添加 `status` 字段
- [ ] 每个字段都有 COMMENT
- [ ] 表有 COMMENT
- [ ] 外键字段有索引
- [ ] 唯一约束字段有唯一索引
- [ ] 高频查询字段有索引
- [ ] 字段顺序正确（id → 业务字段 → status/sort → 时间字段）
- [ ] 数据类型选择合理
- [ ] 索引命名符合规范

---

## 快速参考

### 创建新表的完整流程

1. 询问需求 + 查看现有表
2. 生成 SQL + 内部验证
3. 展示设计 + 等待确认
4. 保存文件 + 执行 SQL（MCP）

### 修改现有表的完整流程

1. 读取现有表 + 询问修改需求
2. 生成 ALTER TABLE + 展示方案
3. 更新文件 + 执行 ALTER（MCP）

### 查询表结构的完整流程

1. 优先使用 MCP 查询
2. 备选方案：读取 SQL 文件
3. 展示表结构、字段、索引
