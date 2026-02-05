> 负责统一接收所有的 HTTP 请求，分配给合适的处理器（Controller）处理。

## 核心工作流程

1. 接收请求：所有发送到服务器的请求先到 `DispatcherServlet`
2. 寻找处理器（HandlerMapping）：`HandlerMapping` 会告诉合适的 Controller 是谁
3. 执行处理器（HandlerAdapter)：不直接调用 Controller，而是由适配器来执行，可以兼容各种类型的处理器
4. 处理业务逻辑：Controller 执行业务代码，并返回一个 `ModelAndView` 对象（包含数据和页面名称）
5. 解析视图（ViewResolver）：通过逻辑视图名称（如：index），通过 `ViewResolver`，查找实际文件
6. 渲染并返回：最后将数据填充到模版（如：Thymeleaf 或 JSP）中，生成 HTML 返回；如果是 RESTful 接口，则直接由消息转换器（HttpMessageConverter) 转换成 JSON。

## 手动建立 DispatcherServlet

```java
@Configuration
public class MyDispatcherServlet {

    @Bean
    public ServletRegistrationBean<DispatcherServlet> servletRegistrationBean(){
        AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
        // 扫描包
        applicationContext.scan("com.configs");
        DispatcherServlet ds = new DispatcherServlet(applicationContext);
        ServletRegistrationBean<DispatcherServlet> registrationBean = new ServletRegistrationBean<>(ds, "/api/*");
        registrationBean.setLoadOnStartup(1);
        return registrationBean;
    }
}
```

- `AnnotationConfigWebApplicationContext`：作为大脑，上下文容器管理，管理所需的 `controller`、`bean` 等。

> 本例中的 DispatcherServlet 处理前缀带有 `/api` 的请求。