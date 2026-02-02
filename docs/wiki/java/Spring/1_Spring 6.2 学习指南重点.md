---
sidebar_position: 1
title: Spring Framework 6.2 核心架构演进与企业级学习指南
---
# **Spring Framework 6.2 核心架构演进与企业级学习指南：深度解析、优化路径与未来路线**

Spring Framework 6.2 的发布不仅是该框架 20 年发展历程中的一个重要里程碑，更是 Java 生态系统向现代化云原生架构转型的关键支点。作为 Spring 6.x 系列的持续演进版本，6.2 版本在核心容器、运行时效率、Ahead-of-Time (AOT) 编译、虚拟线程支持以及 Web 架构等多个领域引入了深刻的变革 1。在当前的工业界背景下，企业应用正面临着从传统的单体架构向高性能、低延迟的微服务及无服务器架构转型的压力，Spring 6.2 通过提升基线要求、优化内部锁机制以及深化与 GraalVM 和 Project Loom 的集成，为这些挑战提供了系统性的解决方案 3。

## **Spring 6.2 演进脉络与战略地位**

自 2003 年发布以来，Spring Framework 经历了从简单的 IoC/AOP 容器到全面支持反应式编程、云原生部署和现代化 Java 特性的巨大飞跃 2。Spring 6.2 被定位为 Spring 6.x 代系中的“生产力高峰”，它不仅吸收了 6.0 和 6.1 版本在观测性（Observability）和虚拟线程（Virtual Threads）方面的初步尝试，还通过精细化的内部优化，为即将到来的 Spring 7.0 铺平了道路 2。  
下表展示了 Spring 框架在主要大版本迭代中的核心功能演进：

| 版本代系 | 发布时间 | 最低 Java 版本 | 核心战略特征 |
| :---- | :---- | :---- | :---- |
| Spring 1.x | 2004 | JDK 1.3 | IoC 容器、AOP 支持、MVC 框架初步形成 2 |
| Spring 2.x | 2006 | JDK 1.4 | XML 配置简化、AspectJ 集成、Spring Security 引入 2 |
| Spring 3.x | 2009 | JDK 5 | Java 5 注解支持、RESTful 服务支持、SpEL 引入 2 |
| Spring 4.x | 2013 | JDK 6 | Java 8 支持（后期）、Java 配置取代 XML、条件装配 2 |
| Spring 5.x | 2017 | JDK 8 | 反应式编程 (WebFlux)、Kotlin DSL、HTTP/2 支持 2 |
| Spring 6.x | 2022 | JDK 17 | GraalVM 原生镜像、虚拟线程、内置观测性、AOT 2 |
| **Spring 6.2** | 2024 | JDK 17 | 内部锁优化、@Fallback 支持、AOT 增强、性能精化 1 |

Spring 6.2 的战略核心在于“运行时效率”（Runtime Efficiency），这不仅涉及 raw 性能的提升，还包括对云环境负载的自适应能力 3。通过引入 AOT 处理和 Project Leyden 的初步对齐，该版本大幅缩短了冷启动时间，这对于 Kubernetes 环境下的自动扩缩容至关重要 4。

## **核心容器与依赖注入模型的现代化**

IoC 容器是 Spring 框架的基石，Spring 6.2 对其内部算法和编程模型进行了数项关键调整，旨在解决依赖注入（DI）中的歧义性并提高启动时的确定性 1。

### **后备 Bean (@Fallback) 的引入及其架构意义**

在 Spring 6.2 之前，当存在多个同类型的候选 Bean 时，开发者通常使用 @Primary 注解来指定首选实例 9。然而，@Primary 是一种“强夺式”的设计：只要标记了 @Primary 的 Bean 存在，它就会覆盖所有其他非主候选者，这在提供库（Library）的默认实现时往往显得过于武断。  
Spring 6.2 引入了 @Fallback 注解，作为 @Primary 的逻辑对立面 8。一个被标记为 @Fallback 的 Bean 仅在没有其他普通候选 Bean 可用时才会被选中 9。这种设计极大地增强了框架的灵活性：

* **库开发者**：可以提供一个 @Fallback 标记的默认组件（如默认的消息处理器或缓存策略）。  
* **应用开发者**：只需定义一个正常的 Bean 即可无缝替换默认实现，而无需担心复杂的条件装配逻辑（如 @ConditionalOnMissingBean）在某些复杂配置场景下失效 9。

### **自动装配算法的精化与泛型匹配安全性**

Spring 6.2 重新审视了自动装配过程中的优先级排序。现在，基于名称的匹配（Parameter name matches）和 @Qualifier 匹配将明确地优先于基于 @jakarta.annotation.Priority 的排名 1。这一变化修正了在复杂多候选场景下，泛型组件注入可能产生的非预期行为。  
同时，容器加强了对泛型类型的匹配严格度 1。Spring 6.2 变得更加不再“宽容”，它要求注入点的泛型签名中可解析的部分必须完全匹配，而不再接受带有未解析类型变量或通配符的模糊回退匹配 8。这意味着开发者在定义构造函数参数或 @Bean 方法返回值时，必须更加精确地声明泛型签名，以避免在 AOT 编译阶段或启动阶段出现类型不匹配的错误 1。

### **内部锁机制与背景初始化优化**

为了提升多核处理器环境下的启动效率，Spring 6.2 修改了核心容器的内部锁定机制 8。新版本采用了“严格锁”与“宽松锁”混合的策略：

* **主引导线程**：应用严格锁定，确保上下文刷新的串行化安全性。  
* **背景 Bean 初始化**：始终运行在宽松锁定模式下 8。  
* **自定义行为**：从 6.2.6 版本开始，开发者可以通过 JVM 系统属性 spring.locking.strict=true 还原到旧版的行为，这为在旧有并发模式下运行的应用提供了兼容性逃生舱 8。

此外，通过在 @Bean 注解中使用 bootstrap \= BACKGROUND 属性，开发者可以将昂贵的单例 Bean 初始化过程从主启动路径中剥离，并行执行，这显著优化了大规模应用上下文的启动延迟 8。

## **运行时效率与虚拟线程的深度集成**

Spring 6.2 在 Project Loom 及其核心特性——虚拟线程（Virtual Threads）的支持上达到了新的高度 4。与传统平台线程相比，虚拟线程极其轻量化，单个线程占用的内存不足 1 KB，使得 JVM 能够并发调度数以百万计的线程，而不会像以前那样受限于操作系统级线程的成本 14。

### **虚拟线程在任务执行与调度中的应用**

Spring 6.2 对 TaskExecutor 和 TaskScheduler 进行了针对性的优化。SimpleAsyncTaskExecutor 现在可以配置为直接利用 JDK 21 的虚拟线程，而非为每个任务创建一个新的平台线程 13。  
下表对比了虚拟线程与传统平台线程在 Spring 任务执行器中的表现：

| 特性 | 平台线程 (Platform Threads) | 虚拟线程 (Virtual Threads) |
| :---- | :---- | :---- |
| **资源消耗** | 高（MB 级别内存，受 OS 调度限制） | 极低（KB 级别内存，JVM 调度） 14 |
| **适用场景** | 计算密集型任务 | I/O 密集型、高并发阻塞任务 14 |
| **池化需求** | 必须池化（ThreadPoolTaskExecutor） | 不推荐池化（VirtualThreadTaskExecutor） 14 |
| **Spring 6.2 支持** | 通过核心配置维持兼容性 | 通过 SimpleAsyncTaskExecutor 原生集成 13 |
| **阻塞影响** | 阻塞平台线程，导致线程池枯竭 | 发生 I/O 时自动挂起，释放载体线程 4 |

在 I/O 密集型应用中，使用虚拟线程可以显著提高吞吐量，因为它消除了传统 Servlet 模型中由于等待下游响应而导致的线程闲置 13。然而，分析表明，虚拟线程并非“万能药”：在计算密集型任务中，由于载体线程（Carrier Threads）的挂起与挂载成本，性能反而可能略有下降 14。

### **解决线程固定 (Pinning) 问题的工程实践**

虚拟线程面临的一个核心挑战是“线程固定”（Pinning）。当虚拟线程进入 synchronized 代码块或调用本地 C 语言代码时，它会锁定到底层的载体平台线程上，从而阻碍其他虚拟线程的执行 4。Spring 6.2 通过重构内部同步点，减少了对 synchronized 的依赖，转而使用 java.util.concurrent 锁（如 ReentrantLock），后者在虚拟线程环境下能够更好地协助 CPU 释放载体线程 4。开发者可以通过 \-Djdk.tracePinnedThreads=full 参数在开发阶段识别并消除此类瓶颈 14。

## **AOT 处理与 GraalVM 原生镜像支持的进阶**

Spring 6.2 继续深化对 Ahead-of-Time (AOT) 转换的支持，这是实现原生镜像（Native Image）高性能启动的关键 18。

### **AOT 引擎工作流与静态分析**

AOT 处理的核心逻辑是在构建阶段（Build Time）对 ApplicationContext 进行一次完整的模拟刷新 20。ApplicationContextAotGenerator 作为入口点，执行以下操作：

1. **AOT 刷新**：创建所有 Bean 的定义，但并不进行实例化。在此过程中，BeanFactoryPostProcessor 被调用以处理配置类和扫描路径 20。  
2. **代码生成**：生成用于还原 BeanFactory 状态的 Java 源代码，避开了运行时的反射查找 20。  
3. **运行时提示 (RuntimeHints)**：自动生成针对反射、资源加载、序列化和动态代理的提示文件（如 reflect-config.json），以便 GraalVM 编译器了解运行时的动态需求 20。

### **开发者体验：@RegisterReflection 与自动化提示**

在以前的版本中，处理非 Spring 管理的类或复杂的反射逻辑需要手动编写 RuntimeHintsRegistrar。Spring 6.2 引入了 @RegisterReflection 注解，允许开发者直接在类上声明其反射需求 12。 配合 @ReflectionScan，Spring 现在可以像组件扫描一样自动发现这些提示，极大地降低了将现有应用迁移到原生镜像的门槛 12。  
为了确保应用在 AOT 模式下的兼容性，Spring 6.2 建议遵循以下最佳实践：

* **声明最精确的 Bean 类型**：在 @Bean 方法中返回具体的实现类而非接口，以便 AOT 引擎能检测到所有相关的注解和生命周期回调 21。  
* **避免复杂的条件逻辑**：因为 AOT 依赖“闭环世界假设”（Closed World Assumption），所有环境属性和 Profile 必须在构建时确定 19。  
* **消除循环依赖**：AOT 优化后的上下文在检测到循环依赖时会直接报错，开发者应通过 @Lazy 注入或 ObjectProvider 进行重构 20。

## **数据访问、事务管理与 R2DBC 的演化**

在数据访问层，Spring 6.2 不仅提升了与主流 ORM 框架（如 Hibernate 6.5）的兼容性，还对现代响应式数据访问（R2DBC）和传统 JDBC 进行了功能补强 1。

### **事务管理器的精细化控制**

Spring 的声明式事务管理（@Transactional）在 6.2 版本中得到了增强 8。值得注意的更新包括：

* **只读事务的早期失败**：TransactionTemplate 和 TransactionalOperator 现在支持配置只读事务的早期验证，防止在只读上下文下进行意外写入 8。  
* **事务监听器的回退机制**：@TransactionalEventListener 引入了 fallbackExecution 属性。这意味着如果一个事件在非事务性上下文中发布，开发者可以选择是否仍然执行该监听逻辑，从而提高了系统在混合事务环境下的稳健性 8。

### **JDBC 与 R2DBC 的新特性**

对于开发者而言，Spring 6.2 提供的 DatabaseClient（R2DBC 核心 API）和 NamedParameterJdbcTemplate 引入了更简洁的参数绑定方式 8。  
下表展示了 R2DBC DatabaseClient 增强后的参数绑定 API：

| 方法 | 功能描述 | 应用场景 |
| :---- | :---- | :---- |
| .bindValues(Map\<String, Object\>) | 批量绑定来自 Map 的参数 | 动态 SQL 生成或复杂的过滤条件 25 |
| .bindProperties(Object) | 基于 Bean 属性或 Java Record 组件自动绑定 | 直接持久化领域对象或 DTO 25 |
| .bind(index, value) | 基于索引的参数绑定 | 传统的参数化查询 26 |

这些 API 的引入旨在平衡 SQL 的灵活性与编写代码的便捷性，同时通过强制参数化处理，内生地防御 SQL 注入攻击 26。

## **现代化 Web 开发：从 MockMvcTester 到 Htmx 支持**

Spring Web 模块（Servlet MVC 和 WebFlux）在 6.2 版本中引入了多项旨在提升测试体验和前端交互能力的更新 12。

### **测试范式转移：MockMvcTester 与 AssertJ 集成**

Spring 6.2 正式引入了 MockMvcTester，这被视为 Web MVC 测试的一次重大飞跃 10。与传统的 MockMvc 相比，新 API 的设计理念发生了变化：

* **发现性**：移除了对大量静态导入（如 MockMvcRequestBuilders）的依赖，通过流式 API 提供更好的 IDE 补全 12。  
* **集成 AssertJ**：支持直接使用 AssertJ 风格的断言，使得对 JSON 响应、状态码和 Header 的验证更加自然和易读 10。  
* **WebMvc.fn 支持**：新版测试工具现在可以无缝测试函数式 Web 端点（WebMvc.fn），实现了函数式模型与注解模型在测试层面的对等 12。

### **支持现代前端趋势：Htmx 与视图片段**

随着 Htmx 和 Hotwire 等技术的兴起，现代 Web 应用越来越多地采用服务端渲染 HTML 片段的方式来更新页面 12。Spring 6.2 扩展了其视图解析机制，支持在单次请求中渲染多个视图片段（View Fragments） 12。这种能力使得开发者可以轻松构建响应迅速、局部更新的界面，而无需引入重型的单页应用（SPA）前端框架。  
此外，针对隐私和安全性的变化，Spring 6.2 的响应式 Web 服务器（不含 Undertow）现已支持“分区 Cookie”（CHIPS），这有助于应用在现代浏览器禁用第三方 Cookie 的背景下，维持跨域身份校验的稳定性 12。

## **SpEL 与基础设施层面的增强**

Spring 表达式语言（SpEL）在 6.2 版本中经历了核心重写，旨在支持更复杂的数据结构索引和更高的执行效率 8。

### **索引访问 SPI 与安全导航**

SpEL 现在提供了 IndexAccessor 和 CompilableIndexAccessor 接口，允许开发者为自定义数据结构实现特定的索引逻辑 8。这意味着在表达式中访问自定义集合或复杂图形对象时，可以获得与原生 List/Map 相同的语法体验。  
同时，新版 SpEL 支持了索引的安全导航操作 8。例如，在表达式 someObject.someList?. 中，如果 someList 为空，整个表达式将安全地返回 null，而不再抛出异常。这极大地简化了处理动态或不确定数据结构时的防御性逻辑。

### **基础设施升级与安全补丁**

Spring 6.2 将一些关键库的基线进行了上移，以适应现代环境：

* **Hibernate 6.5**：作为原生镜像支持的最低要求 1。  
* **Jackson 2.18+**：推荐升级以获得最新的 JSON 解析优化和安全修复 1。  
* **Protobuf 3.29+**：官方支持 Protobuf 4.x，提升了在高性能通信协议中的表现 1。

安全方面，6.2.11 及后续版本修复了多个 CVE 漏洞（如 CVE-2025-41249），涉及注解检测和方法安全性的漏洞，强调了在生产环境中保持版本更新的重要性 30。

## **Spring 6.2 学习路线与重点模块推荐**

对于希望深入掌握 Spring 6.2 的开发者，建议按照以下优先级进行系统性学习：

### **1\. 核心容器与 DI 模型 (Priority: High)**

这是所有 Spring 应用的基础。应重点学习 @Fallback 的应用场景，理解自动装配权重的变化，并练习如何在 AOT 兼容的模式下编写配置类。特别要关注背景 Bean 初始化（bootstrap \= BACKGROUND）对启动性能的实际影响 8。

### **2\. AOT 处理与原生镜像 (Priority: High)**

无论是否立即部署到 GraalVM，理解 AOT 的工作原理对于理解 Spring 6 的内部设计至关重要。建议通过 mvn spring-boot:build-image \-Pnative 进行实操，学习如何使用 @RegisterReflection 解决反射提示缺失的问题 12。

### **3\. 并发编程与虚拟线程 (Priority: Medium-High)**

如果应用运行在 JDK 21+ 环境，学习虚拟线程的配置和调优是必修课。应理解 SimpleAsyncTaskExecutor 的虚拟线程化，并掌握如何识别载体线程固定（Pinning）问题 4。

### **4\. 数据访问与事务升级 (Priority: Medium)**

学习 R2DBC DatabaseClient 的新参数绑定 API，以及如何利用事务监听器的回退机制处理异步事件 8。

### **5\. Web 测试与现代 Web 特性 (Priority: Medium)**

掌握 MockMvcTester 的用法，尝试使用 AssertJ 风格编写测试用例。如果项目涉及前后端不分离架构，探索 Htmx 与视图片段的结合将极具实用价值 10。

## **迁移指南与未来展望**

从 Spring 6.1 升级到 6.2 通常是一个平滑的过程，因为 6.2 被设计为 6.1 的即插即用替代方案 1。然而，由于自动装配算法和泛型匹配变得更加严格，开发者应在升级后仔细运行集成测试。

### **升级检查清单**

* **API 移除**：检查是否使用了在 6.2 中被移除的过时构造函数或方法 1。  
* **泛型匹配**：如果某些 Bean 注入失败，请核查注入点与 Bean 定义的泛型签名是否完全一致 1。  
* **锁定模式**：在极高并发的启动场景下，监控 ApplicationContext 的初始化时间，必要时通过 spring.locking.strict 进行微调 8。  
* **HtmlUnit 升级**：测试框架若使用 HtmlUnit，需注意 3.x 版本的 API 不兼容变化及 Maven 坐标变更 1。

### **展望 Spring 7.0**

随着 2024 年 11 月 Spring 6.2 正式发布，Spring 团队已经将目光投向了 2025 年底的 Spring 7.0 4。Spring 7 将基于 Jakarta EE 11，并全面拥抱 JDK 25。届时，虚拟线程可能成为默认选项，且 Project Leyden 的静态镜像技术将进一步重塑 Java 应用的运行形态 6。Spring 6.2 作为这一宏大计划的中继站，通过不断巩固基础设施，确保了企业应用能够以最小的成本步入 Java 的“黄金新时代”。

#### **引用的著作**

1. Spring Framework 6.2 Release Notes · spring-projects/spring-framework Wiki · GitHub, 访问时间为 一月 28, 2026， [https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/40ff71d2e9d9c45a152afa96b87979cb4b0e54e3](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/40ff71d2e9d9c45a152afa96b87979cb4b0e54e3)  
2. The latest version of Spring framework till date \- CodeJava.net, 访问时间为 一月 28, 2026， [https://www.codejava.net/frameworks/spring/spring-framework-version-history](https://www.codejava.net/frameworks/spring/spring-framework-version-history)  
3. Runtime efficiency with Spring (today and tomorrow), 访问时间为 一月 28, 2026， [https://spring.io/blog/2023/10/16/runtime-efficiency-with-spring](https://spring.io/blog/2023/10/16/runtime-efficiency-with-spring)  
4. Spring Boot 3.2 and Spring Framework 6.1 Add Java 21, Virtual Threads, and CRaC \- InfoQ, 访问时间为 一月 28, 2026， [https://www.infoq.com/articles/spring-boot-3-2-spring-6-1/](https://www.infoq.com/articles/spring-boot-3-2-spring-6-1/)  
5. Performance Benefits of Reactive Frameworks, 访问时间为 一月 28, 2026， [https://www.ijcaonline.org/archives/volume187/number48/performance-benefits-of-reactive-frameworks/](https://www.ijcaonline.org/archives/volume187/number48/performance-benefits-of-reactive-frameworks/)  
6. From Spring Framework 6.2 to 7.0, 访问时间为 一月 28, 2026， [https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0/](https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0/)  
7. Supercharge your JVM Performance with Project Leyden and Spring Boot \- Inside.java, 访问时间为 一月 28, 2026， [https://inside.java/2025/11/02/devoxxbelgium-leyden-supercharge-jvm-performance/](https://inside.java/2025/11/02/devoxxbelgium-leyden-supercharge-jvm-performance/)  
8. Spring Framework 6.2 Release Notes · spring-projects/spring ..., 访问时间为 一月 28, 2026， [https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes)  
9. What is NEW in Spring Framework 6.2? Key Updates and New Features\! \- YouTube, 访问时间为 一月 28, 2026， [https://www.youtube.com/watch?v=ut38cX953RM](https://www.youtube.com/watch?v=ut38cX953RM)  
10. Spring Framework 6.2 Release Notes \- GitHub, 访问时间为 一月 28, 2026， [https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/ad8f8c71ffa7f333c9482b2375d2aa5d03752222](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/ad8f8c71ffa7f333c9482b2375d2aa5d03752222)  
11. Upgrading to Spring Framework 6.x · spring-projects/spring-framework Wiki · GitHub, 访问时间为 一月 28, 2026， [https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-6.x/336131f7e73e6d94664f3ada3937030f92e02093](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-6.x/336131f7e73e6d94664f3ada3937030f92e02093)  
12. Spring Framework 6.2 Release Notes \- GitHub, 访问时间为 一月 28, 2026， [https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/ec86a11b5b53d9f2b1f70ce0cb87ce683ef8f03a](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/ec86a11b5b53d9f2b1f70ce0cb87ce683ef8f03a)  
13. Embracing Virtual Threads \- Spring, 访问时间为 一月 28, 2026， [https://spring.io/blog/2022/10/11/embracing-virtual-threads/](https://spring.io/blog/2022/10/11/embracing-virtual-threads/)  
14. Spring and virtual threads \- java \- Stack Overflow, 访问时间为 一月 28, 2026， [https://stackoverflow.com/questions/79013453/spring-and-virtual-threads](https://stackoverflow.com/questions/79013453/spring-and-virtual-threads)  
15. Task Execution and Scheduling :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/integration/scheduling.html](https://docs.spring.io/spring-framework/reference/integration/scheduling.html)  
16. Virtual Threads in Java 24: We Ran Real-World Benchmarks—Curious What You Think, 访问时间为 一月 28, 2026， [https://www.reddit.com/r/java/comments/1lfa991/virtual\_threads\_in\_java\_24\_we\_ran\_realworld/](https://www.reddit.com/r/java/comments/1lfa991/virtual_threads_in_java_24_we_ran_realworld/)  
17. How to use virtual threads with Spring Boot \- BellSoft, 访问时间为 一月 28, 2026， [https://bell-sw.com/blog/a-guide-to-using-virtual-threads-with-spring-boot/](https://bell-sw.com/blog/a-guide-to-using-virtual-threads-with-spring-boot/)  
18. Spring Native and GraalVM Guide \#1 Spring Native Overview | by Paul Ravvich \- Medium, 访问时间为 一月 28, 2026， [https://medium.com/mastering-spring-native-and-graalvm-with-kubernete/spring-native-and-graalvm-guide-1-spring-native-overview-f4db935840fd](https://medium.com/mastering-spring-native-and-graalvm-with-kubernete/spring-native-and-graalvm-guide-1-spring-native-overview-f4db935840fd)  
19. Spring Boot with GraalVM Native Image \- BellSoft, 访问时间为 一月 28, 2026， [https://bell-sw.com/blog/spring-boot-with-graalvm-native-image-performance-compatibility-migration/](https://bell-sw.com/blog/spring-boot-with-graalvm-native-image-performance-compatibility-migration/)  
20. Spring Framework Documentation :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/6.2/index.html](https://docs.spring.io/spring-framework/reference/6.2/index.html)  
21. Spring WebFlux :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/6.2/web/webflux.html](https://docs.spring.io/spring-framework/reference/6.2/web/webflux.html)  
22. Ahead of Time Optimizations :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/core/aot.html](https://docs.spring.io/spring-framework/reference/core/aot.html)  
23. GraalVM Native Image Support \- Spring, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-boot/docs/3.2.2/reference/html/native-image.html](https://docs.spring.io/spring-boot/docs/3.2.2/reference/html/native-image.html)  
24. Transaction Management :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/data-access/transaction.html](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)  
25. What's New in Spring Framework 6.x \- GitHub, 访问时间为 一月 28, 2026， [https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x/998f6ad1c26a64c5963c7f4ad4f69562ab033a4e](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x/998f6ad1c26a64c5963c7f4ad4f69562ab033a4e)  
26. Data Access with R2DBC :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/data-access/r2dbc.html](https://docs.spring.io/spring-framework/reference/data-access/r2dbc.html)  
27. Spring Web MVC :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/6.2/web/webmvc.html](https://docs.spring.io/spring-framework/reference/6.2/web/webmvc.html)  
28. Testing :: Spring Framework, 访问时间为 一月 28, 2026， [https://docs.spring.io/spring-framework/reference/6.2/testing.html](https://docs.spring.io/spring-framework/reference/6.2/testing.html)  
29. Spring Framework 6.2 Release Notes · spring-projects/spring-framework Wiki · GitHub, 访问时间为 一月 28, 2026， [https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/4e05d6878e39d0a1e4bf65f5ab987dead3bae943](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes/4e05d6878e39d0a1e4bf65f5ab987dead3bae943)  
30. Spring Framework 6.2.11 Available Now, 访问时间为 一月 28, 2026， [https://spring.io/blog/2025/09/11/spring-framework-6-2-11-available%20now](https://spring.io/blog/2025/09/11/spring-framework-6-2-11-available%20now)  
31. Kicking off the Spring Framework 6.2 milestone phase, 访问时间为 一月 28, 2026， [https://spring.io/blog/2024/04/11/kicking-off-the-spring-framework-6-2-milestone-phase](https://spring.io/blog/2024/04/11/kicking-off-the-spring-framework-6-2-milestone-phase)