---
name: backend-crud
description: 后端 CRUD 代码生成技能。当用户需要为数据库表生成完整的 CRUD 功能代码时使用此技能。触发场景包括：(1) 为新表生成 CRUD 代码 (2) 表字段改动后更新代码 (3) 自定义 CRUD 接口逻辑 (4) 完整的后端功能开发流程
---

# 后端 CRUD 代码生成技能

本技能提供后端 CRUD 代码自动生成工作流程，从数据库表到完整的 API 接口。

## 项目结构

```
ai-boilerplate-backend/
├── api/admin/v1/              # Protobuf API 定义
├── internal/
│   ├── service/               # 服务层实现
│   └── data/
│       └── gorm/
│           ├── ai_boilerplate_model/   # GORM 模型
│           ├── ai_boilerplate_dao/     # 数据访问对象
│           └── ai_boilerplate_repo/    # 仓储层
└── doc/sql/ai_boilerplate/      # SQL 表定义
```

## 核心工作流程

### 前置条件检查

在开始之前，确认：
- [ ] 数据库表已创建（使用 backend-database 技能）
- [ ] SQL 文件已保存在 `doc/sql/ai_boilerplate/` 目录
- [ ] 数据库连接配置正确（Makefile 中的 DB_DSN）

### 流程：为新表生成 CRUD 代码

此流程适用于新创建的数据库表，自动生成完整的 CRUD 接口代码。

**注意：** 如果表字段改动需要更新代码，请使用"自定义 CRUD 接口"流程。

#### 第 1 步：确认表名和 API 位置

**询问用户：**
1. 要生成 CRUD 的表名（支持多个表，逗号分隔）
2. API 位置（默认：admin，可选：kid, parent）

**自动执行：**
- 使用 Read 读取表的 SQL 文件，验证表结构

#### 第 2 步：生成 GORM 代码

执行命令生成 GORM 模型、DAO、Repository：

```bash
cd ai-boilerplate-backend
make gorm DB_TABLES='table1,table2'
```

**验证生成结果：**
- 检查 `internal/data/gorm/ai_boilerplate_model/{table}.gen.go` 是否生成
- 检查 `internal/data/gorm/ai_boilerplate_dao/{table}.gen.go` 是否生成
- 检查 `internal/data/gorm/ai_boilerplate_repo/{table}.gen.go` 是否生成

#### 第 3 步：生成 Protobuf 定义

执行命令将 SQL 转为 Protobuf：

```bash
cd ai-boilerplate-backend
make sqltopb admin table1,table2
```

**验证生成结果：**
- 检查 `api/admin/v1/{table}.proto` 是否生成
- 验证 proto 文件包含所有必要的 message 和 service 定义

#### 第 4 步：生成 API 代码

执行命令生成 gRPC 和 HTTP 代码：

```bash
cd ai-boilerplate-backend
make api
```

**验证生成结果：**
- 检查 `api/admin/v1/{table}.pb.go` 是否生成
- 检查 `api/admin/v1/{table}_http.pb.go` 是否生成
- 检查 `api/admin/v1/{table}_grpc.pb.go` 是否生成

#### 第 5 步：生成 Service 和 Data 层代码

执行命令生成服务层和数据层代码：

```bash
cd ai-boilerplate-backend
make pbtocode DB_TABLES='table1,table2'
```

**验证生成结果：**
- 检查 `internal/service/admin_v1_{table}_*.go` 文件是否生成
- 验证生成的文件包含所有 CRUD 方法

#### 第 6 步：依赖注入（Wire）

执行 Wire 生成依赖注入代码：

```bash
cd ai-boilerplate-backend
make wire
```

#### 第 7 步：验证和测试

**自动验证：**
1. 编译项目：`go build ./cmd/...`
2. 检查是否有编译错误
3. 如果有错误，分析并提供修复建议

**向用户展示：**
1. 生成的文件列表
2. API 接口列表（HTTP 路径和方法）
3. 下一步操作建议

---

### 自定义 CRUD 接口

此流程适用于以下场景：
- 表字段改动后需要更新代码
- 需要自定义接口逻辑（不使用默认生成的代码）
- 需要添加特殊的查询条件或业务逻辑

#### 第 1 步：分析需求

**询问用户：**
- 哪些表需要更新
- 表字段做了哪些修改（添加/删除/修改字段）
- 需要更新哪些接口
- 是否需要自定义查询条件或业务逻辑

**自动执行：**
- 使用 Read 读取表的 SQL 文件，分析表结构变化
- 使用 git diff 查看 SQL 文件的变更

#### 第 2 步：重新生成 GORM 代码（如果表结构改动）

如果表字段有改动，需要重新生成 GORM 代码：

```bash
cd ai-boilerplate-backend
make gorm DB_TABLES='table1'
```

**验证：**
- 使用 git diff 查看 model、dao、repo 文件的变更
- 确认新增/删除的字段已正确生成

#### 第 3 步：修改 Protobuf 定义

**手动编辑 proto 文件：**
1. 使用 Read 读取 `api/admin/v1/{table}.proto`
2. 根据表字段变化更新 message 定义
3. 添加/修改自定义查询条件
4. 使用 Edit 更新 proto 文件

#### 第 4 步：重新生成 API 代码

```bash
cd ai-boilerplate-backend
make api
```

#### 第 5 步：更新 Service 层代码

**手动编辑 service 文件：**
1. 找到对应的 service 文件（`internal/service/admin_v1_{table}_*.go`）
2. 根据字段变化更新业务逻辑
3. 实现自定义的查询条件
4. 如需复杂查询，修改 data 层代码

#### 第 6 步：依赖注入和验证

```bash
cd ai-boilerplate-backend
make wire
go build ./cmd/...
```

**验证：**
- 检查编译是否成功
- 使用 git diff 查看所有变更
- 测试修改的接口

---

## Makefile 命令详解

### gorm - 生成 GORM 代码

```bash
make gorm DB_TABLES='table1,table2'
```

**功能：**
- 从数据库读取表结构
- 生成 GORM 模型（model）
- 生成数据访问对象（dao）
- 生成仓储层（repository）

**参数：**
- `DB_TABLES`: 表名列表，逗号分隔，留空表示所有表

**生成文件：**
- `internal/data/gorm/ai_boilerplate_model/{table}.gen.go`
- `internal/data/gorm/ai_boilerplate_dao/{table}.gen.go`
- `internal/data/gorm/ai_boilerplate_repo/{table}.gen.go`

### sqltopb - SQL 转 Protobuf

```bash
make sqltopb admin table1,table2
```

**功能：**
- 从数据库读取表结构
- 生成 Protobuf message 定义
- 生成 CRUD service 定义

**参数：**
- 第 1 个参数：API 位置（admin/kid/parent）
- 第 2 个参数：表名列表，逗号分隔

**生成文件：**
- `api/{position}/v1/{table}.proto`

### api - 生成 API 代码

```bash
make api
```

**功能：**
- 编译所有 proto 文件
- 生成 gRPC 代码
- 生成 HTTP 代码
- 生成 OpenAPI 文档

**生成文件：**
- `api/**/*.pb.go` - Protobuf 消息
- `api/**/*_http.pb.go` - HTTP 处理器
- `api/**/*_grpc.pb.go` - gRPC 服务
- `doc/swagger/*.swagger.json` - OpenAPI 文档

### pbtocode - 生成 Service 和 Data 层

```bash
make pbtocode DB_TABLES='table1,table2'
```

**功能：**
- 根据 proto 定义生成 service 实现
- 生成 data 层代码（如果需要）

**参数：**
- `DB_TABLES`: 表名列表，逗号分隔，留空表示所有表

**生成文件：**
- `internal/service/admin_v1_{table}_*.go`

### wire - 依赖注入

```bash
make wire
```

**功能：**
- 生成依赖注入代码
- 连接 service、data、repo 层

**生成文件：**
- `cmd/*/wire_gen.go`

---

## 代码生成规则

### Service 层命名规则

生成的 service 文件命名格式：

```
admin_v1_{table}_{method}.go
```

**示例：**
- `admin_v1_sysadmin_createsysadmin.go` - 创建管理员
- `admin_v1_sysadmin_updatesysadmin.go` - 更新管理员
- `admin_v1_sysadmin_deletesysadmin.go` - 删除管理员
- `admin_v1_sysadmin_getsysadmininfo.go` - 获取管理员详情
- `admin_v1_sysadmin_getsysadminlist.go` - 获取管理员列表
- `admin_v1_sysadmin_updatesysadminstatus.go` - 更新管理员状态

### API 路由规则

HTTP 路由格式：

```
POST   /admin/api/v1/{table}/create
PUT    /admin/api/v1/{table}/update
DELETE /admin/api/v1/{table}/delete
GET    /admin/api/v1/{table}/info
GET    /admin/api/v1/{table}/list
PUT    /admin/api/v1/{table}/update_status
```

### Protobuf Message 规则

每个表生成以下 message：

```protobuf
// 创建请求
message Create{Table}Req { ... }
message Create{Table}Resp { ... }

// 更新请求
message Update{Table}Req { ... }
message Update{Table}Resp { ... }

// 删除请求
message Delete{Table}Req { ... }
message Delete{Table}Resp { ... }

// 获取详情
message Get{Table}InfoReq { ... }
message Get{Table}InfoResp { ... }

// 获取列表
message Get{Table}ListReq { ... }
message Get{Table}ListResp { ... }

// 更新状态
message Update{Table}StatusReq { ... }
message Update{Table}StatusResp { ... }
```

---

## 常见问题处理

### Q: 生成代码后编译失败？

A: 检查以下几点：
1. 是否执行了 `make wire`
2. proto 文件是否有语法错误
3. 是否有循环依赖
4. 运行 `go mod tidy` 更新依赖

### Q: 如何只生成部分接口？

A:
1. 先执行完整流程生成所有代码
2. 手动删除不需要的 service 文件
3. 手动编辑 proto 文件，删除不需要的 rpc 定义
4. 重新执行 `make api` 和 `make wire`

### Q: 如何添加自定义查询条件？

A:
1. 编辑 proto 文件，在 `Get{Table}ListReq` 中添加查询字段
2. 执行 `make api` 重新生成 API 代码
3. 编辑对应的 service 文件，实现查询逻辑
4. 如需复杂查询，修改 repo 层代码

### Q: 如何处理关联查询？

A:
1. 在 proto 的 Response message 中添加关联对象字段
2. 在 service 层实现关联查询逻辑
3. 使用 GORM 的 Preload 或手动查询关联数据

### Q: 生成的代码可以修改吗？

A:
- **可以修改：** service 层代码（业务逻辑）
- **不建议修改：** model、dao、repo 层代码（会被重新生成覆盖）
- **可以修改：** proto 文件（但要注意兼容性）

### Q: 如何处理软删除？

A:
- GORM 自动处理软删除（deleted_at 字段）
- 查询时自动过滤已删除记录
- Delete 操作自动变为软删除
- 如需硬删除，使用 `Unscoped().Delete()`

---

## 完整示例：为 sys_admin 表生成 CRUD

### 步骤 1：确认表已创建

```bash
# 检查 SQL 文件是否存在
ls doc/sql/ai_boilerplate/sys_admin.sql
```

### 步骤 2：生成 GORM 代码

```bash
cd ai-boilerplate-backend
make gorm DB_TABLES='sys_admin'
```

**验证：**
```bash
ls internal/data/gorm/ai_boilerplate_model/sys_admin.gen.go
ls internal/data/gorm/ai_boilerplate_dao/sys_admin.gen.go
ls internal/data/gorm/ai_boilerplate_repo/sys_admin.gen.go
```

### 步骤 3：生成 Protobuf

```bash
make sqltopb admin sys_admin
```

**验证：**
```bash
ls api/admin/v1/sys_admin.proto
```

### 步骤 4：生成 API 代码

```bash
make api
```

**验证：**
```bash
ls api/admin/v1/sys_admin.pb.go
ls api/admin/v1/sys_admin_http.pb.go
ls api/admin/v1/sys_admin_grpc.pb.go
```

### 步骤 5：生成 Service 代码

```bash
make pbtocode DB_TABLES='sys_admin'
```

**验证：**
```bash
ls internal/service/admin_v1_sysadmin_*.go
```

### 步骤 6：依赖注入

```bash
make wire
```

### 步骤 7：编译测试

```bash
go build ./cmd/...
```

### 步骤 8：启动服务

```bash
make run
```

### 步骤 9：测试 API

```bash
# 创建管理员
curl -X POST http://localhost:8000/admin/api/v1/sys_admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'

# 获取列表
curl http://localhost:8000/admin/api/v1/sys_admin/list
```

---

## 工作流程图

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 数据库表设计 (backend-database 技能)                      │
│    - 创建 SQL 文件                                           │
│    - 执行 SQL 创建表                                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. 生成 GORM 代码 (make gorm)                               │
│    - Model: 数据模型                                         │
│    - DAO: 数据访问对象                                       │
│    - Repo: 仓储层                                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. 生成 Protobuf (make sqltopb)                             │
│    - Message 定义                                            │
│    - Service 定义                                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. 生成 API 代码 (make api)                                 │
│    - gRPC 代码                                               │
│    - HTTP 代码                                               │
│    - OpenAPI 文档                                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. 生成 Service 代码 (make pbtocode)                        │
│    - Service 层实现                                          │
│    - CRUD 方法                                               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. 依赖注入 (make wire)                                      │
│    - 连接各层代码                                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. 编译运行                                                  │
│    - go build                                                │
│    - make run                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 技能触发时机

当用户说以下内容时，应该使用此技能：

1. **为新表生成 CRUD 代码：**
   - "为 xxx 表生成 CRUD 代码"
   - "生成 xxx 的增删改查接口"
   - "创建 xxx 的后端接口"
   - "开发 xxx 功能"
   - "实现 xxx 模块"
   - "添加 xxx 管理功能"

2. **表字段改动后更新代码：**
   - "xxx 表字段改了，需要更新代码"
   - "表结构修改了，更新接口"
   - "添加了新字段，需要更新 API"
   - "修改 xxx 表的接口"

3. **使用 /crud 命令：**
   - 用户直接输入 `/crud`

---

## 技能执行策略

### 自动化优先

- 尽可能自动执行命令，减少用户手动操作
- 每个步骤执行后自动验证结果
- 发现错误立即提示并提供解决方案

### 交互式确认

- 在执行关键操作前询问用户确认
- 展示将要生成的文件列表
- 说明每个步骤的作用

### 错误处理

- 捕获命令执行错误
- 分析错误原因
- 提供详细的修复建议
- 必要时回滚操作

### 进度展示

- 使用 TodoWrite 工具跟踪进度
- 清晰展示当前步骤
- 标记已完成和待完成的任务

---

## 与其他技能的协作

### backend-database 技能

- **关系：** backend-crud 依赖 backend-database
- **协作：** 先用 backend-database 创建表，再用 backend-crud 生成代码
- **数据流：** SQL 文件 → GORM 代码 → API 代码

### 其他技能

- **test 技能：** 生成代码后，使用 test 技能生成测试用例
- **check 技能：** 使用 check 技能检查生成的代码规范
- **api-doc 技能：** 使用 api-doc 技能同步 API 文档到 Apifox

---

## 最佳实践

### 1. 表名规范

- 使用正确的模块前缀（sys_, user_, ai_ 等）
- 表名使用单数形式
- 使用 snake_case 命名

### 2. 字段设计

- 必须包含：id, created_at, updated_at, deleted_at
- 多租户表必须包含：tenant_id
- 状态管理必须包含：status

### 3. 代码生成顺序

- 严格按照流程顺序执行
- 不要跳过任何步骤
- 每步完成后验证结果

### 4. 版本控制

- 生成代码前先提交现有代码
- 使用 git diff 查看变更
- 重要变更创建新分支

### 5. 测试验证

- 生成代码后立即编译测试
- 使用 curl 或 Postman 测试 API
- 检查数据库操作是否正确

---

## 快速参考

### 为新表生成 CRUD 的完整流程

1. 确认表名和 API 位置
2. 生成 GORM 代码
3. 生成 Protobuf 定义
4. 生成 API 代码
5. 生成 Service 代码
6. 依赖注入
7. 验证测试 + 展示结果

### 表字段改动后更新代码的流程

1. 分析需求（表字段变化、需要更新的接口）
2. 重新生成 GORM 代码（如果表结构改动）
3. 修改 Protobuf 定义
4. 重新生成 API 代码
5. 更新 Service 层代码
6. 依赖注入和验证

### 完整命令序列

```bash
# 1. 生成 GORM 代码
make gorm DB_TABLES='table1,table2'

# 2. 生成 Protobuf
make sqltopb admin table1,table2

# 3. 生成 API 代码
make api

# 4. 生成 Service 代码
make pbtocode DB_TABLES='table1,table2'

# 5. 依赖注入
make wire

# 6. 编译
go build ./cmd/...

# 7. 运行
make run
```

### 单表快速生成

```bash
# 一键生成（需要自定义 Makefile target）
make crud TABLE='sys_admin' POSITION='admin'
```

### 验证检查清单

- [ ] GORM model 文件已生成
- [ ] GORM dao 文件已生成
- [ ] GORM repo 文件已生成
- [ ] Proto 文件已生成
- [ ] API pb.go 文件已生成
- [ ] Service 文件已生成
- [ ] Wire 代码已生成
- [ ] 编译无错误
- [ ] API 接口可访问
- [ ] CRUD 操作正常
