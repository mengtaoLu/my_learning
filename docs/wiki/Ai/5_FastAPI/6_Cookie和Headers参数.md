from typing import Annotated

## 使用`Cookie`获取参数

获取cookie中的参数，如：`Cookie: name=123`

```python
from fastapi import Cookie,FastAPI
from typing import Annotated

app = FastAPI()

@app.get("/cookieName")
def get_coolie_name(name:Annotated[str, Cookie(default=None)]):
    return name
```

## 获取`Header`参数

- 会将连字符转成下划线：`user-agent` -> `user_agent`

```python
from fastapi import Header,FastAPI
from typing import Annotated

app = FastAPI()

@app.get("/header")
def get_header_name(name:Annotated[str, Header(default=None)]):
    return name
```

### 重复的`Header`

针对重复的`Header`可以将类型声明为`list[str]`