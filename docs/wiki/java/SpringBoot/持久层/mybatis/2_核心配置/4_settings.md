## 介绍

针对mybatis的一些配置，可以配置的路径：
- `mybatis-config.mxl`
- `application.properties`



## 常用的配置

| 设置项                       | 描述                              | 默认值    | 建议                        |
|---------------------------|---------------------------------|--------|---------------------------|
| cacheEnable               | 全局性地开启或关闭所有映射器配置文件中已配置的缓存。      | true   | true                      |
| lazyLoadingEnabled        | 延迟加载开关。开启时，关联对象在用到时才加载。         | false  | true                      |
| multipleResultSetsEnabled | 是否允许单个语句返回多结果集。                 | true   | true                      |
| useColumnLabel            | 使用列标签代替列名。                      | true   | true                      |
| mapUnderscoreToCamelCase  | 开启驼峰命名自动转换（如 user_id -> userId） | false  | true                      |
| defaultExecutorType       | 配置默认的执行器（REUSE, SIMPLE, BATCH）  | SIMPLE | 大批量插入时可用 BATCH            |
| jdbcTypeForNull           | 当参数为 null 时指定的 JDBC 类型          | OTHER  | Oracle 建议设为 NULL          |
| logImpl                   | 指定 MyBatis 所用日志的具体实现            | 未指定    | 常用 STDOUT_LOGGING 或 SLF4J |


## 设置方法

### 在`mybatis-config.xml`中配置。

```xml
<settings>
    <setting name="mapUnderscoreToCamelCase" value="true" />
    <setting name="lazyLoadingEnabled" value="true"/>
</settings>
```

### 在`application.yaml`中配置

```yaml
mybatis:
  configuration:
    map-underscore-to-camel-case: true
```