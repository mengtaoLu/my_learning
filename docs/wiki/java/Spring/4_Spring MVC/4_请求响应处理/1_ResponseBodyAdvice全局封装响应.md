## 作用

将 controller 返回的结果，在写入 body 前，统一处理。

## 范围

只对有 `@ResponseBody` 注解的有效，包括：
- `@ResponseBody`
- `@RestController`

## 执行顺序图

```mermaid
graph TD
    A[客户端请求] --> B[DispatcherServlet]
    B --> C[HandlerMapping 查找 Controller]
    C --> D[HandlerAdapter 执行 Controller 方法]
    
    subgraph HandlerAdapter 内部处理
        D1[执行业务代码 return object] --> D2{是否有 @ResponseBody?}
        D2 -- 否 --> D3[走 ViewResolver 渲染视图]
        D2 -- 是 --> D4[调用 ResponseBodyAdvice.supports]
        D4 -- 返回 true --> D5[执行 beforeBodyWrite 包装逻辑]
        D4 -- 返回 false --> D6[跳过包装]
        D5 --> D7[HttpMessageConverter 序列化 JSON]
        D6 --> D7
    end
    
    D3 --> E[返回 HTML 页面]
    D7 --> F[写入响应体 ResponseBody]
    F --> G[客户端接收]
```

## 使用

### 1. 定义包装 DTO

```java
public class ResponseDTO<T> {
    public String message;
    public int code;
    public T data;

    public static <T> ResponseDTO<T> success(T data) {
        ResponseDTO<T> responseDTO = new ResponseDTO<T>();
        responseDTO.message = "success";
        responseDTO.data = data;
        responseDTO.code = 200;
        return responseDTO;
    }
}
```

### 2. 定义 ResponseAdvice

> 实现接口 `ResponseBodyAdvice`

```java
@ControllerAdvice(basePackages = "com.tml.demo")
public class GlobalResponseAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        // 判断是否处理
        // 跳过 ResponseDTO.class
        return !returnType.getParameterType().isAssignableFrom(ResponseDTO.class);
    }

    @Nullable
    @Override
    public Object beforeBodyWrite(@Nullable Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if(body instanceof String){
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.writeValueAsString(ResponseDTO.success(body));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        return ResponseDTO.success(body);
    }
}
```

- `@ControllerAdvice(basePackages = "com.tml.demo")`: 指定作用范围，扫描的包名
- `supports` 方法：判断是否启用该 Advice
- `beforeBodyWrite`：具体执行封装的方法，需要注意：
  - string 类型的结果，需要特殊处理
    - 需要先转换成 json 字符串，再返回，否则会被强制转换成字符串的时候报错
