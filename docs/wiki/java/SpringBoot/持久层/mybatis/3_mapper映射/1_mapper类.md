## 介绍

本质是通过java的动态代理功能，将`@Mapper`注解的接口通过代理实现方法。

## 核心要点

- 方法名：必须跟`xml`文件一致
- 参数类型：必须跟`xml`中的`parameterType`一致
  - 可通过`@Param`指定
- 返回类型：必须跟`xml`中的`resultType`和`resultMap`一致

## `Mapper`定义

### 1.XML映射

#### 定义Java接口

```java
@Mapper
public interface UserMapper{
    User selectById(int id);
}
```

#### 定义xml文件

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <select id="selectById" resultType="User">
        SELECT * FROM USER where id = #{id}
    </select>
</mapper>
```

### 注解映射（适用于简单sql）

直接在java接口方法上写注解

```java
@Mapper
public interface User {
    @Select("SELECT * FROM USER where id = #{id}")
    User getUserById(int id);
}
```
