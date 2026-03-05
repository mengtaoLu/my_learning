from typing import Annotated

## 使用`Annotated`校验

使用`Annotated`可以添加更多信息。

针对不同的查询`Query`、`Body`、`Path`可以添加许多额外信息：
- 字符串长度
- 正则表达式
- 数字验证
- 别名参数
- 添加examples

### 查询参数 `Query`

```python
from fastapi import FastAPI,Query
from typing import Annotated

app = FastAPI()

@app.get("/item")
def get_message(message: Annotated[str, Query(max_length=50)]):
    return message
```

### 路径查询 `Path`

```python
from fastapi import FastAPI,Path
from typing import Annotated

app = FastAPI()

@app.get("/item/{item_id}")
def get_item_id(item_id:Annotated[int,Path()]):
    return item_id
```

### 请求体 `Body`

同 `Path`和`Query`