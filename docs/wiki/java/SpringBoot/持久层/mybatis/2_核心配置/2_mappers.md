### 扫描Mapper接口

#### 方式一：在启动类上添加@MapperScan注解

```java
@SpringBootApplication
@MapperScan("com.example.mapper")
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

#### 方式二：在每个 Mapper 接口类上单独添加 @Mapper 注解。

```java
@Mapper
public interface UserMapper {
    String getUsername(@Param("id") Integer id);
}
```