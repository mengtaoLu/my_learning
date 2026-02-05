>Spring 的全局控制器增强器，能把指定的处理逻辑全局应用到所有 Controller上。

## 常用用法（统一的异常捕获）

```java
@RestControllerAdvice
public class MyRestControllerAdvice {

    // 全局捕获RuntimeException
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("全局捕获异常" + e.getMessage());
    }
}
```