# /backend-dev - 后端开发完整工作流

## 描述
后端开发的端到端工作流程，根据不同场景自动选择合适的技能组合，完成从需求到交付的全流程开发。基于 Go + Kratos 框架，支持 gRPC 和 HTTP 协议。

## 使用方式
```
/backend-dev <需求描述>
```

## 核心工作流程

### 流程 A：标准 CRUD 功能开发

**适用场景**：生成标准增删改查接口

**步骤 1：数据库设计**（如表未创建）
- 调用 `backend-database` 技能
- 设计表结构、字段、索引
- 生成并执行 SQL

**步骤 2：代码生成**
- 调用 `backend-crud` 技能
- 生成 Model、DAO、Repository、Service、Proto
- 自动编译 Proto（make api）

**步骤 3：测试验证**
- 调用 `api-schema-test` 技能进行自动化测试
- 或启动服务手动测试

---

### 流程 B：复杂业务功能开发

**适用场景**：自定义业务逻辑、跨表操作、复杂计算

**步骤 1：需求澄清**
- 想法不清晰：调用 `interview` 技能探索方案
- 需要技术选型：调用 `tech-decision` 技能对比方案
- 想法明确：直接进入下一步

**步骤 2：数据库设计**
- 调用 `backend-database` 技能
- 设计或修改表结构、添加字段、创建索引

**步骤 3：基础代码生成**（如需要）
- 调用 `backend-crud` 技能
- 为新表或修改的表生成基础 CRUD 代码

**步骤 4：实现业务逻辑**
- 按照 Service → Biz → Data 分层实现
- Data 层：数据访问、事务操作、缓存
- Biz 层：核心业务逻辑（复杂业务建议创建）
- Service 层：API 处理、参数校验
- 编写或修改 Proto 定义
- 配置 Wire 依赖注入

**步骤 5：测试验证**
- 单元测试（推荐）
- 调用 `api-schema-test` 技能
- 或启动服务集成测试

---

### 流程 C：API 优化与重构

**适用场景**：优化现有接口性能、重构代码

**步骤 1：问题识别**
- 分析性能瓶颈（N+1 查询、慢查询）
- 识别代码质量问题
- 评估业务逻辑变更影响

**步骤 2：方案设计**
- 需要对比方案时：调用 `tech-decision` 技能
- 评估缓存、索引、架构调整等方案

**步骤 3：实施优化**
- 优化数据库查询（使用 Preload、添加索引）
- 添加缓存层（Redis）
- 重构代码结构
- 更新相关测试

**步骤 4：验证效果**
- 性能测试（压测）
- 回归测试
- 调用 `api-schema-test` 技能验证功能

---

## 典型场景示例

### 场景 1：新增标准 CRUD 功能
```
用户输入：/backend-dev 为 sys_dept 表生成 CRUD 接口

执行流程：
1. 检查表是否存在（调用 backend-database）
2. 调用 backend-crud 生成代码
3. 编译 Proto（make api）
4. 运行测试验证（api-schema-test）
```

### 场景 2：实现复杂业务功能
```
用户输入：/backend-dev 实现订单支付功能，支持支付宝和微信支付

执行流程：
1. 调用 interview 探索设计方案
2. 调用 tech-decision 选择支付 SDK
3. 调用 backend-database 设计数据库表（支付记录、回调日志）
4. 实现 Service + Biz + Data 层代码
5. 配置异步任务处理
6. 运行测试验证（api-schema-test）
```

### 场景 3：数据库字段修改
```
用户输入：/backend-dev user 表需要添加 phone 字段

执行流程：
1. 调用 backend-database 生成 ALTER TABLE
2. 执行 SQL
3. 调用 backend-crud 更新代码
4. 重新生成 GORM Model
5. 运行测试验证（api-schema-test）
```

### 场景 4：性能优化
```
用户输入：/backend-dev 订单列表查询很慢，需要优化

执行流程：
1. 分析当前代码，识别性能问题
2. 调用 tech-decision 对比优化方案
3. 实施优化（Preload、索引、缓存）
4. 性能测试验证效果（api-schema-test）
```

---

## 开发注意事项

1. **先设计后编码**：复杂功能先用 interview 探索方案
2. **遵循分层架构**：Service → Biz → Data，职责清晰
3. **使用依赖注入**：通过 Wire 管理依赖
4. **编译验证**：修改 Proto 后必须执行 `make api`
5. **测试优先**：使用 api-schema-test 进行自动化测试

---

## 相关技能

- `backend-database` - 数据库表设计
- `backend-crud` - CRUD 代码生成
- `interview` - 技术方案探索
- `tech-decision` - 技术选型决策
- `api-schema-test` - API 契约测试
- `bug-detective` - 问题调试
- `git-workflow` - Git 工作流
