## 作用

catch程序异常，后续进行处理

## 使用方式

### 搭配@RestControllerAdvice和@ExceptionHandler一起使用

参考()[]

### 单独使用

`@ExceptionHandler`可以单独在Controller中使用.

注意，局部的会覆盖全局的异常处理配置：
- 局部Controller异常处理，在Controller中使用`@ExceptionHandler`
- 全局Controller异常处理，在Controller中使用`@RestControllerAdvice`和`@ExceptionHandler`一起使用