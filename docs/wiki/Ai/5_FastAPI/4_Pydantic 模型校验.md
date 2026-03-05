from dataclasses import Fieldfrom pydantic import BaseModelfrom pydantic import BaseModel

## 可选参数

类型为`None`是表示可选参数

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str # 字符串类型，必填参数
    value: int | None = None # 非必填参数，默认为None
    description: str | None # 非必填参数
```
## 禁止额外字段

```python
from pydantic import BaseModel,Field

class FilterParams(BaseModel):
    # 禁止额外的参数
    model_config = {"extra": "forbid"}
    
    limit: int = Field(10,gt=0,le=100)
```

## `Field`添加元数据

使用`Field`为模型添加额外的参数。

```python
from pydantic import BaseModel,Field

class FilterItem(BaseModel):
    name: str | None = Field(default=None,description="The name of the item")
```

## `pydantic`添加额外的JSON Schema数据

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {"name": "aa"},
                {"name": "bb"}
            ]
        }
    }
```

## 查询参数校验Query

```python
from typing import Annotated,Literal
from fastapi import FastAPI,Query
from pydantic import BaseModel, Field

app = FastAPI()

# 继承BaseModel
class FilterParams(BaseModel):
    limit: int = Field(100,gt=0,le=100)
    offset: int = Field(0,ge=0)
    order_by: Literal["created_at","updated_at"] = "created_at" # Literal限定只能选择给定的值
    tags: list[str]

@app.post("/item/new")
def add_new_item(item: FilterParams):
    return item.tags
```