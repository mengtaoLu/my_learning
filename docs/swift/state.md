# state

``@state``的使用，动态修改页面

[官方链接解释](https://developer.apple.com/documentation/swiftui/state)

[git地址源代码](https://github.com/mengtaoLu/iOS_learning/tree/4e46bc359d0848babb30f7206e76eea80a032cc6/upate%20ui%20with%20state)

> ``@state``非常核心的属性包装器(Property Wrapper)，用于管理视图的**状态**。
>
> 状态与视图绑定，当状态发生变化的时候，SwiftUI会从新计算并刷新依赖的视图。

## 示例

```swift
    struct ToggleView: View {
        @State private var num: Int = 1;
    }
```