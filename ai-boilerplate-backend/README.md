# AI Boilerplate Backend

基于 Kratos 微服务框架构建的 Go 后端服务，提供 HTTP 和 gRPC 双协议支持。

## 技术栈

- **框架**: Kratos v2 (Go-Kratos)
- **语言**: Go 1.24
- **API**: gRPC + HTTP/REST + gRPC-Gateway
- **数据库**: PostgreSQL (GORM)
- **缓存**: Redis (rueidis)
- **任务队列**: Asynq
- **依赖注入**: Wire
- **可观测性**: OpenTelemetry + Prometheus
- **服务发现**: Consul / Etcd / Nacos
- **API 文档**: OpenAPI/Swagger
- **协议**: Protocol Buffers

## 环境要求

- Go >= 1.24
- PostgreSQL >= 13
- Redis >= 6.0
- Make
- Protocol Buffers Compiler (protoc)

## 快速开始

```bash
# 安装依赖工具
make init

# 生成 API 代码
make api

# 生成依赖注入代码
make wire

# 运行服务
make run
```

## 开发命令

### 代码生成

```bash
make init              # 安装开发工具
make api               # 生成 API proto 代码
make wire              # 生成 Wire 依赖注入代码
make gen               # 生成 GORM 数据库代码
```

### 构建和运行

```bash
make build             # 编译二进制文件
make run               # 运行服务
make docker            # 构建 Docker 镜像
```

### 代码质量

```bash
make fmt               # 格式化代码
make lint              # 代码检查
make test              # 运行测试
```

### API 文档

```bash
make swagger           # 生成 Swagger 文档
make apifox            # 同步到 Apifox
```

## 项目结构

```
ai-boilerplate-backend/
├── api/                    # API 定义 (protobuf)
├── cmd/
│   └── server/            # 服务入口
├── configs/               # 配置文件
├── internal/
│   ├── biz/              # 业务逻辑层
│   ├── data/             # 数据访问层
│   ├── service/          # 服务层 (gRPC/HTTP)
│   ├── server/           # 服务器配置
│   └── conf/             # 配置结构
├── third_party/          # 第三方 proto 文件
├── doc/                  # 文档
│   └── swagger/          # Swagger 文档
├── scripts/              # 脚本工具
├── Dockerfile            # Docker 构建文件
├── docker-compose.yml    # Docker Compose 配置
└── Makefile              # 构建脚本
```

## 配置

配置文件位于 `configs/` 目录：

```yaml
# configs/config.yaml
server:
  http:
    addr: 0.0.0.0:8000
  grpc:
    addr: 0.0.0.0:9000

data:
  database:
    driver: postgres
    source: "host=localhost port=5432 user=postgres password=123456 dbname=app sslmode=disable"
  redis:
    addr: localhost:6379
```

## Docker 部署

```bash
# 启动所有服务
docker-compose up -d

# 仅启动依赖服务 (PostgreSQL, Redis)
docker-compose up -d postgres redis

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## API 访问

- HTTP API: http://localhost:8000
- gRPC API: localhost:9000
- Swagger 文档: http://localhost:8000/swagger
- 健康检查: http://localhost:8000/health

## 开发流程

1. 定义 Proto 文件 (`api/`)
2. 生成代码 (`make api`)
3. 实现业务逻辑 (`internal/biz/`)
4. 实现数据层 (`internal/data/`)
5. 实现服务层 (`internal/service/`)
6. 配置依赖注入 (`make wire`)
7. 测试和运行

## License

MIT
