为了减少 Java 全限定类名（Fully Qualified Class Name）的冗余而设计的。

在 MyBatis 中，`typeAliases`（类型别名）是一个非常实用的配置项，它允许你为 Java 类设置简短的别名，从而在 XML 映射文件中简化 SQL 语句的书写。

## 1.内置别名

MyBatis 内置了常用 Java 类型的别名，你可以在 XML 中直接使用这些别名，而无需写全限定名。不区分大小写，例如：

| 别名        | 对应的 Java 类型       |
|-----------|-------------------|
| map       | java.util.Map     |
| list      | java.util.List    |
| array     | java.util.Array   |
| string    | java.lang.String  |
| integer   | java.lang.Integer |
| int       | java.lang.Integer |
| long      | java.lang.Long    |
| double    | java.lang.Double  |
| float     | java.lang.Float   |
| boolean   | java.lang.Boolean |
| date      | java.util.Date    |
| datetime  | java.util.Date    |
| timestamp | java.util.Date    |

## 2.自定义别名

### 方式一：在 mybatis-config.xml 中配置 type-aliases-package

```xml
<configuration>
  <typeAliases>
    <package name="com.example.model"/>
  </typeAliases>
</configuration>
```

### 方式二：在 application.yml 中配置 type-aliases-package

```yaml
mybatis:
  type-aliases-package: com.example.model
```

### 方式三：在每个 Mapper 接口类上单独添加 @Alias 注解

```java
@Alias("user")
public class User {
    private Integer id;
    private String name;
    private Integer age;
}
```

## 3.使用 type-aliases-package 的注意事项

- type-aliases-package 支持通配符，例如 `com.example.model.*` 表示扫描 com.example.model 包及其所有子包
- type-aliases-package 支持多个包，用逗号分隔，例如 `com.example.model,com.example.entity`
- type-aliases-package 支持多个包，用分号分隔，例如 `com.example.model;com.example.entity`
- type-aliases-package 支持多个包，用换行符分隔，例如 `com.example.model\ncom.example.entity`

## 4.使用 type-aliases-package 的优点

- 简化 SQL 语句的书写
- 提高代码可读性
- 减少代码冗余
- 方便维护

## 5.使用 type-aliases-package 的缺点

- 需要配置 type-aliases-package
- 需要配置 type-aliases-package
- 需要配置 type-aliases-package

## 6.使用 type-aliases-package 的示例

```xml
<select id="getUserById" resultType="user">
    SELECT * FROM users WHERE id = #{id}
</select>
```

## 5.最佳实践

1.统一规范：推荐使用 type-aliases-package 扫描实体类包。

2.避免冲突：如果项目很大，不同模块有同名的类（如 Order），请务必在类上使用 @Alias 注解明确区分，或者干脆在 XML 中写全限定类名。
