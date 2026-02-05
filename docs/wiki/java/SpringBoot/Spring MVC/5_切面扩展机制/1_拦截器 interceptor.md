## 作用

类似于servlet的拦截器

三个部份：
- preHandle:在业务逻辑执行前调用;
- postHandle:在业务逻辑执行后、视图渲染前调用。
- afterCompletion: 在整个请求完成（视图渲染结束）后执行。通常用于清理资源（如数据库连接、ThreadLocal 变量）。

## 配置

### 1.实现一个自定义的拦截器

```java
public class MyCustomInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

### 2.配置到spring中

```java
@Configuration
public class InterCeptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyCustomInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/login","/static/**");
    }
}
```

## 同filter（过滤器）区别

| 特性    | 过滤器 filter                  | 拦截器 interceptor｜             |
|-------|-----------------------------|------------------------------|
| 规范定义	 | Servlet 规范，依赖 Servlet 容器	   | Spring MVC 框架，不依赖 Servlet 容器 |
| 执行时机	 | 在请求进入 DispatcherServlet 之前	 | 在请求进入 DispatcherServlet 之后   |
| 访问能力	 | 只能访问 Request/Response	      | 可以访问 Spring 中的 Bean、控制器方法信息  |
| 作用范围	 | 几乎过滤所有请求（包括静态资源）	           | 主要拦截 Controller 方法请求         |