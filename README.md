# AI Boilerplate

<div align="center">

**AI 驱动的全栈开发脚手架**

[![Go](https://img.shields.io/badge/Go-1.24+-00ADD8?logo=go)](https://go.dev/)
[![Node](https://img.shields.io/badge/Node-20+-green?logo=node.js)](https://nodejs.org/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org/)

面向 **AI 编程助手 / Agentic Coding Tools** 的全栈开发脚手架：同一套项目结构与工作流，可适配Cursor、 Claude Code、CodeX 等工具，集成管理后台、后端服务与移动端应用三大子项目，为全栈团队提供标准化的快速开发解决方案。

</div>

---

## 目录

- [简介](#简介)
- [项目亮点](#项目亮点)
- [子项目速览](#子项目速览)
- [AI 工具适配](#ai-工具适配)
- [快速开始（TL;DR）](#快速开始tldr)
- [核心概念](#核心概念)
  - [模板编程（项目初始化）](#模板编程项目初始化)
  - [传统代码生成](#传统代码生成)
  - [Subtree 管理](#subtree-管理)
  - [规范驱动开发](#规范驱动开发)
- [AI 开发核心概念](#ai-开发核心概念)
  - [Skills（技能系统）](#skills技能系统)
  - [Commands（自定义命令）](#commands自定义命令)
  - [Hooks（生命周期钩子）](#hooks生命周期钩子)
  - [MCP（Model Context Protocol）](#mcpmodel-context-protocol)
- [项目架构](#项目架构)
- [快速开始](#快速开始)
- [工作流程](#工作流程)
- [开发指南](#开发指南)
- [最佳实践](#最佳实践)
- [相关资源](#相关资源)

---

## 简介

AI Boilerplate 是一个面向 AI 辅助开发的全栈脚手架，集成了管理后台、后端服务和移动端应用三大子项目，为全栈开发团队提供标准化的快速开发解决方案。通过 AI 智能辅助和规范化工作流程，大幅提升开发效率，降低重复劳动，让开发者专注于核心业务逻辑。

本项目采用 Git Subtree 管理三个独立子项目：基于 Vue 3 + Ant Design 的管理后台、基于 Go + Kratos 的微服务后端、基于 UniApp 的跨平台移动应用。通过可组合的 Agents、Skills、Commands、Hooks 等机制（按所用 AI 工具的配置方式映射），实现从产品需求到代码交付的全流程 AI 辅助开发。

核心价值在于提供了一套完整的开发工作流和工具链，包括需求分析、PRD 生成、原型设计、数据库设计、代码生成、自动化测试等功能。适用于需要快速构建企业级应用的全栈开发团队，特别是对开发效率和代码质量有较高要求的团队。

---

## 项目亮点

- **AI 原生工作流**：命令模板、Skills、Hooks 等按工具配置方式组合使用，从需求澄清到上线全流程 AI 辅助。
- **三端一体架构**：Admin、Backend、App 拆分为独立子仓，版本管理与协作边界清晰。
- **规范驱动交付**：OpenSpec + Proposal 流程把控需求和验收，所有变更都可追溯。
- **模板与生成并行**：成熟模板负责底座，传统代码生成覆盖重复任务，AI 聚焦业务逻辑。
- **可组合技能系统**：Skill 即能力单元，可按需扩展，持续沉淀团队最佳实践。

---

## 子项目速览

| 模块 | 技术栈 | 核心能力 | 仓库路径 |
|------|--------|----------|----------|
| Admin 管理后台 | Vue 3 · TypeScript · Ant Design Vue · Pinia · Vite | RBAC、动态路由、国际化、多租户、模块化 | `ai-boilerplate-admin` |
| Backend 服务端 | Go 1.24 · Kratos · PostgreSQL · Redis · gRPC/HTTP | DDD 分层、代码生成、任务队列、可观测性 | `ai-boilerplate-backend` |
| App 移动端 | UniApp 3 · Vue 3 · TypeScript · UnoCSS | 多端适配、离线策略、性能优化模板 | `ai-boilerplate-app` |

三个子项目均可单独开发与部署，主仓库统一维护 AI 工作流、规范与工具链，确保跨团队协作体验一致。

---

## AI 工具适配

本项目 **不绑定某一款 AI 编程工具**，而是围绕现代 AI 编程工具普遍具备的四类能力来组织工作流：`Agents / Skills / Commands / Hooks`。目前主流工具（如 Cursor、Claude Code、Codex CLI、OpenCode 等）都支持这些能力或提供等价机制，因此可以直接复用这套方法论与目录结构。

- **Agents（工作流/角色/任务编排）**：把需求拆成可执行的子任务（后端/前端/移动端/测试等），并形成稳定的协作套路。本仓库主要通过 Commands + Skills 来承载这些“工作流角色”（`.claude/agents/` 当前为空）。
- **Skills（技能/能力单元）**：沉淀可复用流程与最佳实践（例如需求澄清、数据库设计、CRUD 生成、契约测试）。技能规范位于 `.claude/skills/<skill>/SKILL.md`。
- **Commands（命令/模板入口）**：把常用流程封装成可调用入口（如 `/backend-dev`），在一个入口里编排多个技能与输出物。命令定义位于 `.claude/commands/*.md`。
- **Hooks（守卫/自动化规则）**：在关键节点自动触发检查或路由。本仓库默认启用两个 Hook（见 `.claude/settings.json`），用于“技能提示”和“完成通知”。

落地上，`.claude/` 目录提供一份可参考的组织方式：在不同工具中可映射到其对应的 Rules/Prompts/Workflows/Extensions；如果你不想引入任何工具侧配置，也可以完全忽略它，按 README 中的命令在终端运行即可。

<details>
<summary>展开：本仓库内置的 Commands / Skills / Hooks 清单（以 <code>.claude/</code> 为准）</summary>

**Commands（入口命令）**

| 命令 | 作用 | 主要编排的技能 | 定义文件 |
|---|---|---|---|
| `/requirement` | 需求澄清 → PRD → 原型交付 | `product-requirements`、`prototype-design` | `.claude/commands/requirement.md` |
| `/prd-to-test` | PRD 生成测试用例 | `prd-to-testcase` | `.claude/commands/prd-to-test.md` |
| `/backend-dev` | 后端开发工作流（CRUD/业务/优化） | `backend-database`、`backend-crud`、`api-schema-test`、`tech-decision`、`interview` | `.claude/commands/backend-dev.md` |
| `/admin-dev` | 管理后台开发工作流（CRUD/业务/重构） | `admin-dev`、`tech-decision`、`interview` | `.claude/commands/admin-dev.md` |
| `/app-dev` | 移动端开发工作流（页面/适配/优化） | `app-dev`、`tech-decision`、`interview` | `.claude/commands/app-dev.md` |
| `/webapp-test` | 基于测试用例的 Web 自动化测试（Playwright） | `webapp-testing` | `.claude/commands/webapp-test.md` |

**OpenSpec（规范驱动）命令**
- `OpenSpec: Proposal`：新建变更提案（只写文档，不写代码）— `.claude/commands/openspec/proposal.md`
- `OpenSpec: Apply`：按提案实现并同步任务清单 — `.claude/commands/openspec/apply.md`
- `OpenSpec: Archive`：部署后归档并更新 specs — `.claude/commands/openspec/archive.md`

**Skills（能力单元）**
- 位置：`.claude/skills/<skill>/SKILL.md`（每个技能包含工作流、目录结构、脚本入口与注意事项）
- 触发：默认 Hook 会根据关键词提示你阅读相关技能文件（不会自动改代码）

**Hooks（自动触发）**
- `UserPromptSubmit → skill-forced-eval`：当用户输入不是斜杠命令时，根据关键词输出“建议阅读的技能文件列表” — `.claude/hooks/skill-forced-eval.js`
- `Stop → stop`：当一次任务结束时，统计 `git status --porcelain` 并尝试通过 `terminal-notifier` 发送系统通知（macOS）— `.claude/hooks/stop.js`
</details>

<details>
<summary>展开：配置文件在哪里（<code>.claude/settings*.json</code> / <code>.mcp.json</code>）</summary>

- `.claude/settings.json`：Hook 绑定（`UserPromptSubmit`、`Stop`）以及启用的插件（例如 LSP：`gopls`、`vtsls`）。
- `.claude/settings.local.json`：本地权限/白名单配置（不同工具字段可能不同）。建议仅在本地使用，不要提交生产凭证或长期有效 Token。
- `.mcp.json`：MCP Servers 配置（本仓库目前包含 `chrome-devtools` 与 `dbhub`）。
</details>

---

## 快速开始（TL;DR）

> 面向第一次上手：先把三端跑起来，再深入阅读后面的工作流与规范。

```bash
# 1) 克隆主仓库
git clone git@github.com:fzf-labs/ai-boilerplate.git
# 或使用 HTTPS：
# git clone https://github.com/fzf-labs/ai-boilerplate.git
cd ai-boilerplate

# 2) 安装依赖（按需进入对应子项目）
cd ai-boilerplate-admin && pnpm install && cd ..
cd ai-boilerplate-backend && go mod download && make init && cd ..
cd ai-boilerplate-app && pnpm install && cd ..

# 3) 启动（分别在不同终端）
# 终端 1：
(cd ai-boilerplate-admin && pnpm dev)
# 终端 2：
(cd ai-boilerplate-backend && make run)
# 终端 3：
(cd ai-boilerplate-app && pnpm dev:h5)
```

如果你的 AI 工具没有斜杠命令的输入形式（例如 `/backend-dev`），照常执行以上命令即可；后续章节中的斜杠命令写法可以当作「提示词模板」使用。

---

## 核心概念

### 模板编程（项目初始化）

基于预定义的项目模板/脚手架进行项目初始化，确保项目结构、配置文件、基础代码的一致性和标准化。本项目为前端、后端、移动端分别维护了一套经过验证的通用模板，每个模板都包含了完整的项目结构、配置文件、依赖管理、构建脚本等基础设施。

<details>
<summary>展开：为什么使用</summary>

- **提升启动速度**：避免从零开始搭建项目，新项目几分钟内即可开始业务开发
- **保证一致性**：所有项目使用统一的结构和规范，降低团队协作成本
- **最佳实践**：模板代码经过团队验证和优化，包含了行业最佳实践
- **降低技术债务**：避免临时搭建带来的架构缺陷和技术积累不足
- **快速迭代**：模板更新后，所有使用该模板的项目都能受益
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **降低理解成本**：统一的项目结构让 AI 更快理解代码组织和依赖关系，减少上下文学习的 Token 消耗
- **提高生成质量**：模板中的规范与最佳实践引导 AI 生成更符合标准的代码，降低错误率
- **减少幻觉**：明确的目录结构与命名规范限制“创作空间”，避免生成不符合项目规范的代码
- **加速工作流**：AI 无需从零分析项目结构，可直接基于模板理解架构并快速定位修改点
- **统一团队认知**：所有成员基于同一套模板协作，AI 对不同成员产出的理解更一致
</details>

<details>
<summary>展开：实际示例</summary>

```bash
# 1. 克隆后端模板仓库作为新项目基础
git clone https://github.com/fzf-labs/ai-boilerplate-backend.git my-service
cd my-service

# 2. 模板已包含完整的 Kratos 微服务架构
# internal/
#   ├── biz/           # 业务逻辑层
#   ├── data/          # 数据访问层
#   └── service/       # 服务层
# configs/             # 配置文件
# api/                 # Proto API 定义
# go.mod               # Go 模块依赖
# Makefile             # 构建脚本

# 3. 修改项目配置和包名后，即可开始业务开发
# 无需搭建基础架构，直接在现有结构上添加业务代码
```
</details>

### 传统代码生成

基于预定义模板的静态代码生成，通过专门的工具或脚本从配置文件或规范文件自动生成标准化代码。这种方式速度快且可预测，适合生成重复性高、结构固定的代码片段。

<details>
<summary>展开：为什么使用</summary>

- **提高效率**：避免手动编写大量重复代码，大幅减少工作量
- **减少错误**：自动生成的代码经过充分测试，减少人为错误
- **保持一致性**：所有生成的代码遵循相同的模式和规范
- **易于维护**：模板更新后，重新生成代码即可获得改进
- **节省时间**：将开发者从繁琐的代码编写中解放出来，专注于业务逻辑
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **补足能力边界**：处理标准化且要求严谨的任务（如 Protobuf / Wire 等代码生成）
- **减少 Token 消耗**：重复、可预测的样板代码交给生成器而非 AI
- **提升可靠性**：生成器输出稳定且符合规范，降低 AI 误差与幻觉风险
- **让 AI 聚焦业务**：AI 主要负责需求理解、业务逻辑与边界处理
</details>

<details>
<summary>展开：实际示例</summary>

```proto
syntax = "proto3";
package api.v1;

service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
}

message GetUserRequest {
  int64 id = 1;
}

message GetUserResponse {
  User user = 1;
}
```

```bash
# 使用代码生成工具生成服务代码
make api
```

- 自动生成示例（以 Kratos 工具链为例）：
  - `api/user/v1/user.pb.go`：Protobuf 消息定义
  - `api/user/v1/user_grpc.pb.go`：gRPC 服务端代码
  - `api/user/v1/user_http.pb.go`：HTTP 服务端代码

- 生成产物可直接使用，无需手写重复代码。
</details>

### Subtree 管理

通过 Git Subtree 机制将多个独立仓库组合成一个主仓库，每个子项目的代码直接合并到主仓库中。与 Submodule 不同，Subtree 将子项目的完整历史记录合并到主仓库，使得克隆和使用更加简单。

<details>
<summary>展开：为什么使用 Subtree</summary>

- **独立开发**：前端、后端、移动端团队可以独立迭代，互不干扰
- **灵活版本**：每个子项目可以有自己的版本号和发布节奏
- **减少冲突**：避免频繁的跨团队代码合并冲突
- **职责清晰**：每个团队专注于自己的子项目，降低管理复杂度
- **简化克隆**：克隆主仓库即可获得所有代码，无需额外初始化子模块
- **双向同步**：可以从主仓库推送更改到子仓库，也可以从子仓库拉取更新
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **降低上下文复杂度**：AI（和开发者）可聚焦当前子项目，减少不相关文件干扰
- **提高响应速度**：独立子仓减少扫描范围，加快定位与生成
- **降低误操作风险**：边界清晰，减少跨项目改动与冲突
- **分阶段 AI 辅助**：不同子项目可采用不同提示词/规则/工作流
- **完整历史记录**：AI 可以访问子项目的完整提交历史，更好地理解代码演进
</details>

<details>
<summary>展开：快速开始</summary>

项目提供了 Makefile 简化 Subtree 管理操作：

```bash
# 查看所有可用命令
make help

# 查看 subtree 配置
make subtree-list

# 查看 subtree 状态
make subtree-status

# 更新单个 subtree
make subtree-pull-backend
make subtree-pull-admin
make subtree-pull-app

# 更新所有 subtree
make subtree-pull-all

# 推送单个 subtree 的更改到远程
make subtree-push-backend
make subtree-push-admin
make subtree-push-app

# 推送所有 subtree 的更改
make subtree-push-all

# 查看单个 subtree 的差异
make subtree-diff-backend

# 检查工作区是否有未提交的更改
make subtree-check-dirty
```
</details>

<details>
<summary>展开：手动操作示例</summary>

如果需要手动操作 Subtree（不使用 Makefile）：

```bash
# 1. 添加 subtree（首次使用）
git subtree add --prefix=ai-boilerplate-backend \
  git@github.com:fzf-labs/ai-boilerplate-backend.git master --squash

# 2. 从远程拉取 subtree 更新
git subtree pull --prefix=ai-boilerplate-backend \
  git@github.com:fzf-labs/ai-boilerplate-backend.git master --squash

# 3. 推送 subtree 更改到远程
git subtree push --prefix=ai-boilerplate-backend \
  git@github.com:fzf-labs/ai-boilerplate-backend.git master

# 4. 在主仓库中修改子项目代码
cd ai-boilerplate-backend
# 修改代码...
git add .
git commit -m "feat: add new feature"

# 5. 推送更改到子仓库
cd ..
make subtree-push-backend
```
</details>

### 规范驱动开发

通过 OpenSpec 框架实现需求-设计-代码的闭环管理，在开发新功能前先创建正式的需求提案，包含详细的规格说明、实现任务清单和验收标准，通过评审后才能进入开发阶段。

<details>
<summary>展开：为什么使用</summary>

- **需求清晰**：确保需求描述明确、无歧义，减少后期返工
- **可追溯性**：每个功能都有完整的提案文档，便于理解和维护
- **变更可控**：所有变更都经过正式流程，避免随意修改
- **团队协作**：规范化的流程适合多人协作的大型项目
- **知识沉淀**：归档的提案成为团队的知识库
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **明确任务边界**：以规格与任务清单作为“唯一真相”，减少遗漏/越界
- **提供高质量上下文**：提案文档让 AI（和团队成员）更快对齐需求与影响范围
- **降低误解风险**：标准化表述减少歧义，提升生成准确度
- **便于评审与沉淀**：可用于代码审查、测试用例生成与风险评估，长期形成知识库
</details>

<details>
<summary>展开：实际示例</summary>

```bash
# 1. 创建功能提案
openspec create add-payment-feature

# 2. 编写提案文件
openspec/changes/add-payment-feature/
├── proposal.md        # 为什么要改、改什么、影响范围
├── tasks.md          # 实现清单（可勾选的任务列表）
└── specs/
    └── payment/
        └── spec.md   # 需求规格说明（ADDED/MODIFIED/REMOVED）

# 3. 提案内容示例
# proposal.md:
# ## Why
# 用户需要在线支付功能以完成订单闭环
#
# ## What Changes
# - 支持支付宝和微信支付
# - 订单状态流转
# - 支付回调处理
#
# ## Impact
# - Affected specs: order, payment
# - Affected code: internal/service/order, internal/service/payment

# 4. 提交评审
openspec validate add-payment-feature --strict

# 5. 开发实现（按 tasks.md 逐项完成）
# - [x] 设计支付表结构
# - [x] 实现支付宝 SDK 集成
# - [ ] 实现微信 SDK 集成
# - [ ] 订单状态更新逻辑

# 6. 部署后归档
openspec archive add-payment-feature --yes
```
</details>

---

## AI 开发核心概念

### Skills（技能系统）

专业化的技能集合，封装了特定领域的知识、最佳实践和工具链。每个技能专注于解决特定类型的问题，如数据库设计、代码生成、原型设计、技术选型等。技能可以独立使用，也可以由 AI 在工作流中自动编排调用，形成复杂的开发流程。

> 说明：本仓库的技能文档位于 `.claude/skills/<skill>/SKILL.md`。部分技能最初来源于 `ai-boilerplate` 相关模板/项目，文档里的路径示例（如 `ai-boilerplate-backend/`）在本仓库通常对应子模块目录（如 `ai-boilerplate-backend/`），以实际目录结构为准。

<details>
<summary>展开：常见路径映射（技能文档示例 → 本仓库实际位置）</summary>

| 技能文档里常见路径示例 | 本仓库对应位置 |
|---|---|
| `ai-boilerplate-backend/...` | `ai-boilerplate-backend/...` |
| `ai-boilerplate-backend/doc/sql/ai_boilerplate/` | `ai-boilerplate-backend/doc/sql/ai_boilerplate/` |
| `ai-boilerplate-backend/doc/swagger/...` | `ai-boilerplate-backend/doc/swagger/...` |
| `apps/web-antd/...` | `ai-boilerplate-admin/apps/web-antd/...` |
| `src/pages/...`（uni-app） | `ai-boilerplate-app/src/pages/...` |
</details>

<details>
<summary>展开：本仓库内置 Skills 清单（按子项目/用途分组）</summary>

**产品与设计**
- `product-requirements`：交互式需求澄清与 PRD 生成（质量评分 90+ 门槛），输出 `docs/{feature}-prd.md`
- `prototype-design`：从 PRD 生成高保真交互原型（HTML/CSS/JS），输出 `prototypes/{feature}/`
- `prd-to-testcase`：从 PRD 生成测试用例文档（功能/边界/UI/UX 等），常用与 `/prd-to-test` 搭配
- `ui-ux-pro-max`：UI/UX 风格与组件设计知识库（内置检索脚本），用于视觉/交互优化与原型增强
- `prompt-optimizer`：提示词工程优化（基于框架库），用于统一团队提示词质量

**后端（Go/Kratos）**
- `backend-database`：数据库表/字段/索引设计；可配合 MCP `dbhub` 直接查询/执行 SQL
- `backend-crud`：从表结构生成 CRUD（GORM/DAO/Repo/Proto/Service/Wire 等）
- `api-schema-test`：基于 Swagger/OpenAPI 的契约测试（schemathesis），用于回归/一致性验证
- `bug-detective`：系统化排障流程（日志、定位、数据库/缓存/权限常见问题）
- `tech-decision`：技术选型对比与决策（按评估维度输出建议）

**管理后台（Admin）**
- `admin-dev`：管理后台 CRUD/业务页开发规范与目录约定（Vue3 + Ant Design Vue 等）

**移动端（App / UniApp）**
- `app-dev`：UniApp 多端页面开发/适配/性能优化工作流（Vue3 + TS + Pinia）

**工程协作**
- `git-workflow`：分支/提交/合并/冲突处理建议与惯例
- `skill-creator`：新建/维护技能的指导（如何组织文档、脚本与资源）
- `interview`：需求探索与澄清对话（WHY→WHAT），用于避免“做错东西”
</details>

<details>
<summary>展开：Skills 列表（对齐 <code>.claude/skills/</code>）</summary>

| Skill | 主要用途 | 典型场景 | 定义文件 |
|---|---|---|---|
| `product-requirements` | 需求澄清与 PRD 生成（质量评分门槛） | 新功能规划、需求不清晰 | `.claude/skills/product-requirements/SKILL.md` |
| `prototype-design` | PRD → 高保真交互原型 | 快速原型验证、评审材料 | `.claude/skills/prototype-design/SKILL.md` |
| `prd-to-testcase` | PRD → 测试用例文档 | PRD 覆盖测试、回归用例沉淀 | `.claude/skills/prd-to-testcase/SKILL.md` |
| `ui-ux-pro-max` | UI/UX 设计知识库与检索脚本 | 视觉风格、组件/布局优化 | `.claude/skills/ui-ux-pro-max/SKILL.md` |
| `prompt-optimizer` | 提示词工程优化（框架库） | 规范团队提示词、提高稳定性 | `.claude/skills/prompt-optimizer/SKILL.md` |
| `backend-database` | PostgreSQL 表/字段/索引设计 | 建表、加字段、索引策略 | `.claude/skills/backend-database/SKILL.md` |
| `backend-crud` | 后端 CRUD 骨架生成（含 Proto/Wire） | 新表 CRUD、字段变更后更新 | `.claude/skills/backend-crud/SKILL.md` |
| `api-schema-test` | Swagger/OpenAPI 契约测试（schemathesis） | 验证接口实现与文档一致 | `.claude/skills/api-schema-test/SKILL.md` |
| `tech-decision` | 技术选型对比与决策 | 方案评估、框架/库选择 | `.claude/skills/tech-decision/SKILL.md` |
| `bug-detective` | 系统化排障与调试流程 | 报错排查、性能问题定位 | `.claude/skills/bug-detective/SKILL.md` |
| `admin-dev` | 管理后台页面开发规范 | CRUD 页面、权限与路由 | `.claude/skills/admin-dev/SKILL.md` |
| `app-dev` | UniApp 多端页面开发工作流 | 列表/表单/详情、多端适配 | `.claude/skills/app-dev/SKILL.md` |
| `webapp-testing` | Playwright Web 测试工具箱 | E2E 流程验证、截图/日志 | `.claude/skills/webapp-testing/SKILL.md` |
| `git-workflow` | Git 工作流与最佳实践 | 分支/提交/合并/冲突处理 | `.claude/skills/git-workflow/SKILL.md` |
| `skill-creator` | 创建/维护 Skills 的指南 | 新增技能、沉淀流程 | `.claude/skills/skill-creator/SKILL.md` |
| `interview` | 需求探索与澄清对话 | 需求含糊、需要方案建议 | `.claude/skills/interview/SKILL.md` |
</details>

<details>
<summary>展开：怎么用 Skills（两种方式）</summary>

1) **由 Commands 编排调用**：例如 `/backend-dev` 会按场景组合 `backend-database`、`backend-crud`、`api-schema-test` 等技能。
2) **直接使用 Skills**：在对话中点名（例如“用 tech-decision 帮我选型”），或先阅读对应的 `.claude/skills/<skill>/SKILL.md` 并按步骤执行（尤其当你的 AI 工具不支持“技能系统”时）。
</details>

<details>
<summary>展开：重点 Skills 详解（输入/输出/典型用法）</summary>

**`product-requirements`（PRD 生成）**
- 作用：以产品经理视角交互式澄清需求，并用 100 分制质量评分；达到阈值后生成 PRD。
- 输入：用户的功能想法/需求描述（通常由 `/requirement` 触发）。
- 输出：`docs/{feature-name}-prd.md`（包含用户故事、验收标准、约束、风险等）。

**`prototype-design`（原型生成）**
- 作用：把 PRD 转成可交互的高保真 HTML 原型，并建议合适的设计系统（企业微信/iOS/Material/AntDM）。
- 输入：PRD 文档路径（通常由 `/requirement` 第二阶段触发）。
- 输出：`prototypes/{feature}/index.html`、`prototypes/{feature}/README.md`（路径以技能约定为准）。

**`prd-to-testcase`（测试用例生成）**
- 作用：从 PRD 生成覆盖功能/边界/UIUX 的测试用例文档，带需求追溯字段。
- 输入：PRD 文档内容/路径（通常由 `/prd-to-test` 触发）。
- 输出：测试用例文件（默认建议落在 `testcases/`）。

**`backend-database`（数据库设计 / SQL）**
- 作用：设计表结构/字段/索引，生成 SQL；若启用 MCP `dbhub` 可直接查询/执行 SQL 验证。
- 输入：业务字段与约束、是否多租户、关联关系等。
- 输出：SQL（以及可选的 SQL 文件）；无 MCP 时走“输出 SQL → 手动执行”。

**`backend-crud`（CRUD 代码生成）**
- 作用：从表结构生成 GORM/DAO/Repo/Proto/Service/Wire 等骨架代码，并指导运行相关 `make` 目标。
- 输入：表名（可多表）与 API 位置等。
- 输出：后端子项目内的生成代码（目录/命令以技能文档与子项目 Makefile 为准）。

**`api-schema-test`（API 契约测试）**
- 作用：基于 Swagger/OpenAPI 用 schemathesis 做契约测试，验证“文档 = 实现”。
- 输入：Swagger 文件路径、HTTP 方法、目标 URL 等。
- 输出：测试报告/失败用例定位（用于回归与接口一致性）。

**`admin-dev`（管理后台页面开发）**
- 作用：生成/实现标准 CRUD 页面或复杂业务页面；约定页面目录、API 定义、路由、权限点。
- 输入：模块名、后端接口路径、字段类型、权限 code 等。
- 输出：管理后台子项目中的页面/接口/路由配置（以 `.claude/skills/admin-dev/SKILL.md` 为准）。

**`app-dev`（移动端页面开发）**
- 作用：UniApp 页面（列表/详情/表单）开发、多端适配（H5/小程序/App）、性能优化建议。
- 输入：页面类型、接口、目标平台、UI 组件（wot-design-uni、z-paging 等）。
- 输出：移动端子项目的页面与 API 封装（以 `.claude/skills/app-dev/SKILL.md` 为准）。

**`webapp-testing`（Web 自动化测试）**
- 作用：用 Playwright 编写自动化脚本，支持配合 `with_server.py` 托管服务生命周期。
- 输入：被测 URL/启动命令/测试脚本与断言。
- 输出：测试结果、截图、日志（按脚本约定）。

**`interview` / `tech-decision`（澄清与决策）**
- `interview`：用 WHY→WHAT 模型澄清意图，避免误解需求。
- `tech-decision`：按评估维度对比技术方案，给出推荐与权衡。

**`bug-detective` / `git-workflow`（排障与协作）**
- `bug-detective`：复现→日志→定位→分析→修复→验证的排障流程。
- `git-workflow`：分支命名、提交规范、常用 git 操作与冲突处理建议。
</details>

<details>
<summary>展开：为什么使用</summary>

- **知识沉淀**：将领域知识和最佳实践封装为可复用的技能
- **模块化**：技能之间相互独立，可以灵活组合
- **可扩展**：新的技能可以随时添加，持续丰富 AI 能力
- **专业化**：每个技能专注于特定领域，质量更高
- **可维护**：技能的更新和维护独立于整体系统
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **能力单元**：Skill 是 AI 的最小能力单元，通过组合多个技能实现复杂功能
- **知识载体**：每个技能承载特定领域经验，AI 通过调用技能获取专业知识
- **工具集成**：Skill 封装了外部工具和服务的调用逻辑，让 AI 无需直接处理复杂工具
- **质量保证**：技能内部的逻辑经过充分测试，确保 AI 输出的质量
- **灵活组合**：AI 可以根据需求灵活组合不同的技能，形成定制化的解决方案
</details>

<details>
<summary>展开：实际示例</summary>

```bash
# 场景：AI 调用多个技能完成技术选型

# 1. 用户需求
/backend-dev 实现订单支付功能，需要选择支付 SDK

# 2. AI 调用技能链：

# 技能 1：interview（探索方案）
#   AI 分析需求，识别可能的支付方案：
#   - 支付宝官方 SDK
#   - 微信支付官方 SDK
#   - 第三方聚合支付平台（Ping++、易宝支付等）
#   - 各自的优缺点分析

# 技能 2：tech-decision（技术选型）
#   AI 对比多个方案：
#   | 方案 | 优点 | 缺点 | 适用场景 |
#   |------|------|------|---------|
#   | 支付宝SDK | 官方支持稳定 | 仅支持支付宝 | 支付宝为主 |
#   | 微信SDK | 官方支持稳定 | 仅支持微信 | 微信为主 |
#   | 聚合支付 | 多平台统一 | 手续费较高 | 多平台场景 |
#
#   AI 根据项目需求推荐：同时接入支付宝和微信官方 SDK

# 技能 3：backend-database（数据库设计）
#   AI 设计支付相关表：
#   - payment_order（支付订单表）
#   - payment_log（支付日志表）
#   - payment_config（支付配置表）

# 技能 4：backend-crud（代码生成）
#   AI 生成支付服务的 CRUD 代码

# 3. 多个技能协同工作，完成完整的技术选型和开发流程
```
</details>

### Commands（自定义命令）

通过斜杠命令触发的快捷指令，用于启动特定的开发工作流或技能。Command 是用户与 AI 交互的主要接口，每个命令对应一个配置文件，定义了命令的触发条件、调用逻辑和输出格式。命令通常用于编排多个 Skill，并执行特定的工具操作。

> 如果你的 AI 工具没有斜杠命令的输入形式，也可以把命令行当作「提示词模板」直接输入：例如把 `/backend-dev 实现用户认证功能` 当作一段普通提示词使用。

<details>
<summary>展开：本仓库内置 Commands（入口工作流）</summary>

这些命令的定义位于 `.claude/commands/`，用于把多个 Skills 串成可重复执行的“端到端流程”：

- `/requirement`：需求澄清 → PRD → 原型（`.claude/commands/requirement.md`）
- `/backend-dev`：后端开发（CRUD/业务/优化）（`.claude/commands/backend-dev.md`）
- `/admin-dev`：管理后台开发（CRUD/业务/重构）（`.claude/commands/admin-dev.md`）
- `/app-dev`：移动端开发（页面/适配/优化）（`.claude/commands/app-dev.md`）
- `/prd-to-test`：PRD → 测试用例（`.claude/commands/prd-to-test.md`）
- `/webapp-test`：基于测试用例的 Web 自动化测试（Playwright）（`.claude/commands/webapp-test.md`）

OpenSpec 命令位于 `.claude/commands/openspec/`：
- `OpenSpec: Proposal`：新建变更提案（只写 proposal/spec/tasks，不写实现代码）
- `OpenSpec: Apply`：按已批准提案实现，并同步勾选 `tasks.md`
- `OpenSpec: Archive`：部署后归档并回写 specs
</details>

<details>
<summary>展开：各 Command 的输入 / 产出 / 前置</summary>

**`/requirement`**
- 前置：无（建议在项目根目录执行，便于读取上下文）。
- 产出：PRD（`docs/{功能名}-prd.md`）+ 原型（`prototypes/{功能名}/`）。

**`/backend-dev <需求描述>`**
- 前置：后端子项目可编译/可运行；生成类命令通常依赖后端子项目 Makefile（如 `make api`、`make wire` 等）。
- 产出：后端代码变更（CRUD/业务逻辑/Proto/Wire 等），可搭配 `api-schema-test` 做回归。

**`/admin-dev <需求描述>`**
- 前置：管理后台子项目依赖已安装（`pnpm install`），并了解后端接口路径/权限 code。
- 产出：页面组件、API 封装、路由/权限配置（以 `ai-boilerplate-admin` 目录为主）。

**`/app-dev <需求描述>`**
- 前置：移动端子项目依赖已安装（`pnpm install`）；明确目标平台（H5/小程序/App）。
- 产出：页面、组件、接口封装与多端适配代码（以 `ai-boilerplate-app` 目录为主）。

**`/prd-to-test <PRD路径>`**
- 前置：已有 PRD 文档（通常来自 `/requirement`）。
- 产出：测试用例文件（默认建议输出到 `testcases/`，具体格式由命令参数决定）。

**`/webapp-test <用例文件> [--url ...]`**
- 前置：测试用例文件（.md/.json/.xlsx 等），以及可访问的被测 Web 应用（可由命令参数启动或手动启动）。
- 产出：Playwright 执行结果、报告、失败截图等（默认目录见命令说明）。
</details>

<details>
<summary>展开：为什么使用</summary>

- **快速启动**：通过简短的命令快速启动复杂的开发流程
- **记忆友好**：命令名称直观，易于记忆和查找
- **标准化接口**：为常用功能提供统一的入口
- **参数传递**：支持通过命令传递参数和配置
- **可扩展**：可以随时添加新的命令，扩展系统功能
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **用户意图识别**：Command 是用户意图的明确标识，AI 通过命令快速理解用户需求
- **工作流启动器**：Command 将多个 Skill 串起来，形成可重复执行的完整开发工作流
- **参数传递**：Command 可以携带参数，为 AI 提供必要的上下文信息
- **上下文隔离**：不同的命令使用不同的上下文，避免干扰
- **快捷入口**：为常用功能提供快捷方式，提高用户与 AI 的交互效率
</details>

<details>
<summary>展开：实际示例</summary>

```bash
# 场景：使用命令启动完整的开发流程

# 命令 1：/requirement（产品需求分析）
/requirement

# AI 执行流程：
# 1. 调用 product-requirements 技能
# 2. 通过交互式对话收集需求
# 3. 生成 PRD 文档
# 4. 调用 prototype-design 技能
# 5. 生成高保真原型

# 命令 2：/backend-dev（后端开发）
/backend-dev 实现用户认证功能

# AI 执行流程：
# 1. 识别命令：执行 backend-dev 工作流
# 2. 分析需求：用户认证功能
# 3. 调用技能链：
#    - backend-database：设计用户表
#    - backend-crud：生成 CRUD 代码
#    - api-schema-test：测试 API
# 4. 输出结果：代码文件和测试报告

# 命令 3：/admin-dev（前端开发）
/admin-dev 创建用户管理页面

# AI 执行流程：
# 1. 识别命令：执行 admin-dev 工作流
# 2. 分析需求：用户管理页面
# 3. 调用技能链：
#    - 生成列表页面组件
#    - 生成表单组件
#    - 配置路由和权限
# 4. 输出结果：Vue 组件文件

# 命令 4：/webapp-test（Web 自动化测试）
/webapp-test testcases/user-login.json --url http://localhost:5173

# AI 执行流程：
# 1. 调用 webapp-testing 技能
# 2. 使用 Playwright 启动浏览器
# 3. 执行登录流程测试
# 4. 生成测试报告
```
</details>

### Hooks（生命周期钩子）

在特定事件发生时自动执行的脚本或回调函数，用于拦截、评估和修改用户操作或系统行为。Hooks 在关键节点自动触发，如用户提交 Prompt、对话结束等，可以执行验证、路由、日志记录等操作，确保系统的规范性、安全性和可追溯性。

> 本仓库的 Hook 配置位于 `.claude/settings.json`，脚本位于 `.claude/hooks/`。

<details>
<summary>展开：本仓库启用的 Hooks（事件 → 脚本）</summary>

- `UserPromptSubmit` → `node .claude/hooks/skill-forced-eval.js`
  - 触发条件：输入不是 `/xxx` 命令（避免打断已选择的工作流）。
  - 行为：基于关键词输出“建议阅读的技能文件列表”，不自动修改代码。
- `Stop` → `node .claude/hooks/stop.js`
  - 行为：读取 `git status --porcelain` 汇总本次是否有文件变更，并尝试发送桌面通知。
  - 依赖：`node`；`terminal-notifier`（macOS 可选，缺失时只会提示失败，不影响任务）。

禁用方式（按工具支持情况）：
- 直接编辑 `.claude/settings.json`，移除对应事件的 hook 配置。
- 或在你的 AI 工具侧关闭/忽略项目 hooks（不同工具入口不同）。
</details>

<details>
<summary>展开：为什么使用</summary>

- **自动化检查**：在关键节点自动执行检查，避免遗漏
- **流程规范**：强制执行标准流程，确保一致性
- **质量控制**：在输出前进行质量检查，提高代码质量
- **日志记录**：自动记录操作日志，便于审计和追溯
- **灵活扩展**：可以随时添加新的 Hook，扩展系统功能
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **技能提示（关键词路由）**：用户用自然语言提问时，根据关键词提示“建议阅读/使用哪些技能”，降低选错工具的概率
- **完成通知**：一次任务结束后汇总本次是否有文件变更，并发送桌面通知（便于后台长任务）
- **可移植**：不同 AI 工具对 Hooks 的事件模型不同，但“提交前提示 / 完成后通知”的模式基本通用
</details>

<details>
<summary>展开：实际示例</summary>

```bash
# Hook 1：UserPromptSubmit → 技能提示（.claude/hooks/skill-forced-eval.js）
# 用户输入（非斜杠命令）：后端要加一个 phone 字段，顺便把 CRUD 更新一下
#
# 输出示例：
# [技能激活] 检测到 2 个相关技能：backend-database, backend-crud
# 请读取以下技能文件获取规范：
# - .claude/skills/backend-database/SKILL.md
# - .claude/skills/backend-crud/SKILL.md
#
# 说明：
# - 仅在输入不是 `/xxx` 命令时触发（避免打断已选择的工作流）
# - 这是“提示/路由”，不会自动修改代码
#
# Hook 2：Stop → 完成通知（.claude/hooks/stop.js）
# 任务结束后统计 `git status --porcelain`：
# - 无变更：提示“任务完成,无文件变更”
# - 有变更：提示“修改了 N 个文件”
# 并尝试用 `terminal-notifier` 发送桌面通知（macOS）
```
</details>

### MCP（Model Context Protocol）

模型上下文协议，用于扩展 AI 的能力边界，让 AI 能够访问外部工具、服务和数据源。MCP 定义了 AI 与外部系统交互的标准接口，包括文件系统、数据库、API、命令行工具等。通过 MCP，AI 不再局限于代码生成，而是成为能够理解项目上下文、执行实际操作的全栈开发助手。

<details>
<summary>展开：本仓库已配置的 MCP Servers（见 <code>.mcp.json</code>）</summary>

| Server | 主要用途 | 配置位置 | 依赖 |
|---|---|---|---|
| `chrome-devtools` | 连接 Chrome DevTools，辅助页面调试/抓取/自动化排查 | `.mcp.json` | `node`/`npx` |
| `dbhub` | 连接数据库并提供对象检索/执行 SQL（适合做表结构查询、迁移验证） | `.mcp.json` | `node`/`npx`、可访问的 PostgreSQL |

说明：
- `backend-database` 技能会优先尝试使用 `dbhub`（如 `mcp__dbhub__search_objects`、`mcp__dbhub__execute_sql`）来实时查询/执行 SQL。
- MCP 属于“可选增强”：没有 MCP 也可以走“生成 SQL 文件 → 手动执行 → 继续开发”的流程。
</details>

<details>
<summary>展开：MCP 在本仓库的典型用法</summary>

**用 `dbhub` 做数据库实时校验**
- 场景：你希望 AI 在输出 SQL 后，直接查询数据库确认表/字段/索引是否存在，或直接执行迁移。
- 做法：配置 `.mcp.json` 中的 `dbhub` DSN 指向你的本地/测试库；然后让 AI 使用 `mcp__dbhub__search_objects` 查询对象，或用 `mcp__dbhub__execute_sql` 执行 SQL。
- 注意：`.mcp.json` 属于环境配置，建议不要在其中提交生产库凭证；本仓库示例 DSN 仅用于本地开发。

**用 `chrome-devtools` 辅助前端排查**
- 场景：页面渲染/交互问题需要更强的浏览器上下文（DOM、网络、控制台）。
- 做法：启动 Chrome 并打开 DevTools，然后通过 MCP server 让 AI 读取相关信息，辅助定位 selectors、网络请求与页面状态。
</details>

<details>
<summary>展开：为什么使用</summary>

- **扩展能力边界**：让 AI 能够访问和使用外部工具，突破代码生成的局限
- **实时交互**：AI 可以实时查询数据库、调用 API、执行命令，获取最新信息
- **上下文丰富**：AI 可以读取项目文件、配置、日志等，获取完整的上下文
- **自动化执行**：AI 可以直接执行操作，而非仅生成代码让开发者手动执行
- **跨平台集成**：MCP 提供标准接口，易于集成各种外部系统
</details>

<details>
<summary>展开：在 AI 开发中的作用</summary>

- **能力扩展器**：MCP 将 AI 的能力从纯代码生成扩展到全栈开发，包括数据库操作、文件管理、API 调用等
- **上下文提供者**：MCP 让 AI 能够实时访问项目资源，获取最新的上下文信息，避免过时的上下文
- **操作执行者**：AI 可以直接通过 MCP 执行操作，而非仅生成代码，实现真正的自动化开发
- **工具集成器**：MCP 封装了外部工具的调用逻辑，让 AI 无需了解工具细节即可使用
- **实时反馈**：AI 可以通过 MCP 执行操作并获取结果，形成闭环反馈，不断优化输出
</details>

<details>
<summary>展开：实际示例</summary>

```bash
# 场景：AI 通过 MCP 执行完整的数据库操作

# 用户需求：为用户表添加 phone 字段

# AI 通过 MCP 执行以下操作：

# 1. 读取数据库表结构
# MCP 调用：读取数据库元数据
# 结果：
# Table: users
# Columns: id, name, email, created_at, updated_at

# 2. 生成 ALTER TABLE 语句
# AI 基于表结构生成：
# ALTER TABLE users ADD COLUMN phone VARCHAR(20);

# 3. 执行 SQL（通过 MCP）
# MCP 调用：执行 SQL 语句
# 结果：Success

# 4. 更新 GORM Model（通过 MCP）
# MCP 调用：读取文件 internal/data/model/user.go
# 内容：
# type User struct {
#   ID        uint      `gorm:"primarykey"`
#   Name      string    `gorm:"type:varchar(100)"`
#   Email     string    `gorm:"type:varchar(100);uniqueIndex"`
#   CreatedAt time.Time
#   UpdatedAt time.Time
# }

# 5. 修改 Model 文件（通过 MCP）
# AI 生成新内容并写入：
# type User struct {
#   ID        uint      `gorm:"primarykey"`
#   Name      string    `gorm:"type:varchar(100)"`
#   Email     string    `gorm:"type:varchar(100);uniqueIndex"`
#   Phone     string    `gorm:"type:varchar(20)"`
#   CreatedAt time.Time
#   UpdatedAt time.Time
# }

# MCP 调用：写入文件
# 结果：Success

# 6. 重新生成 CRUD 代码
# AI 调用 backend-crud 技能生成新代码

# 7. 运行测试
# MCP 调用：执行 go test
# 结果：PASS

# 8. 完成整个流程，无需用户手动操作
```
</details>

---

## 项目架构

AI Boilerplate 采用 Monorepo + Subtree 的混合架构，主仓库负责协调三个独立的子项目，每个子项目可以独立开发、测试和部署。

> 说明：`.claude/` 目录用于组织 AI 工作流相关的命令/技能/钩子配置；不同 AI 工具的配置方式不同，可按需映射或直接忽略，按 README 的流程运行即可。

```
┌─────────────────────────────────────────────────────┐
│          AI Boilerplate (主仓库)                      │
│         AI Coding Tools + Skills System             │
├─────────────────────────────────────────────────────┤
│  .claude/          openspec/          AGENTS.md      │
│  ├── commands/     ├── project.md                   │
│  ├── skills/       ├── specs/                       │
│  ├── hooks/        └── changes/                     │
│  └── settings.json                                     │
└────────┬─────────────────────┬────────────────────┘
         │                     │
    ┌────▼─────┐         ┌────▼─────┐         ┌────▼─────┐
    │  Admin   │         │ Backend  │         │   App    │
    │  前端    │         │  后端    │         │  移动端   │
    └──────────┘         └──────────┘         └──────────┘
    Vue 3 +              Go 1.24 +           UniApp 3.x
    Ant Design           Kratos v2           Vue 3
    Pinia                PostgreSQL           TypeScript
    Vite                 Redis                Vite 5
    pnpm workspace       gRPC                 Alova
                          HTTP API             wot-design-uni
                                               Pinia
```

### ai-boilerplate-admin：企业级管理后台前端

- **技术栈**：Vue 3 + TypeScript + Ant Design Vue + Pinia + Vite
- **架构**：Monorepo (pnpm workspace)，包含核心功能模块、共享包、UI 组件等
- **功能**：用户管理、权限控制、动态路由、国际化、多租户支持
- **适用场景**：企业级中后台管理系统、数据看板、配置平台

### ai-boilerplate-backend：高性能微服务后端

- **技术栈**：Go 1.24 + Kratos v2 + PostgreSQL + Redis + gRPC + HTTP
- **架构**：DDD 分层架构（Service → Biz → Data），依赖注入（Wire）
- **功能**：RESTful API、gRPC 服务、任务队列、缓存、监控、日志
- **适用场景**：高并发业务系统、微服务架构、API 网关

### ai-boilerplate-app：跨平台移动端应用

- **技术栈**：UniApp 3.x + Vue 3 + TypeScript + Vite + UnoCSS
- **支持平台**：H5、iOS、Android、微信小程序、支付宝小程序、百度小程序等
- **功能**：响应式布局、多平台适配、离线缓存、消息推送
- **适用场景**：ToC 移动应用、ToB 移动办公、跨平台解决方案

### 主仓库职责

- 管理 Subtree 版本和依赖关系
- 提供 AI 辅助开发的工作流和工具链（Skills、Commands、Hooks）
- 维护项目级的规范和最佳实践（OpenSpec）
- 协调跨子项目的开发和发布节奏

---

## 快速开始

### 环境准备

确保安装以下工具：

| 工具 | 版本要求 |
|------|---------|
| Node.js | >= 20 |
| pnpm | >= 9 |
| Go | >= 1.24 |
| PostgreSQL | >= 13 |
| Redis | >= 6.0 |
| Git | 最新稳定版 |

### 克隆仓库

```bash
# 克隆主仓库（包含所有子项目代码）
git clone git@github.com:fzf-labs/ai-boilerplate.git
# 或使用 HTTPS：
# git clone https://github.com/fzf-labs/ai-boilerplate.git
cd ai-boilerplate

# Subtree 方式下，所有代码已包含在主仓库中，无需额外初始化
# 如需更新子项目，使用 Makefile 命令：
make subtree-pull-all
```

### 安装依赖

```bash
# Admin 前端
cd ai-boilerplate-admin
pnpm install
cd ..

# Backend 后端
cd ai-boilerplate-backend
go mod download
make init  # 安装开发工具（protoc、wire、golangci-lint 等）
cd ..

# App 移动端
cd ai-boilerplate-app
pnpm install
cd ..
```

### 启动开发服务器

```bash
# Admin 前端（http://localhost:5173）
cd ai-boilerplate-admin
pnpm dev

# Backend 后端（HTTP: 8000, gRPC: 9000）
cd ai-boilerplate-backend
make run
# 或启动依赖服务（PostgreSQL、Redis）
docker-compose up -d

# App 移动端（H5: http://localhost:3000）
cd ai-boilerplate-app
pnpm dev:mp        # 微信小程序
pnpm dev:h5        # H5
pnpm dev:app       # App（需要 HBuilderX）
```

### 常用命令速查

#### Admin 前端

```bash
pnpm dev              # 开发服务器
pnpm build            # 生产构建
pnpm lint             # 代码检查
pnpm type-check       # 类型检查
```

#### Backend 后端

```bash
make api              # 生成 Proto 代码
make wire             # 生成依赖注入代码
make gen              # 生成 GORM 代码
make run              # 启动服务
make build            # 构建二进制
make test             # 运行测试
make lint             # 代码检查
```

#### App 移动端

```bash
pnpm dev              # H5 开发
pnpm dev:mp           # 小程序开发
pnpm dev:app          # App 开发
pnpm build:h5         # H5 构建
pnpm build:mp         # 小程序构建
pnpm build:app        # App 构建
```

---

## 工作流程

AI Boilerplate 提供了一套完整的开发工作流，覆盖从产品需求到代码交付的全过程。每个工作流都由专业的技能驱动，支持 AI 辅助和自动化。

### 产品需求流程

```
用户想法 → /requirement → PRD 生成 → 原型设计 → 技术评审
```

1. **启动需求分析**：使用 `/requirement` 命令启动产品需求流程
2. **交互式澄清**：通过对话明确需求细节，AI 会对需求质量进行评分（满分 100），达到 90 分以上才进入下一步
3. **生成 PRD 文档**：自动生成专业的产品需求文档，默认保存到 `docs/{功能名}-prd.md`
4. **原型设计**：调用 `prototype-design` 技能生成高保真交互原型，支持多种设计系统（企业微信、iOS、Material Design 等）
5. **原型验证**：团队评审原型，确认需求无误后进入开发阶段

### 后端开发流程

```
需求分析 → 数据库设计 → CRUD 生成 → 业务逻辑 → 测试验证
```

1. **启动后端开发**：使用 `/backend-dev <需求描述>` 命令
2. **数据库设计**：如需新建表，调用 `backend-database` 技能设计表结构、字段、索引，生成 SQL 并执行
3. **代码生成**：调用 `backend-crud` 技能生成 Model、DAO、Repository、Service、Proto 文件
4. **编译代码**：执行 `make api` 编译 Proto，`make wire` 生成依赖注入代码
5. **业务逻辑实现**：根据需求自定义业务逻辑，遵循 Service → Biz → Data 分层架构
6. **测试验证**：使用 `api-schema-test` 技能进行自动化测试，或启动服务手动测试

### 前端开发流程

```
需求分析 → 页面生成 → API 对接 → 测试验证
```

1. **启动前端开发**：使用 `/admin-dev <需求描述>` 命令
2. **场景识别**：AI 自动识别是标准 CRUD 页面还是复杂业务页面
3. **页面生成**：生成页面组件、路由配置、API 接口定义、权限配置
4. **业务逻辑实现**：实现表单验证、列表筛选、数据展示、交互功能
5. **API 对接**：对接后端接口，处理请求参数、响应数据、错误提示
6. **测试验证**：启动开发服务器，测试 CRUD 功能、权限控制、多语言支持

### 移动端开发流程

```
需求分析 → 页面开发 → 多平台适配 → 测试验证
```

1. **启动移动端开发**：使用 `/app-dev <需求描述>` 命令
2. **页面类型识别**：AI 识别是列表页、详情页、表单页还是复杂业务页面
3. **页面开发**：生成页面组件、API 接口、状态管理（Pinia Store）
4. **多平台适配**：使用条件编译（#ifdef H5、#ifdef MP-WEIXIN）处理平台差异
5. **性能优化**：实现图片懒加载、分页加载、缓存策略
6. **测试验证**：在各平台测试（H5、微信小程序、App），确保功能正常

### 规范驱动开发流程

```
需求提案 → 规范评审 → 代码实现 → 归档管理
```

1. **创建提案**：在 `openspec/changes/<change-id>/` 目录创建提案，包含：
   - `proposal.md`：为什么要改、改什么、影响范围
   - `tasks.md`：实现清单，按步骤列出所有任务
   - `specs/<capability>/spec.md`：需求变更说明（ADDED、MODIFIED、REMOVED）
2. **规范评审**：团队评审提案，确认需求清晰、方案可行
3. **代码实现**：按照任务清单逐项实现，完成后标记为完成
4. **验证测试**：运行 `openspec validate <change-id> --strict` 验证提案完整性
5. **归档管理**：部署后归档到 `openspec/changes/archive/YYYY-MM-DD-<change-id>/`，更新 `specs/` 目录

---

## 开发指南

### AI 辅助开发命令

> 说明：下列示例以 Slash Commands（斜杠命令）写法呈现；如果你的工具没有该输入形式，请将整行内容当作提示词直接输入，并补充必要上下文（例如：表结构、接口约定、页面截图等）。

```bash
# 产品阶段
/requirement                 # 启动产品需求分析流程，生成 PRD 和原型

# 开发阶段
/backend-dev <需求描述>      # 启动后端开发流程
/admin-dev <需求描述>        # 启动管理后台开发流程
/app-dev <需求描述>          # 启动移动端开发流程

# 测试阶段
/prd-to-test <PRD路径>       # 从 PRD 生成测试用例（默认输出到 testcases/）
/webapp-test <用例文件>      # 基于测试用例执行 Web 自动化测试（Playwright）

# Skills（能力单元）
# - 可在对话中直接点名（例如“用 tech-decision 帮我选型”）
# - 或先阅读 `.claude/skills/<skill>/SKILL.md` 再按步骤执行
interview                    # 结构化澄清需求/探索方案
tech-decision                # 技术选型决策，对比多个方案
bug-detective                # 系统化问题调试与故障排查
ui-ux-pro-max                 # UI/UX 设计与优化
git-workflow                 # Git 工作流与版本控制建议
```

### 后端开发指南

#### 新建 CRUD 接口

```bash
# 1. 启动后端开发
/backend-dev 为商品表生成 CRUD 接口

# 2. AI 会自动完成：
# - 设计数据库表结构（调用 backend-database）
# - 生成 CRUD 代码（调用 backend-crud）
# - 编译 Proto 和依赖注入代码
# - 运行 API 测试（调用 api-schema-test）
```

#### 自定义业务逻辑

```bash
# 1. 启动后端开发
/backend-dev 实现订单支付功能，支持支付宝和微信支付

# 2. AI 会执行：
# - 调用 interview 探索设计方案
# - 调用 tech-decision 选择支付 SDK
# - 设计数据库表（支付记录、回调日志）
# - 实现 Service + Biz + Data 层代码
# - 配置异步任务处理回调
# - 运行测试验证
```

#### 数据库字段修改

```bash
/backend-dev user 表需要添加 phone 字段

# AI 会执行：
# - 生成 ALTER TABLE 语句
# - 更新 GORM Model
# - 重新生成 CRUD 代码
# - 运行测试验证
```

### 前端开发指南

#### 新建管理页面

```bash
# 1. 启动前端开发
/admin-dev 创建部门管理页面

# 2. AI 会自动完成：
# - 生成列表页面（表格、搜索、分页）
# - 生成表单组件（新增、编辑）
# - 配置路由和权限
# - 生成 API 接口定义
# - 提示测试验证
```

#### 复杂业务页面

```bash
/admin-dev 实现 AI 对话页面，支持多轮对话和角色切换

# AI 会执行：
# - 调用 interview 探索设计方案
# - 组件拆分（对话列表、消息输入、角色选择器）
# - 设计状态管理（Pinia store）
# - 实现 WebSocket 对接和流式响应
# - 测试验证
```

### 移动端开发指南

#### 标准列表页

```bash
/app-dev 创建用户列表页，支持下拉刷新和上拉加载

# AI 会执行：
# - 生成列表页面组件
# - 集成 z-paging 分页组件
# - 实现 API 接口
# - 添加搜索筛选功能
# - 多平台适配测试
```

#### 表单页

```bash
/app-dev 创建用户信息编辑表单

# AI 会执行：
# - 生成表单页面
# - 使用 wot-design-uni 表单组件
# - 实现表单验证
# - 对接后端接口
# - 测试验证
```

---

## 最佳实践

### AI 开发建议

1. **需求不清晰时先用 `/requirement`**：不要急着编码，先通过交互式对话明确需求，确保 PRD 质量评分 ≥ 90
2. **善用技能，而非手动编码**：复杂功能优先调用相应技能（如 `backend-dev`、`admin-dev`），而非从头开始写代码
3. **保持交互式对话**：及时向 AI 反馈代码执行结果、错误信息、优化建议，形成闭环
4. **理解 AI 的局限**：AI 是智能助手，不是万能工具，开发者仍需负责架构设计、代码审查和决策
5. **增量式开发**：将大需求拆解为小任务，逐步完成，每步都测试验证

### 代码规范

1. **遵循项目既定规范**：使用项目现有的代码风格、组件和工具，避免引入不必要的技术栈
2. **TypeScript 优先**：所有代码使用 TypeScript，提供类型安全，避免运行时错误
3. **后端分层架构**：遵循 Kratos 分层架构（Service → Biz → Data），职责清晰，避免跨层调用
4. **前端组件化**：Vue 组件使用 Composition API、PascalCase 命名，避免全局污染
5. **移动端响应式**：使用 rpx 单位适配不同屏幕，关键元素使用固定尺寸
6. **错误处理**：统一的错误提示和加载状态，避免静默失败

### 团队协作

1. **使用 OpenSpec 管理需求**：新功能先创建 change proposal，评审通过后进入开发，部署后归档
2. **Subtree 独立开发**：各子项目独立开发，可通过 Subtree 双向同步，定期推送更新到子仓库
3. **API 变更通知**：后端 API 变更需同步通知前端和移动端团队，更新接口文档
4. **代码审查**：重要功能必须经过代码审查，确保代码质量和安全性
5. **版本管理**：使用语义化版本号（Semantic Versioning），明确破坏性变更

### 性能优化

#### 后端优化

- 使用 Preload 避免 N+1 查询
- 添加适当的数据库索引
- 使用 Redis 缓存热点数据
- 异步处理耗时任务（Asynq）

#### 前端优化

- 路由懒加载，减少首屏加载时间
- 使用虚拟滚动处理长列表
- 图片懒加载和压缩
- 防抖节流处理频繁操作

#### 移动端优化

- 图片压缩和懒加载
- 长列表分页加载
- 使用 UnoCSS 减少 CSS 体积
- 开启 Pinia 持久化缓存

### 安全注意事项

1. **权限控制**：所有 API 接口都需进行权限验证，前端页面和按钮权限通过 v-access 指令控制
2. **SQL 注入防护**：使用 GORM 参数化查询，避免拼接 SQL
3. **XSS 防护**：前端使用 Vue 的文本插值和 v-html 时需谨慎，避免直接渲染用户输入
4. **敏感信息**：不要在代码中硬编码密钥、密码等敏感信息，使用环境变量或配置中心
5. **依赖安全**：定期更新依赖包，使用 `npm audit`、`go mod tidy` 检查漏洞

---

## 相关资源

### 项目文档

| 项目 | 链接 |
|------|------|
| **主仓库** | https://github.com/fzf-labs/ai-boilerplate |
| **Admin 前端** | ai-boilerplate-admin/README.md |
| **Backend 后端** | ai-boilerplate-backend/README.md |
| **App 移动端** | ai-boilerplate-app/README.md |

### AI 编程工具（可选）

| 工具 | 链接 |
|------|------|
| **Cursor** | https://cursor.com |
| **Claude Code** | https://claude.ai/code |
| **Codex** | https://github.com/openai/codex |

### 规范与流程

| 资源 | 链接 |
|------|------|
| **OpenSpec 文档** | openspec/AGENTS.md |

### 技术栈文档

| 技术 | 链接 |
|------|------|
| **Vue 3** | https://vuejs.org |
| **Ant Design Vue** | https://antdv.com |
| **Go Kratos** | https://go-kratos.dev |
| **UniApp** | https://uniapp.dcloud.net.cn |
| **PostgreSQL** | https://www.postgresql.org/docs |
| **Redis** | https://redis.io/docs |