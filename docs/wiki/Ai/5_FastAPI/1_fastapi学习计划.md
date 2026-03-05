# 📅 AI Agent 开发：FastAPI 工程落地 21 天学习计划

> **说明**：本计划侧重于“工程化”，即如何将 AI 逻辑转化为稳定、可用的后端 API 服务。

---

## 🟢 第一阶段：FastAPI 后端基石 (Day 1 - Day 7)
*目标：掌握构建高性能、异步 AI 接口的基础能力。*

- [ ] **Day 1: 环境搭建与基础路由**
    - 掌握 `FastAPI` 实例初始化。
    - 学习编写 `GET` 和 `POST` 接口。
    - 了解 `Uvicorn` 热重载开发模式。
- [ ] **Day 2: Pydantic 数据模型与校验**
    - 定义 `BaseModel` 结构化输入输出。
    - 使用 `Field` 进行数据限制（如温度值 range 0-2）。
    - **关键：** 学习如何将 JSON 自动映射为 Python 对象。
- [ ] **Day 3: 异步编程 (async/await)**
    - 理解同步 `def` 与异步 `async def` 的区别。
    - 学习在 FastAPI 中使用 `httpx` 进行异步 API 调用。
    - 解决并发请求下的阻塞问题。
- [ ] **Day 4: 流式传输 (Streaming Response)**
    - 学习 `StreamingResponse` 对象。
    - 掌握 SSE (Server-Sent Events) 协议。
    - **实战：** 模拟打字机效果的字符流输出。
- [ ] **Day 5: 依赖注入 (Dependency Injection)**
    - 学习 `Depends` 语法。
    - 实现全局配置（Config）和数据库连接池的共享。
- [ ] **Day 6: 错误处理与中间件**
    - 自定义 `HTTPException` 错误返回。
    - 编写跨域中间件 (CORS)，允许前端调用。
- [ ] **Day 7: 自动文档 (Swagger UI)**
    - 学习如何通过代码注释美化 `/docs` 文档。
    - 掌握在 Swagger 界面直接调试接口。

---

## 🔵 第二阶段：Agent 核心逻辑集成 (Day 8 - Day 14)
*目标：将 LLM 的“大脑”接入 FastAPI 接口。*

- [ ] **Day 8: LLM SDK 集成 (OpenAI/Anthropic)**
    - 在 FastAPI 中初始化异步 OpenAI 客户端。
    - 实现首个真正的聊天接口。
- [ ] **Day 9: 结构化输出 (Structured Outputs)**
    - 学习强制 LLM 返回 JSON 格式。
    - 配合 Pydantic 实现模型输出的自动校验。
- [ ] **Day 10: RAG 基础 - 向量库接入**
    - 在 FastAPI 启动时加载向量数据库 (Chroma/FAISS)。
    - 实现简单的“上传文档 -> 向量化 -> 存储”流程。
- [ ] **Day 11: RAG 进阶 - 检索接口**
    - 编写 `/search` 接口实现语义搜索。
    - 学习如何将检索结果注入 Prompt 模板。
- [ ] **Day 12: 工具调用 (Tool Calling) - 理论**
    - 学习如何定义 JSON Schema 描述函数功能。
    - 理解 Agent 如何通过接口决定调用哪个工具。
- [ ] **Day 13: 工具调用 (Tool Calling) - 落地**
    - **实战：** 让 Agent 通过调用你写的 FastAPI 接口获取实时天气或数据库信息。
- [ ] **Day 14: 对话记忆 (Memory) 管理**
    - 实现基于 `session_id` 的历史记录保存。
    - 学习使用 Redis 存储长连接的对话上下文。

---

## 🔴 第三阶段：系统架构与工程部署 (Day 15 - Day 21)
*目标：解决生产环境中的稳定性、监控和部署问题。*

- [ ] **Day 15: 后台任务 (Background Tasks)**
    - 学习 `BackgroundTasks` 处理耗时任务（如文档解析）。
    - 实现“先返回接收成功，后台慢慢处理”的逻辑。
- [ ] **Day 16: WebSocket 长连接**
    - 学习 WebSocket 协议基础。
    - 实现支持复杂状态推送（如“Agent 正在搜索...”）的实时对话。
- [ ] **Day 17: 可观测性与日志**
    - 集成 `Loguru` 记录系统日志。
    - 接入 `LangSmith` 或类似工具追踪 Agent 思考链路。
- [ ] **Day 18: 接口安全与限流**
    - 实现简单的 API Key 鉴权。
    - 学习使用 `slowapi` 限制接口访问频率。
- [ ] **Day 19: Docker 容器化**
    - 编写 `Dockerfile` 打包 FastAPI 应用。
    - 学习使用 Docker Compose 一键启动“API + 向量库 + Redis”。
- [ ] **Day 20: 性能优化与缓存**
    - 学习语义缓存概念，减少重复 Prompt 的 Token 消耗。
    - 优化镜像体积与启动速度。
- [ ] **Day 21: 综合实战：企业级知识库 Agent**
    - 整合所有知识：带流式输出、带 RAG、带工具调用的完整 API 系统。

---

### 🛠 推荐工具链
* **框架**: FastAPI, Pydantic
* **服务器**: Uvicorn
* **模型调用**: OpenAI SDK / LangChain / PydanticAI
* **存储**: Redis (Memory), Chroma/Qdrant (Vector)
* **部署**: Docker