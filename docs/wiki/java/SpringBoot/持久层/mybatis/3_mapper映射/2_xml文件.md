## DTO声明

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper></mapper>
```

## 常用元素

- `<select>`：查询语句，支持 resultType 或 resultMap。
- `<insert>`：插入语句，可配合 useGeneratedKeys 获取自增 ID。
- `<update>`
- `<delete>`
- `<sql>`: 可复用的 SQL 片段。
- `<resultMap>` : 最强大的标签，用于处理数据库列名与 Java 属性名不一致、一对多、多对一等复杂映射。

### `<resultMap>`结果映射

```xml
<resultMap id="userMap" type="User">
    <id column="user_id" property="id"></id>
    <id column="user_name" property="email"></id>
</resultMap>
```

## 参数占位符 `${}`和`#{}`

`#{}`：
- 预编译：会被解析为jdbc的？
- 安全：放置sql注入
- 自动类型处理：会给字符串加上`'`

`${}`（慎用）：
- 直接替换：直接将值替换到sql中

>`${}`使用场景：用于传递表明或者字段名，或`order by`后面的字段，不能用?替代的部分