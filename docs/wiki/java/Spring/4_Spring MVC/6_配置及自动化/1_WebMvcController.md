## 作用

核心的自定义配置接口。

### addInterceptors 添加拦截器

参考：[拦截器](../3_核心组件/3_拦截器.md)

### addResourceHandlers 添加资源处理器

如果你想把服务器本地某个文件夹（比如 /opt/uploads/）映射到一个 URL 地址（如 /images/**），就用这个。

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/my-files/**")
            .addResourceLocations("file:/opt/data/uploads/");
}
```

### configureMessageConverters 配置消息转换器

比如你想统一修改 JSON 序列化的行为（比如日期格式化、将 Long 转成 String 防止前端 JS 精度丢失），可以在这里配置 FastJson 或 Jackson。

### configureContentNegotiation 配置内容协商


### addFormatters 配置格式化器

参考：[参数转换](../3_数据绑定和校验/3_参数转换.md)

### addArgumentResolvers 配置参数解析器


### addReturnValueHandlers 配置返回值处理器


### addCorsMappings 配置跨域

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins("https://example.com") // 允许的域名
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .maxAge(3600); // 预检请求有效期
}
```

### addViewControllers 添加视图控制器

有些页面（比如登录页、关于页）不需要走后台逻辑，只是简单的“点击跳转”。

```java
@Override
public void addViewControllers(ViewControllerRegistry registry) {
    // 访问 /home 路径直接跳转到 index.html 模板，不用专门写个 Controller 方法
    registry.addViewController("/home").setViewName("index");
}
```
