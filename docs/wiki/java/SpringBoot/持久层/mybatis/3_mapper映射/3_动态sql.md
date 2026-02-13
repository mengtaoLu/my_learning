## 动态sql

可以根据条件动态拼接SQL。

- `<if>`:条件判断。
- `<where>`：智能处理`AND`和`WHERE`，并在没有条件时候移除`where`
- `<foreach>`: 遍历，常用在`IN`
- `<set>`：用于 `UPDATE` 语句，自动剔除多余的逗号。
- `<choose>`: 类似于switch-case，搭配`<when>`和`<otherwise>`

## `<where>`示例：动态搜索

```xml
<select id="findActiveUser" resultType="User">
    select * from user
    <where>
        <if test="name != null">
            AND name = #{name}
        </if>
        <if test="status != null">
            AND status = #{status}
        </if>
    </where>
</select>
```

## `<choose>`条件判段（switch-case like)
动态搜索可能存在条件都不满足时的全量查询，使用`<choose>`：
```xml
<select id="findActiveUser" resultType="User">
    select * from user
    <where>
        <choose>
            <when test="name != null">
                AND name like #{name}
            </when>
            <otherwise>
                AND 1= 0
            </otherwise>
        </choose>
    </where>
</select>
```

## `<foreach>`遍历

### 核心属性

- item：循环元素，使用`#{item}`引用
- index：索引，List为下标，Map为key
- collection：遍历的对象
- open：循环开始的前缀字符如：`()`
- separator：分隔符
- close：循环结束字符

### 使用场景：In查询

```xml
<select id="findUsers" >
    select * from users where name in
    <foreach item="item" index="index" collection="list"
             open="(" separator="," close=")">
        #{item}
    </foreach>
</select>
```

### 使用场景：批量插入

```xml
<insert id="batchAddNew">
    insert into users (username,email) values 
    <foreach item="item" index="index" collection="list" separator=",">
        (#{item.name},#{item.email})
    </foreach>
</insert>
```

## `collection`取值规则

- 传入单个List：如果没有使用@Param指定，默认为list
- 传入单个数组：如果没有使用@Param指定，默认为array
- 传入注解@Param("mylist")：必须为"mylist"
- 传入对象的属性：
  - 参数为`queryDTO`，遍历其中一个属性`ids`的话，`collection`填`ids`。